import { NextResponse } from 'next/server';
import { JWT } from 'google-auth-library';

export async function POST(req: Request) {
  const { path } = await req.json();

  if (!path) {
    return NextResponse.json({ error: 'path is required' }, { status: 400 });
  }

  const auth = new JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });

  const accessToken = await auth.authorize();

  const res = await fetch(
    'https://searchconsole.googleapis.com/v1/urlInspection/index:inspect',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken.access_token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inspectionUrl: `${process.env.FRONT_URL}${path}`,
        siteUrl: process.env.FRONT_URL!.replace('https://', 'sc-domain:'),
      }),
    },
  );

  const data = await res.json().catch(() => null);

  return NextResponse.json(
    {
      success: res.ok,
      status: res.status,
      requestUrl: `${process.env.FRONT_URL}${path}`,
      result: data,
      error: res.ok ? undefined : data,
    },
    { status: res.ok ? 200 : res.status },
  );
}
