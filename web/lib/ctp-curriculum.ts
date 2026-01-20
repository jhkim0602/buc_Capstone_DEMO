
export interface TCPSubConcept {
  id: string;
  title: string;
}

export interface CTPConcept {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  isImportant?: boolean;
  subConcepts?: TCPSubConcept[];
}

export interface CTPCategory {
  id: string;
  title: string;
  description: string;
  color: string;
  concepts: CTPConcept[];
}

export const CTP_DATA: CTPCategory[] = [
  {
    id: "linear-ds",
    title: "선형 자료구조 (Linear)",
    description: "순차적으로 데이터를 저장하고 처리하는 기초 자료구조",
    color: "from-blue-500 to-cyan-400",
    concepts: [
      {
        id: "array",
        title: "배열 (Array)",
        description: "메모리 연속 할당, 인덱스 접근",
        difficulty: "Easy",
        isImportant: true,
        subConcepts: [
          { id: "1d-array", title: "1차원 배열 기초" },
          { id: "2d-array", title: "2차원 배열 & 행렬" },
          { id: "string", title: "문자열 (Char Array)" },
          { id: "vector", title: "동적 배열 (Vector/ArrayList)" },
          { id: "memory-cache", title: "메모리 구조와 캐시" }
        ]
      },
      {
        id: "linked-list",
        title: "연결 리스트 (Linked List)",
        description: "노드 기반 불연속 할당, 단일/이중",
        difficulty: "Medium",
        isImportant: true,
        subConcepts: [
          { id: "singly", title: "단일 연결 리스트 (Singly)" },
          { id: "doubly", title: "이중 연결 리스트 (Doubly)" },
          { id: "circular", title: "원형 연결 리스트 (Circular)" },
          { id: "two-pointers", title: "투 포인터 (Two Pointers)" },
          { id: "memory", title: "메모리 구조 (Memory)" }
        ]
      },
      { id: "stack", title: "스택 (Stack)", description: "LIFO 구조, 재귀, 후위 표기법", difficulty: "Easy" },
      { id: "queue", title: "큐 & 덱 (Queue & Deque)", description: "FIFO 구조, BFS, 캐시 구현", difficulty: "Easy" },
      { id: "hash-table", title: "해시 테이블 (Hash Table)", description: "Key-Value 매핑 (배열 기반 구현 포함)", difficulty: "Medium", isImportant: true },
    ],
  },
  {
    id: "non-linear-ds",
    title: "비선형 자료구조 (Non-Linear)",
    description: "계층적 관계나 연결 망을 표현하는 심화 자료구조",
    color: "from-purple-500 to-pink-400",
    concepts: [
      { id: "tree", title: "트리 (Tree)", description: "이진 트리, 순회, 이진 탐색 트리", difficulty: "Medium" },
      { id: "heap", title: "힙 & 우선순위 큐 (Heap)", description: "최댓값/최솟값 고속 접근", difficulty: "Medium", isImportant: true },
      { id: "graph", title: "그래프 (Graph)", description: "인접 행렬/리스트, 사이클 탐지", difficulty: "Hard" },
      { id: "trie", title: "트라이 (Trie)", description: "문자열 접두사 검색, 자동 완성", difficulty: "Hard" },
      { id: "union-find", title: "분리 집합 (Union-Find)", description: "서로소 집합, 사이클 판별", difficulty: "Medium" },
    ],
  },
  {
    id: "algorithms",
    title: "알고리즘 & 로직",
    description: "문제를 효율적으로 해결하기 위한 핵심 알고리즘",
    color: "from-orange-500 to-amber-400",
    concepts: [
      { id: "sorting", title: "정렬 (Sorting)", description: "Merge, Quick, Heap 정렬", difficulty: "Medium" },
      { id: "binary-search", title: "이분 탐색 (Binary Search)", description: "정렬 데이터 탐색, 파라메트릭", difficulty: "Medium", isImportant: true },
      { id: "dfs-bfs", title: "DFS / BFS", description: "깊이/너비 우선 탐색", difficulty: "Medium", isImportant: true },
      { id: "shortest-path", title: "최단 경로 (Shortest Path)", description: "다익스트라, 플로이드-워셜", difficulty: "Hard" },
      { id: "graph-advanced", title: "고급 그래프 (Advanced Graph)", description: "위상 정렬, MST (Kruskal/Prim)", difficulty: "Hard" },
      { id: "dp", title: "동적 계획법 (DP)", description: "배낭 문제, LCS, LIS", difficulty: "Hard", isImportant: true },
    ],
  },
  {
    id: "meta-concepts",
    title: "메타 & 시스템 디자인",
    description: "코딩 테스트 합격을 넘어 면접까지 대비하는 필수 지식",
    color: "from-emerald-500 to-green-400",
    concepts: [
      { id: "complexity", title: "복잡도 분석 (Complexity)", description: "Big-O, 시간/공간 복잡도", difficulty: "Easy", isImportant: true },
      { id: "sql", title: "SQL 기초", description: "Join, Subquery, 윈도우 함수", difficulty: "Medium" },
      { id: "scalability", title: "확장성 (Scalability)", description: "수직/수평 확장, 로드 밸런싱", difficulty: "Medium" },
      { id: "caching", title: "캐싱 전략 (Caching)", description: "LRU, Write-through, Redis", difficulty: "Medium" },
      { id: "db-design", title: "DB 설계 (DB Design)", description: "정규화, SQL vs NoSQL, 샤딩", difficulty: "Hard" },
    ],
  },
];
