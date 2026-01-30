# 콘텐츠 확장 계획 (Config 중심)

## 0) 목적
- 각 `config.ts`의 **설명 분량/구성 밀도**를 올려 교재형 학습 흐름을 완성한다.
- “개념 → 시각화 → 구현 → 문제풀이”가 **각 챕터 단위**로 닫히도록 한다.

---

## 1) 문제 정의 (현 상태)
- 다수의 config가 **Story/Features/Implementation**의 분량이 얕아
  학습 흐름이 단절되어 보임.
- Basic 설명 위주라 **예제/반례/주의점/활용**이 거의 없음.
- 기본 코드에 `print()`가 없어 **실행 결과 피드백**이 약함.

---

## 2) 확장 기준 (모든 config 공통)
**아래 기준을 충족하지 못하면 보완 대상**

### 2-1. Story (필수 4항목, 각 2~3문장)
- problem: 현실/코테 상황 1개 포함
- definition: 불변식/핵심 규칙 포함
- analogy: 직관적 비유 1개
- playgroundDescription: 시각화에서 관찰할 포인트 2개

### 2-2. Features (최소 4개)
- 시간/공간 trade-off 1개
- 핵심 연산 1개
- 대표 사용 시나리오 1개
- 함정/주의점 1개

### 2-3. Implementation (최소 2개)
- 표준 구현 + 최적/대안 구현
- 각 코드에 **설명 2~3줄** 필수

### 2-4. Guide (선택이지만 권장)
- `guide` 섹션 2개 이상
- 예: “핵심 규약”, “디버깅 포인트”

### 2-5. Initial Code
- `print()` 최소 2회 (입력/결과 확인)
- 시각화 변수 규약 주석 포함
- 가능하면 Trace 이벤트 1개 이상
- Skulpt 제한: `locals()` 금지, **globals() 기반 출력 헬퍼** 사용
- 출력 블록은 **짧고 편집 가능한 목록** 형태로 유지

### 2-6. Practice Problems
- 최소 3개, 난이도 분산(Silver/Gold)
- 각 문제는 **해당 챕터 핵심과 1:1 매칭**되도록 설명

---

## 3) 우선순위 (콘텐츠 확장)
1) **Algorithms** (Sorting/DP/Shortest Path/Advanced Graph)
2) **Non-Linear** (Graph/Trie/Union-Find/Heap)
3) **Linear** (Queue/Deque/Hash)

---

## 4) 작업 방식
1) **전수 스캔**: config의 Story/Features/Implementation 개수 체크
2) **보완 배치**: 부족한 항목을 템플릿 기반으로 추가
3) **통합 보강 레이어 적용**: 모든 모듈에 공통 확장 콘텐츠를 주입 (스토리/특징/가이드)
4) **코드 템플릿 통일**: print/trace/규약 주석 삽입
5) **QA**: 각 챕터의 “설명 → 코드 → 문제” 연결성 체크

---

## 5) 최소 템플릿 (샘플)
```ts
story: {
  problem: "...",
  definition: "...",
  analogy: "...",
  playgroundDescription: "..."
},
features: [
  { title: "핵심 연산", description: "..." },
  { title: "시간/공간", description: "..." },
  { title: "사용 시나리오", description: "..." },
  { title: "주의점", description: "..." },
],
implementation: [
  { language: "python", description: "기본 구현", code: "..." },
  { language: "python", description: "최적/대안 구현", code: "..." },
],
initialCode: {
  python: `# 입력/상태 설정\n# print(...)`
}
```

---

## 6) 완료 정의
- 모든 config가 **Story/Features/Implementation 최소 기준 충족**
- 기본 코드에 print 출력 포함
- 커스텀 코드 가이드가 문서화되어 있음
 - 공통 확장 레이어(스토리/가이드/특징) 적용 완료
