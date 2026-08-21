'use client';

import { useMemo, useState } from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { DashboardTrafficResponse } from 'apis';

type TrafficRange = 'week' | 'month' | 'year';

interface TrafficChartProps {
  week?: DashboardTrafficResponse;
  month?: DashboardTrafficResponse;
  year?: DashboardTrafficResponse;
}

const RANGE_LABELS: Record<TrafficRange, string> = {
  week: '주간',
  month: '월간',
  year: '연간',
};

const TrafficChart = ({ week, month, year }: TrafficChartProps) => {
  const [range, setRange] = useState<TrafficRange>('week');

  const dataset = useMemo(() => {
    const source = range === 'week' ? week : range === 'month' ? month : year;
    if (!source?.items?.length) return [];
    return source.items.map((item) => ({ date: item.date, visitors: item.uniqueVisitors }));
  }, [week, month, year, range]);

  const formatDate = (value: string) => {
    if (range === 'year') return value.endsWith('-01') ? value.slice(5, 7) : '';
    return value.slice(5);
  };

  return (
    <section className="glass-card p-6 flex flex-col gap-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <div className="text-base font-semibold text-[var(--color-ink)]">방문자 추이</div>
          <div className="text-xs text-[var(--muted-foreground)]">주/월/연 방문자 추이</div>
        </div>
        <div className="flex gap-1.5">
          {(['week', 'month', 'year'] as TrafficRange[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setRange(key)}
              className={`px-3 py-1 rounded-[var(--radius-pill)] text-xs font-medium border transition-colors ${
                range === key
                  ? 'border-[var(--color-primary)] bg-[var(--color-primary)] text-[var(--color-on-primary)]'
                  : 'border-[var(--color-hairline)] text-[var(--muted-foreground)] hover:border-[var(--color-ink)]'
              }`}
            >
              {RANGE_LABELS[key]}
            </button>
          ))}
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataset}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-hairline)" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              interval="preserveStartEnd"
              tick={{ fill: 'oklch(0.5 0 0)', fontSize: 11 }}
              axisLine={{ stroke: 'var(--color-hairline)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'oklch(0.5 0 0)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                background: 'var(--color-canvas)',
                border: '1px solid var(--color-hairline)',
                borderRadius: 8,
                color: 'var(--color-ink)',
                boxShadow: 'none',
              }}
              labelFormatter={(label) => `날짜: ${label}`}
              formatter={(value: number) => [`${value}명`, '방문자']}
            />
            <Line type="monotone" dataKey="visitors" stroke="var(--color-ink)" strokeWidth={1.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default TrafficChart;
