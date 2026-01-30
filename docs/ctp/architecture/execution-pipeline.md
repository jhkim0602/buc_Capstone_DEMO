# 실행 파이프라인

CTP의 코드 실행부터 시각화까지의 전체 데이터 흐름을 설명합니다.

## 전체 파이프라인

```
1. User writes Python code in CodeEditor
    ↓
2. Click "실행" button
    ↓
3. useSkulptEngine.run(code)
    ↓
4. Worker.postMessage({ type: 'RUN_CODE', code })
    ↓
5. Skulpt Worker executes code step-by-step
    ↓
6. Each execution step:
   - Capture globals (variable snapshot)
   - Capture trace() events
   - Capture stdout (print output)
    ↓
7. Worker.postMessage({ type: 'BATCH_STEPS', steps: [...] })
    ↓
8. useSkulptEngine processes steps:
   - Adapter.parse(globals) → visualData
   - Create VisualStep[]
    ↓
9. useCTPStore.setSteps(processedSteps)
    ↓
10. CTPPlayground renders Visualizer with currentStep data
    ↓
11. User controls StepPlayer (play/pause/next/prev)
```

---

## 1. Skulpt Engine Hook

위치: `web/hooks/use-skulpt-engine.ts`

### 초기화

```typescript
const { run, status, error } = useSkulptEngine({
  adapterType: 'array'
});

useEffect(() => {
  // Worker 초기화
  const worker = new Worker('/workers/skulpt.worker.js');

  worker.onmessage = (e) => {
    const { type, steps, status, message } = e.data;

    if (type === 'BATCH_STEPS') {
      const processedSteps = steps.map(s => ({
        id: `step-${Date.now()}-${idx}`,
        description: `Line ${s.line}`,
        activeLine: s.line,
        data: dataMapper(s.variables),  // Adapter 적용
        stdout: s.stdout,
        events: s.events,                // Tracer 이벤트
        variables: s.variables
      }));

      setSteps(processedSteps);
    }
  };

  return () => worker.terminate();
}, []);
```

### 실행
```typescript
run(code); // Worker에 코드 전달
```

---

## 2. Skulpt Worker

위치: `public/workers/skulpt.worker.js`

### 역할
- 브라우저 내에서 Python 코드 실행
- 단계별 globals 스냅샷 수집
- trace() 함수 주입
- stdout 캡처
- 실행 제한: MAX_STEPS (타임아웃 방지)

### trace() 함수 주입

```javascript
// Worker 내부
const traceBuffer = [];

Sk.builtins.trace = new Sk.builtin.func((type, ...kwargs) => {
  const event = {
    type: Sk.ffi.remapToJs(type),
    scope: kwargs.scope ? Sk.ffi.remapToJs(kwargs.scope) : 'graph',
    ...Sk.ffi.remapToJs(kwargs)
  };
  traceBuffer.push(event);
});
```

### 단계별 수집

```javascript
let stepCount = 0;
const stepsBuffer = [];

Sk.configure({
  __future__: Sk.python3,
  output: (text) => stdoutBuffer.push(text),
  execLimit: MAX_STEPS,
  yieldLimit: 1,  // 매 라인마다 스냅샷
  suspension: () => {
    stepCount++;
    const globalsCopy = captureGlobals();
    const eventsCopy = [...traceBuffer];

    stepsBuffer.push({
      line: stepCount,
      variables: globalsCopy,
      stdout: [...stdoutBuffer],
      events: eventsCopy
    });

    traceBuffer.length = 0; // 이벤트 버퍼 클리어
  }
});
```

### 응답
```javascript
self.postMessage({
  type: 'BATCH_STEPS',
  steps: stepsBuffer
});
```

---

## 3. Adapter 파이프라인

### AdapterFactory

위치: `web/components/features/ctp/adapters/index.ts`

```typescript
const adapter = AdapterFactory.getAdapter('array');
const visualData = adapter.parse(globals);
```

### Adapter 실행 과정

#### ArrayAdapter 예시
```typescript
parse(globals: any): LinearItem[] {
  // 1. 변수 탐지
  let arr = globals['arr'] || globals['nums'] || globals['items'];

  // 2. 하이라이트 변수 추출
  const activeIndex = globals['active_index'] ?? globals['current_index'];
  const compareIndices = globals['compare_indices'] || [];

  // 3. VisualItem 생성
  return arr.map((val, idx) => {
    let status;
    if (activeIndex === idx) status = 'active';
    else if (compareIndices.includes(idx)) status = 'comparing';

    return {
      id: `item-${idx}`,
      value: val,
      label: idx.toString(),
      status,
      isHighlighted: false
    };
  });
}
```

#### GraphAdapter 예시
```typescript
parse(globals: any): { nodes: VisualItem[], edges: GraphEdge[] } {
  // 1. 그래프 구조 추출
  const graph = globals['graph'] || globals['adj'];

  // 2. 상태 변수 추출
  const visited = globals['visited'] || [];
  const activeNode = globals['active_node'];

  // 3. 노드/간선 생성
  const nodes = Object.keys(graph).map(id => ({
    id,
    value: id,
    status: activeNode === id ? 'active' : visited.includes(id) ? 'visited' : undefined
  }));

  const edges = [];
  Object.entries(graph).forEach(([u, neighbors]) => {
    neighbors.forEach(v => {
      edges.push({ source: u, target: v });
    });
  });

  return { nodes, edges };
}
```

---

## 4. Tracer 파이프라인

### Python 코드에서 이벤트 발생

```python
def dfs(u):
    trace("node_active", scope="graph", id=u)  # ← 이벤트 발생
    visited.append(u)
    trace("node_visit", scope="graph", ids=[u])

    for v in graph[u]:
        trace("edge_consider", scope="graph", u=u, v=v)
        if v not in visited:
            dfs(v)
```

### Worker에서 이벤트 수집

```javascript
// trace() 호출마다 traceBuffer에 추가
const traceBuffer = [];

Sk.builtins.trace = (type, ...kwargs) => {
  traceBuffer.push({
    type: type,
    scope: kwargs.scope || 'graph',
    id: kwargs.id,
    ids: kwargs.ids,
    u: kwargs.u,
    v: kwargs.v,
    w: kwargs.w,
    // ...
  });
};
```

### VisualStep 생성

```javascript
stepsBuffer.push({
  line: currentLine,
  variables: globals,
  stdout: [...stdoutBuffer],
  events: [...traceBuffer]  // ← 이벤트 포함
});
```

### Visualizer에서 이벤트 처리

```typescript
// GraphSvgVisualizer
const currentEvents = useMemo(() => {
  return steps
    .slice(0, currentStepIndex + 1)
    .flatMap(step => step.events ?? []);
}, [steps, currentStepIndex]);

// 누적 이벤트를 기반으로 노드/간선 상태 결정
events.forEach(event => {
  if (event.type === 'node_active') {
    nodeStates.set(event.id, 'active');
  }
  if (event.type === 'edge_relax') {
    edgeStates.set(`${event.u}->${event.v}`, 'relax');
  }
});
```

---

## 5. 실행 흐름 예시

### Array 1D (Adapter 기반)

```python
# User Code
arr = [10, 20, 30, 40, 50]
active_index = 2
arr[active_index] = 99
```

```
Skulpt 실행
    ↓
globals = {
  arr: [10, 20, 99, 40, 50],
  active_index: 2
}
    ↓
ArrayAdapter.parse(globals)
    ↓
[
  { id: 'item-0', value: 10, status: undefined },
  { id: 'item-1', value: 20, status: undefined },
  { id: 'item-2', value: 99, status: 'active' },  ← active_index
  { id: 'item-3', value: 40, status: undefined },
  { id: 'item-4', value: 50, status: undefined }
]
    ↓
ArrayGraphVisualizer 렌더링 (2번 인덱스 파란색 강조)
```

### Graph DFS (Tracer 기반)

```python
# User Code
graph = { 0: [1, 2], 1: [3], 2: [3], 3: [] }
visited = []

def dfs(u):
    trace("node_active", scope="graph", id=u)
    visited.append(u)
    trace("node_visit", scope="graph", ids=[u])
    for v in graph[u]:
        trace("edge_consider", scope="graph", u=u, v=v)
        if v not in visited:
            dfs(v)
    trace("node_finalize", scope="graph", id=u)

dfs(0)
```

```
Skulpt 실행 (단계별)
    ↓
Step 1: trace("node_active", id=0)
  events = [{ type: "node_active", scope: "graph", id: 0 }]
    ↓
Step 2: visited.append(0), trace("node_visit", ids=[0])
  events = [..., { type: "node_visit", scope: "graph", ids: [0] }]
    ↓
Step 3: trace("edge_consider", u=0, v=1)
  events = [..., { type: "edge_consider", u: 0, v: 1 }]
    ↓
GraphSvgVisualizer
  - node_active → 노드 0 파란색
  - node_visit → 노드 0 회색으로 전환
  - edge_consider → 간선 0→1 주황색
  - node_finalize → 노드 0 초록색
```

---

## 6. 성능 최적화

### Batch Processing
- Worker는 모든 단계를 한 번에 전송 (`BATCH_STEPS`)
- 스트리밍 대신 배치로 네트워크 오버헤드 최소화

### 이벤트 버퍼 제한
- Tracer 이벤트는 각 단계마다 클리어
- 메모리 누수 방지

### useMemo 활용
- `currentEvents`: steps 변경 시에만 재계산
- `derivedNodes/derivedEdges`: 이벤트 기반 노드/간선 구성 캐싱

### 실행 제한
- `MAX_STEPS`: Skulpt 무한루프 방지
- Timeout 가드: Worker 응답 대기 시간 제한

---

## 7. 에러 처리

### Skulpt 에러
```typescript
worker.onmessage = (e) => {
  if (e.data.type === 'ERROR') {
    setStatus('error');
    setError(e.data.message);
    // 사용자에게 에러 메시지 표시
  }
};
```

### Worker 로드 실패
```typescript
worker.onerror = (err) => {
  setError("Simulation Engine Failed to Load");
  setStatus('error');
};
```

### Adapter 파싱 실패
```typescript
if (!Array.isArray(arr)) return []; // 빈 배열 반환
```

---

## 8. 디버깅

### Worker 로그
```javascript
// Worker 내부
console.log("[Skulpt] Step:", stepCount, "Globals:", globals);
console.log("[Skulpt] Events:", traceBuffer);
```

### Store 상태 확인
```typescript
// React DevTools 또는 console
const store = useCTPStore.getState();
console.log(store.steps);
console.log(store.currentStepIndex);
```

### Tracer 이벤트 확인
```typescript
// GraphSvgVisualizer 내부
console.log("Current Events:", currentEvents);
console.log("Derived Nodes:", derivedNodes);
```

---

## 참고

- Skulpt Engine: `web/hooks/use-skulpt-engine.ts`
- Worker 구현: `public/workers/skulpt.worker.js`
- Store: `web/components/features/ctp/store/use-ctp-store.ts`
- Adapter Factory: `web/components/features/ctp/adapters/index.ts`
