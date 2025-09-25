# 📌 LinkShot

링크를 카드처럼 저장하고 공유하는 북마크 서비스

---

## 📖 소개
### 🍀 한 줄 정리
URL에서 Open Graph 메타데이터를 파싱해 자동 저장하고, 메타데이터를 기반으로 콘텐츠를 손쉽게 정리할 수 있는 링크 관리 서비스입니다.

---

## 🚀 프로젝트 개요
- **기간**: 2025.04 (3일)
- **형태**: 개인 프로젝트 (추후 리팩터링 및 기능 추가 예정)

---

## 🛠 기술 스택
- **언어, 프레임워크**

  ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white)
  ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=Next.js&logoColor=white)
- **상태 관리**

  ![TanStack Query](https://img.shields.io/badge/TanStack%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)
  ![Zustand](https://img.shields.io/badge/Zustand-DC7C26?style=for-the-badge&logo=zustand&logoColor=white)
- **스타일링, 테마 관리**

  ![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=Tailwind%20CSS&logoColor=white)
  ![Next Themes](https://img.shields.io/badge/Next--Themes-111?style=for-the-badge&logo=next.js&logoColor=white)
- **BaaS**:

  ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)  
- **기타**: cheerio (메타데이터 파싱), Clipboard API

---

## ✨ 주요 기능
- **메타데이터 추출**  
  - cheerio를 이용해 입력한 링크에서 썸네일, 제목 등을 추출하고 카드 형태로 저장  

- **링크 관리**  
  - 링크 저장 및 클립보드 복사/공유 기능 제공  

- **카테고리 필터링, 즐겨찾기(고정 기능)**  
  - 사용자가 생성한 카테고리를 기반으로 필터링 기능 지원  

- **라이트/다크 모드**  
  - next-themes 기반 테마 전환 지원  

---

## 🔥 트러블슈팅

### Next.js 15 동적 라우팅 매개변수 오류
- **문제**  
  `params` 객체가 Promise로 변경되었음에도 `await` 없이 접근하여 오류 발생  

  ```bash
  Error: Route "/Links/[id]" used 'params.id'.
  params' should be awaited before using its properties.
  ```
- **원인**
  Next.js 15에서 params가 비동기적으로 변경되었음을 인지하지 못하고 기존 방식으로 접근
- **해결 방법**
  params를 async 함수 내에서 await 처리하여 정상적으로 값을 추출

---

## ⚡ 성능 개선

### 리렌더링 최적화
- **문제**
  - 동일한 정렬/카테고리 선택 시에도 state가 갱신되어 불필요한 리렌더링 발생
  - props로 전달되는 함수들이 매 렌더마다 새로 생성되어 memoized 컴포넌트가 불필요하게재 렌더링됨

- **개선 방법**
  - React.memo + 커스텀 비교 함수로 불필요한 리렌더링 방지
  - useCallback으로 함수 메모이제이션, 참조 값 유지
  - 이벤트 핸들러 내부에서 이전 값과 새 값을 비교한 후, 실제 변경이 있을 때만 state를 업데이트
- **결과**
  - 불필요한 리렌더링 제거
  - 카드 리스트 컴포넌트 평균 렌더링 횟수 50~70% 감소

---

## 스크린샷
<img width="934" height="795" alt="스크린샷 2025-09-25 오후 1 37 07" src="https://github.com/user-attachments/assets/c8c8fc67-6b1b-4708-aaed-958c2e158448" />
<img width="934" height="785" alt="스크린샷 2025-04-06 오후 8 53 13" src="https://github.com/user-attachments/assets/c89304d9-0b37-426b-9c5b-0bb892aa3f9c" />


