import { ReactNode } from 'react';

interface DashboardSectionCardProps {
  title: string;
  children: ReactNode;
}

const DashboardSectionCard = ({ title, children }: DashboardSectionCardProps) => {
  return (
    <div className="glass-card p-6 md:p-8 flex flex-col gap-4">
      <div className="text-lg font-semibold">{title}</div>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
};

export default DashboardSectionCard;
