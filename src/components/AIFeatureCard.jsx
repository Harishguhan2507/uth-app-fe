function AIFeatureCard({ title, rating, description, tags, demo }) {
  return (
    <article className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-[var(--shadow-soft)]">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-[hsl(var(--foreground))]">{title}</h3>
        <span className="text-sm font-medium text-amber-500">{rating}</span>
      </div>
      <p className="text-sm text-[hsl(var(--muted-foreground))]">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full bg-[hsl(var(--primary)/0.1)] px-3 py-1 text-xs font-medium text-[hsl(var(--primary))]">
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--muted))] p-3 text-sm text-[hsl(var(--foreground))]">
        <span className="font-semibold">Demo moment:</span> {demo}
      </p>
    </article>
  );
}

export default AIFeatureCard;
