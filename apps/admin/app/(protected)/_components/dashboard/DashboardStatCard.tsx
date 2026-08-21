interface DashboardStatCardProps {
  label: string;
  value: string;
  description?: string;
}

const DashboardStatCard = ({ label, value, description }: DashboardStatCardProps) => {
  return (
    <div className="glass-card p-5 flex flex-col gap-2">
      <div className="text-xs font-medium text-[var(--muted-foreground)] uppercase tracking-wider">{label}</div>
      <div className="text-2xl font-bold text-[var(--color-ink)]">{value}</div>
      {description ? <div className="text-xs text-[var(--muted-foreground)]">{description}</div> : null}
    </div>
  );
};

export default DashboardStatCard;
