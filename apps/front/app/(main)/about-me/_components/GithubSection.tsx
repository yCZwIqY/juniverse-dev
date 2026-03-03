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
  if (!token) {
    return null;
  }

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
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables: { login: GITHUB_LOGIN } }),
    next: { revalidate: 600 },
  });

  if (!res.ok) {
    return null;
  }

  const data = (await res.json()) as {
    data?: {
      user?: {
        contributionsCollection?: {
          contributionCalendar?: ContributionCalendar;
        };
      };
    };
  };

  return data.data?.user?.contributionsCollection?.contributionCalendar ?? null;
};

// const formatDate = (value: string) =>
//   new Date(value).toLocaleDateString('ko-KR', {
//     year: 'numeric',
//     month: 'short',
//     day: 'numeric',
//   });

const GithubSection = async () => {
  const calendar = await fetchContributionCalendar();

  return (
    <section className={'glass-card w-full p-4 lg:p-8 flex flex-col gap-6 reveal'}>
      <div className={'flex flex-col gap-2'}>
        <div className={'text-xl font-bold'}>GitHub</div>
      </div>

      <div className={'w-full'}>
        <div className={'rounded-xl border border-border p-4 bg-background/40 flex flex-col gap-4'}>
          <div className={'flex items-center justify-between gap-2'}>
            <div className={'text-base font-bold'}>Contribution</div>
            <div className={'text-xs text-muted-foreground'}>{calendar ? `총 ${calendar.totalContributions}회` : '불러오는 중'}</div>
          </div>

          <div className={'overflow-x-auto'}>
            {calendar ? (
              <div className={'flex gap-1 min-w-[680px]'}>
                {calendar.weeks.map((week, index) => (
                  <div key={`${week.contributionDays[0]?.date ?? index}`} className={'flex flex-col gap-1 flex-1'}>
                    {week.contributionDays.map((day) => (
                      <div
                        key={day.date}
                        title={`${day.date} · ${day.contributionCount}회`}
                        className={'aspect-square rounded-sm border border-border'}
                        style={{ backgroundColor: day.color }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ) : (
              <div className={'text-sm text-muted-foreground'}>GITHUB_TOKEN이 없거나 권한이 부족합니다.</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubSection;
