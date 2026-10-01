import { NextRequest, NextResponse } from 'next/server';
import { FileRefType } from 'apis';
import { uploadFile } from 'apis/files';

const ALLOWED_REF_TYPES = new Set<FileRefType>(['post', 'user', 'comment', 'project']);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get('file');
  const refType = req.nextUrl.searchParams.get('refType');
  const refId = req.nextUrl.searchParams.get('refId');
  const displayName = req.nextUrl.searchParams.get('displayName') ?? undefined;

  if (!(file instanceof File) || !refType || !ALLOWED_REF_TYPES.has(refType as FileRefType) || !refId) {
    return NextResponse.json({ success: false, message: 'file, refType, refId are required' }, { status: 400 });
  }

  const result = await uploadFile(file, refType as FileRefType, Number(refId), displayName);
  return NextResponse.json(result);
}
