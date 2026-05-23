function AIInsightBox({ text }) {
  return (
    <div className="rounded-xl border border-[hsl(var(--primary)/0.3)] bg-[hsl(var(--primary)/0.08)] p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-[hsl(var(--primary))]">AI insight</p>
      <p className="mt-1 text-sm text-[hsl(var(--foreground))]">{text}</p>
    </div>
  );
}

export default AIInsightBox;
