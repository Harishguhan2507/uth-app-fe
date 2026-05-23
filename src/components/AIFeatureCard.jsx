function AIFeatureCard({ title, rating, description, tags, demo }) {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
        <span className="text-sm font-medium text-amber-500">{rating}</span>
      </div>
      <p className="text-sm text-slate-600">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            {tag}
          </span>
        ))}
      </div>
      <p className="mt-4 rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
        <span className="font-semibold">Demo moment:</span> {demo}
      </p>
    </article>
  );
}

export default AIFeatureCard;
