import { CreateLinkInput } from "@/types/link.types";

export const createLink = async (linkData: CreateLinkInput) => {
  try {
    const res = await fetch('/api/links', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ links: linkData }),
    });

    if (!res.ok) throw new Error('Link Shot 저장 요청 실패');

    const data = await res.json();
    // console.log('저장 결과:', data);
  } catch (err) {
    console.error('Link Shot 저장 실패:', err);
  }
};
