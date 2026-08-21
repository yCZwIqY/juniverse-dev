export async function revalidateFront(tags: string[]): Promise<void> {
  const frontUrl = process.env.FRONT_URL;
  const token = process.env.REVALIDATION_TOKEN;
  if (!frontUrl || !token) return;

  try {
    await fetch(`${frontUrl}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-revalidate-token': token,
      },
      body: JSON.stringify({ tags }),
      cache: 'no-store',
    });
  } catch {
    // non-blocking — front 다운 시에도 admin 뮤테이션 실패하지 않음
  }
}
