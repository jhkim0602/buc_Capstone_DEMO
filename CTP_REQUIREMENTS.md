# CTP 요구사항 명세서

## 1. 문서 목적
CTP(Coding Test Prep) 모듈을 "완결형 교과서형 학습 시스템"으로 완성하기 위한 요구사항을 정의한다. 본 명세서는 콘텐츠 구조, 기능, 품질 기준, 제약사항, 수용 기준을 포함한다.

## 2. 범위 (Scope)
### 포함
- CTP 커리큘럼 전체 구조(Linear/Non-Linear/Algorithms/Meta)
- 개념/챕터 단위 학습 흐름(교과서형 6단 구성)
- 시각화 및 인터랙티브 실습
- Python 기반 구현 코드 및 실습
- Baekjoon 문제 추천(전 챕터 통일)
- 좌측 커리큘럼/우측 TOC의 완전한 정합성

### 제외
- 다국어 코드 예제(Javascript/C++/Java)
- 외부 문제 출처(LeetCode 등)
- 사용자 계정/로그인/진도 저장

## 3. 목표 (Goals)
- 사용자가 챕터 하나를 10~15분 내 "이해 → 시각화 → 코드 → 문제"로 완주할 수 있을 것
- 모든 Chapter Topics가 동일한 학습 흐름을 갖고 있을 것
- TOC/SideBar/Content가 완전히 정합되어 연결될 것

## 4. 핵심 원칙 (Product Principles)
1) Python 단일 언어
2) 일관된 섹션 구조
3) 시각화 중심 학습
4) Baekjoon 문제 통일
5) 자동 TOC 기반

## 5. 정보 구조(IA)
### 상위 카테고리
- Linear Data Structures
- Non-Linear Data Structures
- Algorithms
- Meta Concepts

### 학습 흐름(모든 챕터 공통)
1. Intro (Problem/Definition/Analogy)
2. Features
3. Visualization
4. Complexity
5. Implementation (Python)
6. Practice (Baekjoon)

## 6. 기능 요구사항
### 6.1 커리큘럼/레지스트리
- 모든 개념은 CTP_DATA에 정의되어야 한다.
- 모든 개념은 CTP_CONTENT_REGISTRY에 연결되어야 한다.
- 모든 개념은 서브개념(Chapter Topics)을 보유해야 한다.

### 6.2 TOC
- TOC는 렌더링된 섹션만 자동 수집한다.
- Intro 하위(Problem/Definition/Analogy)는 sub TOC로 표시한다.
- Visualization의 Guide 영역은 sub TOC로 표시한다.

### 6.3 실습
- 코드는 항상 Python으로 제공된다.
- 실습은 Skulpt 기반 또는 인터랙티브 기반으로 동작한다.

### 6.4 Practice
- 모든 챕터는 2~3개의 Baekjoon 문제를 포함한다.
- 문제는 id, tier, description, link 형식으로 제공한다.

## 7. 품질 요구사항
- 모든 페이지는 컴파일 오류가 없어야 한다.
- TOC/Sidebar에서 dead-link가 없어야 한다.
- 각 챕터가 최소 6개 섹션을 갖는다.
- 시뮬레이션에서 기본 실행이 가능해야 한다.

## 8. 제약사항
- 언어: Python only
- 문제 출처: Baekjoon only
- UI 스타일: 기존 CTP 디자인 유지

## 9. 수용 기준 (Acceptance Criteria)
- CTP_DATA, Content Registry, Sidebar가 모두 정합
- 모든 챕터가 6섹션 완비
- TOC가 실제 섹션과 1:1로 매칭
- Baekjoon 문제만 존재

## 10. 변경 이력
- 2026-01-27: Python 단일, Baekjoon 통일 확정
