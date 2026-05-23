import { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { Link } from "react-router-dom";
import { useEmployees } from "@/hooks/useEmployees";
import { AnimatedCard, AnimatedPage } from "@/components/animations";
import { Skeleton } from "@/components/ui/primitives";

const DirectoryPage = () => {
  const { data, isLoading } = useEmployees();
  const parentRef = useRef<HTMLDivElement>(null);
  const rows = data ?? [];
  const virtualizer = useVirtualizer({ count: rows.length, getScrollElement: () => parentRef.current, estimateSize: () => 88, overscan: 8 });

  if (isLoading) return <Skeleton className="h-96" />;

  return (
    <AnimatedPage>
      <AnimatedCard className="p-4">
        <h2 className="mb-3 text-lg font-semibold">Employee Directory</h2>
        <div ref={parentRef} className="h-[580px] overflow-auto rounded-xl border border-[hsl(var(--border))] p-1">
          <div className="relative" style={{ height: `${virtualizer.getTotalSize()}px` }}>
            {virtualizer.getVirtualItems().map((item) => {
              const employee = rows[item.index];
              if (!employee) return null;
              return (
                <div key={employee.id} className="absolute left-0 top-0 w-full p-1" style={{ transform: `translateY(${item.start}px)` }}>
                  <Link to={`/employee/${employee.id}`} className="group flex items-center justify-between rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.75)] p-3 transition hover:-translate-y-0.5 hover:border-[hsl(var(--primary)/0.5)]">
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-[hsl(var(--muted-foreground))]">{employee.department} - {employee.role}</p>
                    </div>
                    <span className="text-sm text-[hsl(var(--muted-foreground))]">{employee.skills.slice(0, 2).join(" | ")}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </AnimatedCard>
    </AnimatedPage>
  );
};

export default DirectoryPage;