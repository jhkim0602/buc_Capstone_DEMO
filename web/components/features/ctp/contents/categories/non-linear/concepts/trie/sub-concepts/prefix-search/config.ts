import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const PREFIX_SEARCH_CONFIG: CTPModuleConfig = {
  title: "접두사 탐색 (Prefix Search)",
  description: "접두사 탐색 (Prefix Search)의 핵심 개념을 학습합니다.",
  mode: "code",
  tags: ["Trie"],
  story: {
    problem: "자동완성/사전 검색에서 접두사로 빠르게 후보를 좁혀야 합니다.",
    definition: "트라이에서 접두사를 따라 내려간 노드 아래가 모두 후보입니다.\n접두사 길이만큼 내려가는 데 O(L)이 걸리고, 이후 후보 수만큼 열거하면 됩니다.\n\n**불변식**\n- 접두사 경로가 끊기면 후보는 0개이다.",
    analogy: "전화번호부에서 '김'으로 시작하는 항목만 보는 것과 같습니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- prefix 경로가 어떻게 강조되는지\n- active_prefix가 가리키는 위치\n- 후보 리스트가 늘어나는 과정",
  },
  features: [
    { title: "Prefix 탐색", description: "접두사 길이만큼 내려가면 후보 집합을 얻습니다." },
    { title: "응용성", description: "자동완성, 스팸 필터 등 다양한 분야에 사용됩니다." },
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
      description: "접두사 존재 여부 체크",
      code: `def starts_with(root, prefix):
    node = root
    for ch in prefix:
        if ch not in node.children:
            return False
        node = node.children[ch]
    return True
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Trie Prefix Search (concept)
words = ["apple", "app", "apply", "apt", "banana", "band"]
prefix = "app"
path_nodes = ["a", "ap", "app"]
active_prefix = "app"
trace("trie_step", scope="trie", path=path_nodes)
trace("trie_prefix", scope="trie", path=path_nodes)

matches = []
active_index = -1

for w in words:
    if w.startswith(prefix):
        matches.append(w)
        active_index = len(matches) - 1

arr = matches

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["prefix", "path_nodes", "active_prefix", "matches"]:
    _dump(_k)
`
  },
  practiceProblems: [
    { id: 14425, title: "문자열 집합", tier: "Silver III", description: "Trie 기본." },
    { id: 5052, title: "전화번호 목록", tier: "Gold IV", description: "Trie/Prefix 판정." },
    { id: 5670, title: "휴대폰 자판", tier: "Gold IV", description: "Trie 입력 횟수." },
  ],
};
