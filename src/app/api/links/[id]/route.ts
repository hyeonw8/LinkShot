import { createClient } from '@/lib/supabase/server';
import { NextResponse, NextRequest } from 'next/server';

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const supabase = await createClient();

  const { id } = await params;

  try {
    const { data: links = [], error } = await supabase
      .from('links')
      .select('*')
      .eq('id', id)
      .single();

    return NextResponse.json({ links });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};

export const PUT = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const supabase = await createClient();

  const { id } = await params;
  const { links } = await request.json();

  try {
    const { data: updateLinks = [], error } = await supabase
      .from('links')
      .update(links)
      .eq('id', id);

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ updateLinks });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error }, { status: 500 });
  }
};
