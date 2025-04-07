export  const editLink = async (id: string, linkData: any) => {
  try {
    const res = await fetch(`/api/links/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ links: linkData }),
    });

    if (!res.ok) throw new Error('Link Shot 삭제 요청 실패');

    const data = await res.json();
    // console.log('저장 결과:', data);
    return data;
  } catch (err) {
    console.error('Link Shot 삭제 실패:', err);
  }
};