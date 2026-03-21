export default function ServiceBadges({
  items,
  className = "",
}: {
  items: string[];
  className?: string;
}) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <span
          key={item}
          className="rounded-full border border-primary/18 bg-primary/8 px-3 py-1 text-xs font-medium text-secondary"
        >
          {item}
        </span>
      ))}
    </div>
  );
}
