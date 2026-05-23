import { useMemo, useState } from "react";
import { useEmployees } from "@/hooks/useEmployees";
import { aiService } from "@/services/ai.service";
import { AIThinkingLoader, AnimatedCard, AnimatedPage, AnimatedCounter, FadeIn, StaggerContainer } from "@/components/animations";
import { Button, Input } from "@/components/ui/primitives";
import { motion } from "framer-motion";

const TeamBuilderPage = () => {
  const { data } = useEmployees();
  const [project, setProject] = useState("AI dashboard project");
  const [selected, setSelected] = useState<string[]>([]);
  const [result, setResult] = useState<Awaited<ReturnType<typeof aiService.teamRecommendation>> | null>(null);
  const [loading, setLoading] = useState(false);

  const selectedEmployees = useMemo(() => (data ?? []).filter((e) => selected.includes(e.id)), [data, selected]);

  const generate = async () => {
    setLoading(true);
    setResult(await aiService.teamRecommendation(project, selected));
    setLoading(false);
  };

  return (
    <AnimatedPage className="space-y-4">
      <AnimatedCard className="p-4">
        <h2 className="text-lg font-semibold">AI Team Builder</h2>
        <div className="mt-3 flex gap-2">
          <Input value={project} onChange={(e) => setProject(e.target.value)} />
          <Button onClick={generate}>Generate Team</Button>
        </div>
        <StaggerContainer className="mt-3 grid max-h-72 gap-2 overflow-auto sm:grid-cols-2 lg:grid-cols-3">
          {data?.slice(0, 18).map((e) => {
            const active = selected.includes(e.id);
            return (
              <FadeIn key={e.id}>
                <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={() => setSelected((prev) => active ? prev.filter((id) => id !== e.id) : [...prev, e.id])} className={`text-left rounded-lg border p-2 transition ${active ? "border-[hsl(var(--primary))] bg-[hsl(var(--primary)/0.12)]" : "border-[hsl(var(--border))] bg-[hsl(var(--card)/0.65)]"}`}>
                  <span className="text-sm">{e.name}</span>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{e.skills[0]} | {e.skills[1]}</p>
                </motion.button>
              </FadeIn>
            );
          })}
        </StaggerContainer>
      </AnimatedCard>

      {loading ? <AIThinkingLoader /> : null}

      {result ? (
        <AnimatedCard className="p-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Chemistry Score</p>
              <p className="text-2xl font-semibold"><AnimatedCounter value={result.chemistryScore} suffix="%" /></p>
              <div className="mt-2 h-2 rounded-full bg-[hsl(var(--muted))]"><motion.div className="h-full rounded-full bg-[hsl(var(--primary))]" initial={{ width: 0 }} animate={{ width: `${result.chemistryScore}%` }} /></div>
            </div>
            <div>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">Project Success Prediction</p>
              <p className="text-2xl font-semibold"><AnimatedCounter value={result.projectSuccess} suffix="%" /></p>
              <div className="mt-2 h-2 rounded-full bg-[hsl(var(--muted))]"><motion.div className="h-full rounded-full bg-[hsl(var(--success))]" initial={{ width: 0 }} animate={{ width: `${result.projectSuccess}%` }} /></div>
            </div>
          </div>
          <p className="mt-3">{result.balance}</p>
          <p className="text-amber-400">{result.risks.join(" | ")}</p>
          <p className="text-[hsl(var(--muted-foreground))]">Missing skills: {result.missingSkills.join(", ") || "None"}</p>
          <p className="text-[hsl(var(--primary))]">{result.why}</p>
          <p className="mt-2 text-sm text-[hsl(var(--muted-foreground))]">Selected team size: {selectedEmployees.length}</p>
        </AnimatedCard>
      ) : null}
    </AnimatedPage>
  );
};

export default TeamBuilderPage;