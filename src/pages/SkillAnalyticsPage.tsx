import { useEmployees } from "@/hooks/useEmployees";
import { useChartTheme } from "@/hooks/useChartTheme";
import { AnimatedCard, AnimatedPage } from "@/components/animations";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

const SkillAnalyticsPage = () => {
  const { byDepartment } = useEmployees();
  const chart = useChartTheme();
  const colors = [chart.primary, chart.secondary, chart.accent, chart.success, "hsl(var(--destructive))", "hsl(var(--muted-foreground))"];

  return (
    <AnimatedPage>
      <AnimatedCard className="h-[520px] p-4">
        <h2 className="text-lg font-semibold">Organization Skill Heatmap</h2>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie data={byDepartment} dataKey="total" nameKey="department" outerRadius={160}>
              {byDepartment.map((_, i) => <Cell key={i} fill={colors[i % colors.length] ?? chart.primary} />)}
            </Pie>
            <Tooltip contentStyle={{ background: chart.tooltipBg, border: `1px solid ${chart.tooltipBorder}`, borderRadius: "12px" }} />
          </PieChart>
        </ResponsiveContainer>
      </AnimatedCard>
    </AnimatedPage>
  );
};

export default SkillAnalyticsPage;