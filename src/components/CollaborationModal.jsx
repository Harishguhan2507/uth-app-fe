import { useEffect, useState } from "react";
import { Button, Input } from "@/components/ui/primitives";

export const CollaborationModal = ({ open, onClose, recipient }) => {
  const [note, setNote] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!open) {
      setNote("");
      setSending(false);
      setSent(false);
    }
  }, [open]);

  if (!open) return null;

  const handleSend = async () => {
    if (!note.trim()) return;
    setSending(true);
    try {
      // Simulate API call
      await new Promise((r) => setTimeout(r, 700));
      setSent(true);
      // keep success visible briefly then close
      setTimeout(() => {
        setSent(false);
        onClose();
      }, 900);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/45 p-3 sm:items-center">
      <div className="max-w-lg w-full rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-[var(--shadow-floating)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[hsl(var(--muted-foreground))]">
              Request collaboration
            </p>
            <h2 className="mt-1 text-lg font-semibold">
              Send a note to {recipient}
            </h2>
            <p className="mt-1 text-sm text-[hsl(var(--muted-foreground))]">
              Include a short message to explain the request.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md border border-[hsl(var(--border))] px-3 py-1 text-sm"
          >
            Close
          </button>
        </div>

        <div className="mt-4">
          {sent ? (
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-emerald-700">
              <p className="font-semibold">Request sent</p>
              <p className="text-sm">{`Your note was sent to ${recipient}. They will be notified.`}</p>
            </div>
          ) : (
            <>
              <label className="text-sm font-medium">Message</label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                rows={4}
                className="mt-2 w-full rounded-xl border px-3 py-2 text-sm outline-none ring-0 transition border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))]"
                placeholder={`Hi ${recipient}, I'd like to collaborate on...`}
              />

              <div className="mt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg border border-[hsl(var(--border))] px-3 py-2 text-sm font-medium text-slate-700 hover:bg-[hsl(var(--muted))]"
                >
                  Cancel
                </button>
                <Button onClick={handleSend} disabled={sending || !note.trim()}>
                  {sending ? "Sending…" : "Send request"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollaborationModal;
