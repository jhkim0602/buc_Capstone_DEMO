import { PracticeProblem } from "../../../../../../shared/ctp-practice";
import { ComplexityData } from "../../../../../../shared/ctp-complexity";

export const STRING_CONFIG = {
  title: "String (문자열과 불변성)",
  description: "문자열은 단순한 배열이 아닙니다. '변경 불가능(Immutable)'이라는 강력한 특성 덕분에 안전하지만, 함부로 다루면 성능 폭탄을 맞을 수 있습니다.",
  tags: ["String Pool", "Immutable", "StringBuilder", "Rabin-Karp"],

  story: {
    problem: `문서의 내용을 수정할 때마다 새로운 종이에 처음부터 다시 쓴다고 생각해보세요.\n'안녕하세요'를 '안녕히가세요'로 바꾸려고 전체를 다시 쓴다면?\n\n문자열이 길어질수록, 단순히 한 글자를 고치는 데에도 엄청난 비용(전체 복사)이 들 수 있습니다.`,
    definition: "문자들의 배열이지만, 한번 생성되면 내용을 바꿀 수 없는(Immutable) 특수한 자료구조. 변경이 필요하면 아예 '새로' 만듭니다.",
    analogy: "이미 찍힌 '도장'과 같습니다. 도장의 글자를 파낼 수 없으니, 다른 글자가 필요하면 '새 도장'을 파야 합니다. 대신 한번 파둔 도장은 여러 곳에 안심하고 막 찍어(공유)도 됩니다.",
    playgroundLimit: "문자열을 합칠 때마다 메모리 주소(ID)가 바뀌는지 확인해보세요. 내용이 같아도 '새로운 객체'가 만들어질까요?"
  },

  features: [
    { title: "String Constant Pool", description: "같은 문자열을 여러 번 쓸 때, 메모리를 아끼기 위해 '수영장(Pool)'에 하나만 띄워두고 같이 씁니다. `a='hi'; b='hi'`일 때 a와 b는 같은 메모리를 가리킵니다." },
    { title: "불변의 양면성", description: "장점: 여러 쓰레드에서 공유해도 안전합니다(Thread-safe). 단점: `s += 'a'`를 100만 번 하면, 100만 개의 쓰레기 객체가 생깁니다 (O(N^2))." },
    { title: "StringBuilder / Join", description: "문자열을 변경해야 할 땐, 임시로 '가변 배열(List, Builder)'에 담아두고 마지막에 한 번만 도장을 쾅! 찍어 문자열로 만듭니다." },
  ],

  deepDive: {
      interviewProbablity: "Medium",
      realWorldUseCases: [
          "보안(Security): DB 비밀번호나 네트워크 소켓 경로는 절대 변하면 안 되므로 불변 문자열을 씁니다.",
          "HashMap Key: 불변이므로 해시값(HashCode)이 변하지 않아 캐싱해두고 빠르게 찾을 수 있습니다.",
          "대규모 로그 처리: 수많은 'INFO' 로그 문자열은 Pool 덕분에 메모리를 거의 차지하지 않습니다."
      ],
      performanceTrap: "반복문 안에서 `+=` 연산자로 문자열 합치기 금지! 반드시 `list.append()` 후 `join()` 하거나 `StringBuilder`를 쓰세요."
  },

  comparison: {
     vs: "Mutable String (C언어 char[])",
     pros: ["공유해도 값이 바뀔 걱정이 없음 (Side-effect Free)", "해시 키로 사용하기 적합"],
     cons: ["단순 수정 연산 시 오버헤드 큼 (전체 복사 발생)"]
  },

  complexity: {
    access: "O(1)",
    search: "O(N)",
    insertion: "O(N) (전체 복사)",
    deletion: "O(N) (전체 복사)",
  } as ComplexityData,

  practiceProblems: [
    {
      id: 1152,
      title: "단어의 개수",
      tier: "Bronze II",
      description: "문자열을 공백 기준으로 자르고(Split), 빈 문자열 처리를 주의해야 하는 기초 문제입니다."
    },
    {
      id: 1157,
      title: "단어 공부",
      tier: "Bronze I",
      description: "대소문자 무시, 알파벳 빈도수 카운팅(Map/Array 활용)을 연습합니다."
    },
    {
      id: 9935,
      title: "문자열 폭발",
      tier: "Gold IV",
      description: "문자열을 계속 지워야 할 때, 스택(Stack)을 이용해 O(N)에 처리하는 고급 테크닉입니다."
    }
  ] as PracticeProblem[],

  implementation: [
    {
      language: 'python' as const,
      description: "Python에서 `+=`로 문자열을 합치는 것과 `join`을 쓰는 것의 속도 차이는 엄청납니다.",
      code: `# Good Pattern (List Join)
chars = []
for i in range(100):
    chars.append(str(i))

# 리스트에 모아뒀다가 한 방에 합치기 (O(N))
result = "".join(chars)


# Bad Pattern (String concat)
result = ""
for i in range(100):
    # 매번 이전 문자열을 복사하고 새 문자열 생성 (O(N^2))
    result += str(i)`
    }
  ],

  initialCode: {
    python: `# Python String Pool & Identity
# Python은 짧은 영문자열 등을 자동으로 Pool에 캐싱합니다.

a = "Hello"
b = "Hello"

# is 연산자는 메모리 주소를 비교합니다.
print(f"a is b: {a is b}") # True (같은 도장!)

# 런타임에 만들어진 문자열은 어떨까요?
c = "".join(["He", "llo"])
print(f"a is c: {a is c}") # False (모양은 같지만 새로 판 도장)
print(f"a == c: {a == c}") # True (찍힌 글자는 같음)

# 강제로 Pool에 등록하기 (Interning)
import sys
c = sys.intern(c)
print(f"After intern, a is c: {a is c}") # True`,
  },

  commandReference: {
     python: [
        { label: '길이', code: 'len(s)' },
        { label: '자르기', code: 's[start:end]' },
        { label: '검색', code: 's.find("x")' },
        { label: '배열로', code: 'list(s)' }
     ]
  }
};
