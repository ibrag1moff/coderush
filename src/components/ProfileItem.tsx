export const ProfileItem = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-neutral-500">
        {label}
      </p>
      <p className="mt-1 text-sm text-neutral-200 break-all">{value}</p>
    </div>
  );
};
