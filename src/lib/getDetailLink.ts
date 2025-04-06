export const getDetailLink = async (id: string) => {
  if (!id) {
    throw new Error('ID is required');
  }

  console.log('Fetching link with ID:', id); // 디버깅용

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/links/${id}`
  );

  if (!response.ok) {
    throw new Error('해당 링크 데이터를 불러오는 데 실패했습니다.');
  }

  const data = await response.json();

  return data;
};
