# Core Validation

## 2026-01-28
### CTP_DATA ↔ Registry ↔ Chapter Topics 정합
- 방법: `ctp-curriculum.ts`의 subConcepts ID와 각 `*-registry.ts`의 모듈 키 비교
- 결과: **불일치 없음**
- 참고: registry는 single/double quote 혼용 → 정규식으로 양쪽 모두 검출

### Practice 문제 출처 검사
- 방법: `web/components/features/ctp/contents` 정적 스캔 (LeetCode/Programmers/Codeforces 등 키워드 검색)
- 결과: **비-Baekjoon 출처 0건**

### 런타임 검증 (TOC Debug)
- 상태: **완료(사용자 확인)**
- 사용자 환경에서 dev 서버 정상 실행 확인
- 로그: `npm --prefix web run dev` → `Ready in 1564ms`
- 주의: webpack cache 경고는 비치명적
- 오류: trie registry 중복 import로 `TreeGraphVisualizer` 재정의 에러
- 조치: 중복 import 제거 완료
- 오류: union-find registry 중복 import로 `TreeGraphVisualizer` 재정의 에러
- 조치: 중복 import 제거 완료
- TOC Debug 확인 완료 (사용자 확인)
