export const toggleLink = async (id: string, isPin: boolean) => {
  try {
    const res = await fetch('/api/links', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, isPin }),
    });

    if (!res.ok) throw new Error('Link Shot 카드 고정 요청 실패');

    const data = await res.json();
    // console.log('저장 결과:', data);
  } catch (err) {
    console.error('Link Shot 카드 고정 실패:', err);
  }
};
