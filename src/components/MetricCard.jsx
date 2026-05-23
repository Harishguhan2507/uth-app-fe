function MetricCard({ title, value, changeText, icon: Icon, iconClass }) {
  return (
    <article className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-[var(--shadow-soft)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[hsl(var(--muted-foreground))]">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-[hsl(var(--foreground))]">{value}</p>
          <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{changeText}</p>
        </div>
        <div className={`rounded-lg p-2 ${iconClass}`}>
          <Icon size={18} />
        </div>
      </div>
    </article>
  );
}

export default MetricCard;
