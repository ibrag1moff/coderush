interface StatItemProps {
  label: string;
  value: string;
}

export const StatItem = ({ label, value }: StatItemProps) => {
  return (
    <div className="rounded-lg bg-neutral-800 p-4 text-center">
      <p className="text-2xl font-semibold text-indigo-400">{value}</p>
      <p className="mt-1 text-xs uppercase text-neutral-400">{label}</p>
    </div>
  );
};
