import * as cheerio from 'cheerio';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { url } = await req.json();

  // console.log(url, typeof url)
  const res = await fetch(url);
  const html = await res.text();

  const $ = cheerio.load(html); // HTML 파싱해서 $로 돔 접근 가능하게 만들어줌

  // og:title 있으면 사용하고, 없으면 title 태그, 둘 다 없으면 '' (빈 문자열)
  const title =
    $('meta[property="og:title"]').attr('content') || $('title').text() || '';
  const image =
    $('meta[property="og:image"]').attr('content') ||
    $('img').first().attr('src') ||
    '';
  const description = $('meta[name="description"]').attr('content') || '';

  return NextResponse.json({ title, image, description });
}
