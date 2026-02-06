
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
          { id: "string", title: "문자열 (Char Array)" }
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
          { id: "two-pointers", title: "투 포인터 (Two Pointers)" }
        ]
      },
      {
        id: "stack",
        title: "스택 (Stack)",
        description: "LIFO 구조, 재귀, 후위 표기법",
        difficulty: "Easy",
        subConcepts: [
          { id: "lifo-basics", title: "LIFO & 기초 연산" },
          { id: "array-stack", title: "배열 스택 (Array Stack)" },
          { id: "linked-stack", title: "연결 리스트 스택 (LL Stack)" },
          { id: "monotonic", title: "모노토닉 스택 (Monotonic)" }
        ]
      },
      {
        id: "queue",
        title: "큐 & 덱 (Queue & Deque)",
        description: "FIFO 구조, BFS, 캐시 구현",
        difficulty: "Easy",
        subConcepts: [
          { id: "linear-queue", title: "선형 큐 (Linear Queue)" },
          { id: "circular-queue", title: "원형 큐 (Circular Queue)" },
          { id: "deque", title: "덱 (Deque)" },
          { id: "pq-basics", title: "우선순위 큐 기초 (Priority Queue)" }
        ]
      },
      {
        id: "hash-table",
        title: "해시 테이블 (Hash Table)",
        description: "Key-Value 매핑 (배열 기반 구현 포함)",
        difficulty: "Medium",
        isImportant: true,
        subConcepts: [
          { id: "hash-basics", title: "해시 기본 (Hash Basics)" },
          { id: "collision", title: "충돌 처리 (Collision Handling)" },
          { id: "hash-implement", title: "해시 구현" }
        ]
      },
    ],
  },
  {
    id: "non-linear-ds",
    title: "비선형 자료구조 (Non-Linear)",
    description: "계층적 관계나 연결 망을 표현하는 심화 자료구조",
    color: "from-purple-500 to-pink-400",
    concepts: [
      {
        id: "tree",
        title: "트리 (Tree)",
        description: "이진 트리, 순회, 이진 탐색 트리",
        difficulty: "Medium",
        subConcepts: [
          { id: "tree-basics", title: "트리 기본 (Tree Basics)" },
          { id: "tree-properties", title: "트리 성질 (차수/거리/레벨/크기/서브트리)" },
          { id: "binary-traversal", title: "이진 트리 순회 (Traversal)" },
          { id: "bst", title: "이진 탐색 트리 (BST)" }
        ]
      },
      {
        id: "heap",
        title: "힙 & 우선순위 큐 (Heap)",
        description: "최댓값/최솟값 고속 접근",
        difficulty: "Medium",
        isImportant: true,
        subConcepts: [
          { id: "heap-basics", title: "힙 기본 (Heap Basics)" },
          { id: "min-heap", title: "최소 힙 (Min Heap)" },
          { id: "max-heap", title: "최대 힙 (Max Heap)" }
        ]
      },
      {
        id: "graph",
        title: "그래프 (Graph)",
        description: "인접 행렬/리스트, 사이클 탐지",
        difficulty: "Hard",
        subConcepts: [
          { id: "graph-representation", title: "그래프 표현 (Adj List/Matrix)" },
          { id: "dfs", title: "DFS" },
          { id: "bfs", title: "BFS" },
          { id: "cycle-detection", title: "사이클 탐지" },
          { id: "shortest-path", title: "최단 경로 (Dijkstra)" },
          { id: "mst", title: "최소 신장 트리 (MST)" }
        ]
      },
    ],
  },
  {
    id: "algorithms",
    title: "알고리즘 & 로직",
    description: "문제를 효율적으로 해결하기 위한 핵심 알고리즘",
    color: "from-orange-500 to-amber-400",
    concepts: [
      {
        id: "sorting",
        title: "정렬 (Sorting)",
        description: "Merge, Quick, Heap 정렬",
        difficulty: "Medium",
        subConcepts: [
          { id: "bubble-sort", title: "버블 정렬 (Bubble Sort)" },
          { id: "selection-sort", title: "선택 정렬 (Selection Sort)" },
          { id: "insertion-sort", title: "삽입 정렬 (Insertion Sort)" },
          { id: "merge-sort", title: "병합 정렬 (Merge Sort)" },
          { id: "quick-sort", title: "퀵 정렬 (Quick Sort)" },
          { id: "heap-sort", title: "힙 정렬 (Heap Sort)" }
        ]
      },
      {
        id: "binary-search",
        title: "이분 탐색 (Binary Search)",
        description: "정렬 데이터 탐색, 파라메트릭",
        difficulty: "Medium",
        isImportant: true,
        subConcepts: [
          { id: "basic-binary-search", title: "기본 이분 탐색" },
          { id: "parametric-search", title: "파라메트릭 서치" }
        ]
      },
      {
        id: "dfs",
        title: "DFS",
        description: "깊이 우선 탐색",
        difficulty: "Medium",
        isImportant: true,
        subConcepts: [
          { id: "dfs-basics", title: "DFS 기본" },
          { id: "dfs-backtracking", title: "DFS 백트래킹" },
          { id: "dfs-tree-traversal", title: "트리 DFS 순회" },
          { id: "dfs-cycle-detection", title: "DFS 사이클 탐지" },
          { id: "dfs-path-reconstruction", title: "DFS 경로 복원" }
        ]
      },
      {
        id: "bfs",
        title: "BFS",
        description: "너비 우선 탐색",
        difficulty: "Medium",
        isImportant: true,
        subConcepts: [
          { id: "bfs-basics", title: "BFS 기본" },
          { id: "grid-traversal", title: "격자 탐색 응용" },
          { id: "bfs-multi-source", title: "멀티 소스 BFS" },
          { id: "bfs-zero-one", title: "0-1 BFS" },
          { id: "bfs-path-reconstruction", title: "BFS 경로 복원" }
        ]
      },
      {
        id: "shortest-path",
        title: "최단 경로 (Shortest Path)",
        description: "다익스트라, 플로이드-워셜",
        difficulty: "Hard",
        subConcepts: [
          { id: "dijkstra", title: "다익스트라 (Dijkstra)" },
          { id: "floyd-warshall", title: "플로이드-워셜" }
        ]
      },
      {
        id: "graph-advanced",
        title: "고급 그래프 (Advanced Graph)",
        description: "위상 정렬, MST (Kruskal/Prim)",
        difficulty: "Hard",
        subConcepts: [
          { id: "topological-sort", title: "위상 정렬 (Topological Sort)" },
          { id: "mst", title: "최소 신장 트리 (MST)" }
        ]
      },
      {
        id: "dp",
        title: "동적 계획법 (DP)",
        description: "배낭 문제, LCS, LIS",
        difficulty: "Hard",
        isImportant: true,
        subConcepts: [
          { id: "dp-basics", title: "DP 기본" },
          { id: "dp-1d", title: "1차원 DP" },
          { id: "dp-2d", title: "2차원 DP" },
          { id: "dp-patterns", title: "대표 패턴 (LIS/Knapsack)" }
        ]
      },
    ],
  },
];
