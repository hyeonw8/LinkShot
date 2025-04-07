export const deleteLink = async (id: string) => {
  try {
    const res = await fetch('/api/links', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(id),
    });

    if (!res.ok) throw new Error('Link Shot 삭제 요청 실패');

    const data = await res.json();
    // console.log('저장 결과:', data);
    // return data;
  } catch (err) {
    console.error('Link Shot 삭제 실패:', err);
  }
};
