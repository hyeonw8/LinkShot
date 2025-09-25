import { CreateLinkInput } from '@/types/link.types';

export const createLink = async (linkData: CreateLinkInput) => {
  const res = await fetch('/api/links', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ links: linkData }),
  });

  if (!res.ok) {
    let message = 'Link Shot 저장 요청 실패';
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
