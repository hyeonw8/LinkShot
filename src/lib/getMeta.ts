export const getMeta = async (url: string) => {
  const response = await fetch('/api/meta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  if (!response.ok) {
    throw new Error('메타데이터 요청 실패');
  }

  const data = await response.json();

  return {
    title: data.title,
    image: data.image,
    description: data.description,
  };
}