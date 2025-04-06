export interface ContentType {
  head?: string; // 썸네일 이미지
  date: string; // 작성 날짜
  context: string; // 포스트 미리보기 요약글
  href?: string; // 링크
  headline: string; // 제목
  tags: string[]; // 태그 목록
}
