export const deleteLink = async (id: string) => {
  const res = await fetch('/api/links', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(id),
  });

  if (!res.ok) {
    let message = 'Link Shot 삭제 요청 실패';
    try {
      const body = await res.json();
      if (body?.error) message = body.error;
    } catch {}
    throw new Error(message);
  }

  const data = await res.json();
  if (data?.error) throw new Error(data.error);
  return data;
};
