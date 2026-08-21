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

const fetchContributionCalendar = async (): Promise<ContributionCalendar | null> => {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return null;

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
    next: { revalidate: 600 },
  });

  if (!res.ok) return null;

  const data = (await res.json()) as {
    data?: { user?: { contributionsCollection?: { contributionCalendar?: ContributionCalendar } } };
  };

  return data.data?.user?.contributionsCollection?.contributionCalendar ?? null;
};

const GithubSection = async () => {
  const calendar = await fetchContributionCalendar();

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
            GITHUB_TOKEN이 없거나 권한이 부족합니다.
          </p>
        )}
      </div>
    </section>
  );
};

export default GithubSection;
