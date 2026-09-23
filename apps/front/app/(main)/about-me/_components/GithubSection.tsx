import { unstable_cache } from 'next/cache';
import { connection } from 'next/server';

const GITHUB_LOGIN = 'yCZwIqY';
const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

type ContributionDay = {
  date: string;
  contributionCount: number;
  color: string;
};

type ContributionCalendar = {
  totalContributions: number;
  weeks: Array<{
    contributionDays: ContributionDay[];
  }>;
};

const fetchContributionCalendar = async (): Promise<ContributionCalendar> => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('[github-contributions] Missing server token');

  const query = `
    query($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ query, variables: { login: GITHUB_LOGIN } }),
    // Cache validated calendar data below, not HTTP 200 GraphQL error responses.
    cache: 'no-store',
    signal: AbortSignal.timeout(8000),
  });

  if (!res.ok) {
    throw new Error(`[github-contributions] HTTP ${res.status}; remaining=${res.headers.get('x-ratelimit-remaining')}; reset=${res.headers.get('x-ratelimit-reset')}`);
  }

  const data = (await res.json()) as {
    errors?: unknown[];
    data?: { user?: { contributionsCollection?: { contributionCalendar?: ContributionCalendar } } };
  };

  if (data?.errors?.length) {
    throw new Error(`[github-contributions] GraphQL error; remaining=${res.headers.get('x-ratelimit-remaining')}; reset=${res.headers.get('x-ratelimit-reset')}`);
  }

  const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;
  if (
    !calendar ||
    !Number.isInteger(calendar.totalContributions) ||
    calendar.totalContributions < 0 ||
    !Array.isArray(calendar.weeks) ||
    calendar.weeks.length === 0 ||
    !calendar.weeks.every((week) =>
      Array.isArray(week?.contributionDays) &&
      week.contributionDays.length > 0 &&
      week.contributionDays.every((day) =>
        day && typeof day.date === 'string' &&
        Number.isInteger(day.contributionCount) && day.contributionCount >= 0 &&
        typeof day.color === 'string',
      ),
    )
  ) {
    throw new Error('[github-contributions] Invalid calendar response');
  }

  return calendar;
};

// A failed refresh throws, allowing Next.js to retain the last successful calendar.
const getCachedContributionCalendar = unstable_cache(
  fetchContributionCalendar,
  ['github-contributions', GITHUB_LOGIN],
  { revalidate: 600 },
);

const GithubSection = async () => {
  // The token is available at runtime, not during the Docker image build.
  // Avoid prerendering and caching a missing-token fallback into the page.
  await connection();

  let calendar: ContributionCalendar | null = null;
  try {
    calendar = await getCachedContributionCalendar();
  } catch (error) {
    // Do not log request headers, tokens, or the upstream response body.
    console.error('[github-contributions] Calendar unavailable',
      error instanceof Error ? error.message : 'Unknown error');
  }

  return (
    <section className="flex flex-col gap-5 reveal">
      <div>
        <div className="eyebrow mb-1">Activity</div>
        <h2 className="text-xl font-bold text-[var(--color-ink)]">GitHub Contributions</h2>
        {calendar && (
          <p className="text-sm text-[var(--muted-foreground)] mt-0.5">
            최근 1년 · 총 {calendar.totalContributions}회
          </p>
        )}
      </div>

      <div className="border border-[var(--color-hairline)] rounded-[var(--radius-sm)] p-4 overflow-x-auto">
        {calendar ? (
          <div
            role="img"
            aria-label={`GitHub 기여 현황, 최근 1년 총 ${calendar.totalContributions}회`}
            className="flex gap-[3px] min-w-[680px]"
          >
            {calendar.weeks.map((week, index) => (
              <div
                key={week.contributionDays[0]?.date ?? index}
                className="flex flex-col gap-[3px] flex-1"
              >
                {week.contributionDays.map((day) => (
                  <div
                    key={day.date}
                    title={`${day.date} · ${day.contributionCount}회`}
                    className="aspect-square rounded-sm"
                    style={{ backgroundColor: day.color }}
                  />
                ))}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-[var(--muted-foreground)]">
            기여 내역을 잠시 불러오지 못했습니다.{' '}
            <a className="underline underline-offset-4" href={`https://github.com/${GITHUB_LOGIN}`} target="_blank" rel="noreferrer">
              GitHub에서 확인하기 ↗
            </a>
          </p>
        )}
      </div>
    </section>
  );
};

export default GithubSection;
