import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const TRIE_BASICS_CONFIG: CTPModuleConfig = {
  title: "트라이 기본 (Trie Basics)",
  description: "문자열 검색에 특화된 트리 구조입니다. 검색어 자동완성이나 사전 구현에 필수적인 자료구조입니다.",
  mode: "interactive",
  interactive: {
    components: ["peek", "reset"],
    maxSize: 8,
  },
  tags: ["Trie", "Prefix Tree", "Autocomplete"],
  story: {
    problem: `수십만 개의 단어가 있는 사전에서 "Apple"이라는 단어를 찾으려고 합니다.
배열에 저장했다면 처음부터 끝까지 스캔하거나(O(N)), 정렬 후 이진 탐색(O(log N))을 해야 합니다.
하지만 문자열의 길이가 길다면, 문자열 비교 자체도 시간이 걸립니다.`,
    definition: `트라이(Trie)는 **문자열의 접두사(Prefix)**를 공유하는 트리 형태의 자료구조입니다.

**핵심 규칙**
- 루트에서 시작하여 글자 하나하나를 따라가며 자식 노드로 이동합니다.
- 단어의 끝(End of Word)을 표시하여, 여기까지가 '완성된 단어'임을 알립니다.
- 'App'과 'Apple'은 'App'까지의 경로를 공유하므로 메모리를 절약할 수 있습니다.

**불변식**
- 루트에서 어떤 노드까지의 경로는 그 노드에 대응하는 문자열 접두사이다.
- 같은 접두사를 가진 단어들은 항상 같은 경로를 공유한다.`,
    analogy: `자동완성 기능을 생각해보세요. 'A'를 입력하면 A로 시작하는 단어들이 뜨고, 'Ap'를 입력하면 범위가 좁혀집니다.
사전을 찾을 때 첫 글자(A) 인덱스를 찾고, 두 번째 글자(p)를 찾는 과정과 동일합니다.`,
    playgroundDescription: `이번 단계에서 무엇을 볼까?
- **경로 공유**: "cat"과 "car"를 넣었을 때 "ca"까지 같은 길을 가는 모습
- **End Mark**: 단어가 끝나는 지점에 표시되는 빨간색/강조 표시
- **검색 속도**: 단어 개수(N)와 상관없이, 오직 단어 길이(L)만큼만 이동하면 찾을 수 있음

**실습 요약**
- 글자 단위로 트리가 깊어짐
- 공통 접두사가 많을수록 트리가 뚱뚱해지지 않고 날씬하게 유지됨`
  },
  features: [
    { title: "접두사 트비 (Prefix Tree)", description: "공통된 앞부분을 공유하여 저장하므로, 비슷한 단어가 많을수록 메모리 효율이 좋습니다." },
    { title: "고속 검색 O(L)", description: "단어의 개수(N)와 무관하게, 찾으려는 단어의 길이(L)만큼만 탐색하면 됩니다." },
    { title: "자동완성 구현", description: "특정 접두사로 시작하는 모든 단어를 빠르게 긁어모을 수 있어 검색 엔진에 필수적입니다." }
  ],
  complexity: {
    access: "O(1)",
    search: "O(L)",
    insertion: "O(L)",
    deletion: "O(L)",
  },
  implementation: [
    {
      language: "python",
      description: "Trie 삽입/검색",
      code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.children.setdefault(ch, TrieNode())
        node.end = True

    def search(self, word):
        node = self.root
        for ch in word:
            if ch not in node.children:
                return False
            node = node.children[ch]
        return node.end
`,
    }
  ],
  practiceProblems: [
    { id: 14425, title: "문자열 집합", tier: "Silver III", description: "트라이로 문자열 포함 여부를 확인합니다." },
    { id: 5052, title: "전화번호 목록", tier: "Gold IV", description: "접두사 충돌을 트라이로 판별합니다." },
    { id: 14725, title: "개미굴", tier: "Gold III", description: "계층 문자열 구조를 트라이로 출력합니다." },
  ],
};
