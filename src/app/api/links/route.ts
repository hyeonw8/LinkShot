import { createClient } from '@/lib/supabase/server';
import { NextResponse, NextRequest } from 'next/server';

export async function POST(req: Request) {
  const supabase = await createClient();
  const { links } = await req.json();

  const { data, error } = await supabase.from('links').insert(links);

  if (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export const GET = async (request: NextRequest) => {
  const supabase = await createClient();

  const { searchParams } = request.nextUrl;
  // const search = searchParams.get('search');
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '8');
  const sort = searchParams.get('sort') || 'newest'; // 정렬 옵션: newest, oldest
  const category = searchParams.get('category') || 'all'; // 카테고리 필터 옵션
  const pinned = searchParams.get('pinned');

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('로그인된 사용자가 없습니다.');
  }

  try {
    // 기본 쿼리 설정
    let query = supabase
      .from('links')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id);

    // pinned 값에 따라 isPin 필터링
    if (pinned) {
      // pinned가 true일 때는 isPin이 true인 것만 가져옴
      query = query.eq('isPin', true);
    } else {
      // pinned가 false일 때는 isPin이 false인 것만 가져옴
      query = query.eq('isPin', false);
    }

    // 카테고리 필터링 적용
    if (category && category !== 'all') {
      query = query.eq('category', category);
    }

    // 정렬 적용
    if (sort === 'newest') {
      query = query.order('created_at', { ascending: false });
    } else if (sort === 'oldest') {
      query = query.order('created_at', { ascending: true });
    }

    // 페이지네이션 적용
    query = query.range((page - 1) * limit, page * limit - 1);

    // 쿼리 실행
    const { data: links, error, count } = await query;

    if (error) {
      console.error('링크 데이터 가져오기 오류:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      links: links || [],
      sort,
      category,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil((count || 0) / limit),
      },
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};

export const DELETE = async (request: NextRequest) => {
  const supabase = await createClient();
  const id = await request.json();

  try {
    const { data, error } = await supabase.from('links').delete().eq('id', id);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err }, { status: 500 });
  }
};

export const PATCH = async (request: NextRequest) => {
  const supabase = await createClient();
  const { id, isPin } = await request.json();
  // console.log(id, isPin);

  try {
    const { data, error } = await supabase
      .from('links')
      .update({ isPin: !isPin })
      .eq('id', id);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err }, { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  const supabase = await createClient();
  const { id, links } = await request.json();

  try {
    const { data, error } = await supabase
      .from('links')
      .update(links)
      .eq('id', id);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ err }, { status: 500 });
  }
};
