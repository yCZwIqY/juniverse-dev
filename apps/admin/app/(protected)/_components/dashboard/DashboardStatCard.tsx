interface DashboardStatCardProps {
  label: string;
  value: string;
  description?: string;
}

const DashboardStatCard = ({ label, value, description }: DashboardStatCardProps) => {
  return (
    <div className="glass-card p-5 flex flex-col gap-2">
      <div className="text-sm text-gray-400">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
      {description ? <div className="text-xs text-gray-500">{description}</div> : null}
    </div>
  );
};

export default DashboardStatCard;
