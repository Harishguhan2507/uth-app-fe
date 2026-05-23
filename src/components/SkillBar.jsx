function SkillBar({ label, value, colorClass = 'bg-indigo-500' }) {
  return (
    <div className="flex items-center gap-3">
      <span className="w-[52px] text-xs text-slate-600">{label}</span>
      <div className="h-2.5 flex-1 rounded-full bg-slate-100">
        <div className={`h-2.5 rounded-full ${colorClass}`} style={{ width: `${value}%` }} />
      </div>
      <span className="w-10 text-right text-xs font-medium text-slate-600">{value}%</span>
    </div>
  );
}

export default SkillBar;
