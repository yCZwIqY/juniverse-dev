import { ReactNode } from 'react';

interface DashboardSectionCardProps {
  title: string;
  children: ReactNode;
}

const DashboardSectionCard = ({ title, children }: DashboardSectionCardProps) => {
  return (
    <div className="glass-card p-6 flex flex-col gap-4">
      <div className="text-base font-semibold text-[var(--color-ink)]">{title}</div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
};

export default DashboardSectionCard;
