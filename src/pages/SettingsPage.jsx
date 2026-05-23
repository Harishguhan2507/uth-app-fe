function SettingsPage() {
  return (
    <div className="rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-[var(--shadow-soft)]">
      <h2 className="text-lg font-semibold text-[hsl(var(--foreground))]">Settings</h2>
      <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Notification, profile and platform settings can be configured here.</p>
    </div>
  );
}

export default SettingsPage;
