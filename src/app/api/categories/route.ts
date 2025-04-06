import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: '로그인된 사용자가 없습니다.' }, { status: 401 });
  }

  try {
    // 사용자의 모든 링크에서 유니크한 카테고리만 추출
    const { data: categories, error } = await supabase
      .from('links')
      .select('category')
      .eq('user_id', user.id)
      .not('category', 'is', null);
    
    if (error) {
      console.error('카테고리 데이터 가져오기 오류:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // 중복 제거된 카테고리 목록 생성
    const uniqueCategories = Array.from(
      new Set(
        categories
          .map(item => item.category)
          .filter(category => Boolean(category))
      )
    );

    // '전체' 카테고리를 맨 앞에 추가
    return NextResponse.json({
      categories: ['전체', ...uniqueCategories]
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};