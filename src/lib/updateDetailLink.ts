export const updateDetailLink = async (id: string, linkData: any) => {
  if (!id) {
    throw new Error('ID is required');
  }

  // console.log("Fetching link with ID:", id); // 디버깅용

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/links/${id}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ links: linkData }),
    }
  );

  if (!response.ok) {
    throw new Error('해당 Link Shot을 수정하는 데 실패했습니다.');
  }

  const data = await response.json();

  return data;
};
