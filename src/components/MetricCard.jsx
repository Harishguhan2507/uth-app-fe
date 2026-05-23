function MetricCard({ title, value, changeText, icon: Icon, iconClass }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slate-500">{title}</p>
          <p className="mt-2 text-3xl font-semibold text-slate-900">{value}</p>
          <p className="mt-1 text-xs text-slate-500">{changeText}</p>
        </div>
        <div className={`rounded-lg p-2 ${iconClass}`}>
          <Icon size={18} />
        </div>
      </div>
    </article>
  );
}

export default MetricCard;
