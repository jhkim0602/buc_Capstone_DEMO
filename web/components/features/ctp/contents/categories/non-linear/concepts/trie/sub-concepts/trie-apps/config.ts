import { CTPModuleConfig } from "@/components/features/ctp/common/types";

export const TRIE_APPS_CONFIG: CTPModuleConfig = {
  title: "트라이 응용",
  description: "트라이 응용의 핵심 개념을 학습합니다.",
  mode: "code",
  tags: ["Trie"],
  story: {
    problem: "문자열 검색을 빠르게 하면서도 정렬된 결과를 유지해야 합니다.",
    definition: "트라이는 접두사 기반 필터링과 사전순 탐색에 적합합니다.\n접두사 노드 아래를 DFS로 순회하면 자동완성 후보를 쉽게 얻을 수 있습니다.\n\n**불변식**\n- end 표시가 있는 노드만 하나의 완성 단어로 인정됩니다.",
    analogy: "입력창에 글자를 치면 관련 검색어가 위에서부터 뜹니다.",
    playgroundDescription: "이번 단계에서 무엇을 볼까?\n- prefix 경로가 고정된 뒤 후보가 수집되는 과정\n- suggestions 배열이 늘어나는 흐름\n- 사전순 정렬이 유지되는 이유",
  },
  features: [
    { title: "Autocomplete", description: "prefix 노드 아래를 순회해 후보를 만듭니다." },
    { title: "사전순 출력", description: "알파벳 순서대로 자식을 순회하면 정렬된 결과가 나옵니다." },
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
      description: "트라이 후보 수집(DFS)",
      code: `def collect(node, prefix, out):
    if node.end:
        out.append(prefix)
    for ch, nxt in node.children.items():
        collect(nxt, prefix + ch, out)
`,
    }
  ],
  initialCode: {
    python: `# === USER CODE START ===
# Trie Applications: Autocomplete
words = ["car", "card", "care", "dog", "door"]
prefix = "car"
path_nodes = ["c", "ca", "car"]
active_prefix = "car"
trace("trie_step", scope="trie", path=path_nodes)
trace("trie_prefix", scope="trie", path=path_nodes)

suggestions = []
active_index = -1

for w in words:
    if w.startswith(prefix):
        suggestions.append(w)
        active_index = len(suggestions) - 1

arr = suggestions

# === USER CODE END ===
# --- 출력 확인 ---
# 필요 변수명을 아래 목록에 추가하세요.


def _dump(name):
    if name in globals():
        print(name + ":", globals()[name])

for _k in ["word", "prefix", "result"]:
    _dump(_k)
`
  },
  practiceProblems: [
    { id: 5670, title: "휴대폰 자판", tier: "Gold IV", description: "Trie 응용." },
    { id: 5052, title: "전화번호 목록", tier: "Gold IV", description: "Prefix 판정." },
    { id: 14426, title: "접두사 찾기", tier: "Silver I", description: "Prefix 검색." },
  ],
};
