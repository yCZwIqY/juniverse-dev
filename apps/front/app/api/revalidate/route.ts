import { revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const token = req.headers.get('x-revalidate-token');
  if (!token || token !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let tags: unknown;
  try {
    ({ tags } = await req.json());
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  if (!Array.isArray(tags) || tags.length === 0) {
    return NextResponse.json({ error: 'tags must be a non-empty array' }, { status: 400 });
  }

  (tags as string[]).forEach((tag) => revalidateTag(tag));
  return NextResponse.json({ ok: true, tags });
}
