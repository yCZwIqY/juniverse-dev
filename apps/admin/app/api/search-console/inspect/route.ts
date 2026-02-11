import { NextResponse } from 'next/server';
import { JWT } from 'google-auth-library';

export async function POST(req: Request) {
  const { url } = await req.json();

  if (!url) {
    return NextResponse.json({ error: 'url is required' }, { status: 400 });
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
        inspectionUrl: url,
        siteUrl: process.env.FRONT_URL,
      }),
    },
  );

  const data = await res.json();

  return NextResponse.json({
    success: true,
    requestUrl: url,
    result: data,
  });
}