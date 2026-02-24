'use client';

import { useMemo, useState } from 'react';
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
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
    return source.items.map((item) => ({
      date: item.date,
      visitors: item.uniqueVisitors,
    }));
  }, [week, month, year, range]);

  const formatDate = (value: string) => {
    if (range === 'year') {
      return value.endsWith('-01') ? value.slice(5, 7) : '';
    }
    return value.slice(5);
  };

  return (
    <section className="glass-card p-6 md:p-8 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-lg font-semibold">방문자 추이</div>
          <div className="text-sm text-gray-400">주/월/연 방문자 추이</div>
        </div>
        <div className="flex gap-2">
          {(['week', 'month', 'year'] as TrafficRange[]).map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setRange(key)}
              className={`px-3 py-1.5 rounded-full text-sm border ${
                range === key
                  ? 'border-emerald-400/70 bg-emerald-400/10 text-emerald-100'
                  : 'border-white/10 text-gray-400 hover:text-gray-200'
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
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              interval="preserveStartEnd"
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
            />
            <YAxis
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 12 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                background: 'rgba(15, 23, 42, 0.92)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 8,
                color: '#e2e8f0',
              }}
              labelFormatter={(label) => `날짜: ${label}`}
              formatter={(value: number) => [`${value}명`, '방문자']}
            />
            <Line type="monotone" dataKey="visitors" stroke="#34d399" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default TrafficChart;
