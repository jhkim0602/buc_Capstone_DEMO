# 품질 Spec (Content + Simulator + TOC)

## 목표
- CTP 학습 콘텐츠가 외부 대표 학습 사이트 수준의 **정확성/설명력/실용성**을 갖도록 고도화
- 시각화 시뮬레이터가 **학습 단계에 맞는 상호작용 방식(Button/Code)**을 제공
- TOC가 렌더링된 섹션과 **1:1 정합**되도록 품질 보장

## 품질 기준
### Content
- 개념 정의/불변식/엣지케이스 설명
- 복잡도 표기 일관성(평균/최악 분리)
- 구현 코드의 실용성(직접 구현 + 표준 라이브러리 관점)
- 문제 풀이로의 전이성

### Simulator
- Topic alignment (챕터 핵심 개념 시각화)
- Interactivity (사용자 조작/체험)
- Feedback (로그/라벨/하이라이트 설명력)
- Code-to-Visual 연결성

### TOC
- 실제 섹션과 TOC 항목 일치
- Intro sub(Problem/Definition/Analogy) 및 Guide sub 표시

## 수용 기준
- 비교 분석 문서화 완료
- 고도화 계획 수립 및 체크리스트 유지
- Simulator 모드 정책 및 챕터별 매핑 확정
- TOC 정적 검증 0건, 런타임 디버그 완료

## 참고 정책
- 시각화 운영 정책: `policy.md`
- 챕터별 모드 맵: `mode-map.md`
