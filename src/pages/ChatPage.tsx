import { useEffect, useMemo, useRef, useState } from "react";
import { aiService } from "@/services/ai.service";
import { AIThinkingLoader, AnimatedCard, AnimatedPage } from "@/components/animations";
import { Button, Input } from "@/components/ui/primitives";
import { Mic, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface Msg { role: "user" | "assistant"; text: string }

const prompts = ["Suggest a team for AI dashboard project", "Find available React engineers", "Show strongest ML engineers"];

const ChatPage = () => {
  const [messages, setMessages] = useState<Msg[]>([{ role: "assistant", text: "Ask me to suggest teams, find talent, or analyze risks." }]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({ top: ref.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = async (preset?: string) => {
    const prompt = (preset ?? input).trim();
    if (!prompt) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: prompt }]);
    setThinking(true);
    const reply = await aiService.chat(prompt);
    let idx = 0;
    setMessages((m) => [...m, { role: "assistant", text: "" }]);
    const id = window.setInterval(() => {
      idx += 1;
      setMessages((m) => {
        const copy = [...m];
        const last = copy[copy.length - 1];
        if (last && last.role === "assistant") last.text = reply.slice(0, idx);
        return copy;
      });
      if (idx >= reply.length) {
        clearInterval(id);
        setThinking(false);
      }
    }, 14);
  };

  const pulse = useMemo(() => ({ scale: [1, 1.08, 1] }), []);

  return (
    <AnimatedPage>
      <AnimatedCard className="relative overflow-hidden p-4">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,hsl(var(--primary)/0.16),transparent_60%)]" />
        <div className="relative">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-lg font-semibold">AI Chat Assistant</h2>
            <motion.div className="rounded-full border border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--primary)/0.12)] px-2 py-1 text-xs" animate={pulse} transition={{ duration: 2, repeat: Infinity }}><Sparkles className="mr-1 inline size-3" /> Neural Assistant</motion.div>
          </div>
          <div ref={ref} className="mt-3 h-[430px] space-y-2 overflow-auto rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3">
            {messages.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${m.role === "assistant" ? "bg-[hsl(var(--primary)/0.15)]" : "ml-auto bg-[hsl(var(--foreground))] text-[hsl(var(--background))]"}`}>
                {m.text || <span className="typing-dots">...</span>}
              </motion.div>
            ))}
            {thinking ? <AIThinkingLoader /> : null}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">{prompts.map((p) => <button key={p} onClick={() => send(p)} className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-3 py-1 text-xs text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--primary)/0.12)] hover:text-[hsl(var(--foreground))]">{p}</button>)}</div>
          <div className="mt-3 flex gap-2">
            <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder='Try: "Find available React engineers"' onKeyDown={(e) => { if (e.key === "Enter") send(); }} />
            <Button className="border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--foreground))] hover:bg-[hsl(var(--card-hover))]"><Mic size={16} /></Button>
            <Button onClick={() => send()}>Send</Button>
          </div>
        </div>
      </AnimatedCard>
    </AnimatedPage>
  );
};

export default ChatPage;
