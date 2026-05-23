import { useEmployees } from "@/hooks/useEmployees";
import { Card } from "@/components/ui/primitives";

const InsightsPage = () => {
  const { data } = useEmployees();
  const spotlight = data?.find((e) => e.department === "Operations" && e.certifications.some((c) => c.includes("Python")));

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card className="p-4">
        <h2 className="text-lg font-semibold">Hidden Talent Spotlight</h2>
        <p className="mt-2 text-sm">{spotlight ? `${spotlight.name} from Operations recently completed Python certification.` : "No spotlight entries."}</p>
      </Card>
      <Card className="p-4">
        <h2 className="text-lg font-semibold">Skill Gap Detector</h2>
        <ul className="mt-2 list-disc pl-5 text-sm">
          <li>Missing skills: MLOps, Kubernetes</li>
          <li>Upskilling: Internal MLOps bootcamp</li>
          <li>Certifications: AWS ML Specialty</li>
          <li>Hiring recommendation: 1 Senior Data Engineer</li>
        </ul>
      </Card>
    </div>
  );
};

export default InsightsPage;