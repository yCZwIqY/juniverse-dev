export const runtime = 'nodejs';

const SSE_HEADERS = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache, no-transform',
  Connection: 'keep-alive',
  'X-Accel-Buffering': 'no',
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const path = searchParams.get('path');
  const apiUrl =
    process.env.API_URL ?? process.env.NEXT_API_URL ?? process.env.NEXT_PUBLIC_API_URL;

  if (!path) {
    return Response.json({ error: 'path query is required' }, { status: 400 });
  }

  if (!apiUrl) {
    return Response.json({ error: 'API_URL is not configured' }, { status: 500 });
  }

  const upstreamUrl = new URL(path, apiUrl);
  const authorization = req.headers.get('authorization');
  const cookie = req.headers.get('cookie');

  const upstreamRes = await fetch(upstreamUrl, {
    method: 'GET',
    headers: {
      Accept: 'text/event-stream',
      ...(authorization ? { Authorization: authorization } : {}),
      ...(cookie ? { Cookie: cookie } : {}),
    },
    cache: 'no-store',
    signal: req.signal,
  });

  if (!upstreamRes.ok || !upstreamRes.body) {
    const message = await upstreamRes.text().catch(() => 'Failed to connect to upstream SSE');
    return Response.json(
      { error: 'SSE proxy error', status: upstreamRes.status, message },
      { status: upstreamRes.status || 502 },
    );
  }

  return new Response(upstreamRes.body, {
    status: upstreamRes.status,
    headers: SSE_HEADERS,
  });
}
