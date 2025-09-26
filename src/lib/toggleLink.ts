export const toggleLink = async (id: string, isPin: boolean) => {
  const res = await fetch('/api/links', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, isPin }),
  });

  if (!res.ok) {
    if (!res.ok) {
      // 인증 에러
      if (res.status === 401) {
        throw new Error('AUTH_REQUIRED');
      }

      // 검증 에러
      if (res.status === 400) {
        const body = await res.json();
        throw new Error(body?.error || '잘못된 요청입니다');
      }

      // 네트워크 에러
      throw new Error('NETWORK_ERROR');
    }
  }

  const data = await res.json();
  if (data?.error) throw new Error(data.error);
  return data;
};
