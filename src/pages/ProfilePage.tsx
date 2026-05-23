import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { useEmployees } from "@/hooks/useEmployees";
import { Card } from "@/components/ui/primitives";

const ProfilePage = () => {
  const { id } = useParams();
  const { data } = useEmployees();
  const employee = useMemo(() => data?.find((e) => e.id === id), [data, id]);

  if (!employee) return <Card className="p-4">Employee not found.</Card>;

  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <Card className="p-4 lg:col-span-2">
        <h2 className="text-xl font-semibold">{employee.name}</h2>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">{employee.department} - {employee.role}</p>
        <p className="mt-3">Experience: {employee.experience} years</p>
        <p>Collaboration score: {employee.collaborationScore}</p>
        <p>AI match score: {employee.aiMatchScore}</p>
        <p className="mt-3">Career suggestion: Upskill in MLOps + Prompt Engineering.</p>
      </Card>
      <Card className="p-4">
        <h3 className="font-medium">Skills</h3>
        <p className="mt-2 text-sm">{employee.skills.join(", ")}</p>
        <h3 className="mt-4 font-medium">Certifications</h3>
        <p className="mt-2 text-sm">{employee.certifications.join(", ")}</p>
        <h3 className="mt-4 font-medium">Project History</h3>
        <p className="mt-2 text-sm">{employee.projects.join(", ")}</p>
      </Card>
    </div>
  );
};

export default ProfilePage;
