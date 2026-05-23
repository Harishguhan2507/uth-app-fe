function AIInsightBox({ text }) {
  return (
    <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-indigo-700">AI insight</p>
      <p className="mt-1 text-sm text-indigo-900">{text}</p>
    </div>
  );
}

export default AIInsightBox;
