import { formatDistanceToNow } from "date-fns";
import { notifications } from "@/mock/data";
import { AnimatedCard, AnimatedPage, FadeIn, StaggerContainer } from "@/components/animations";

const NotificationsPage = () => (
  <AnimatedPage>
    <StaggerContainer className="space-y-3">
      {notifications.map((n) => (
        <FadeIn key={n.id}>
          <AnimatedCard className="p-4">
            <div className="flex items-center justify-between"><h3 className="font-medium">{n.title}</h3><span className="text-xs uppercase text-[hsl(var(--primary))]">{n.level}</span></div>
            <p className="text-sm text-[hsl(var(--muted-foreground))]">{n.message}</p>
            <p className="mt-1 text-xs text-[hsl(var(--muted-foreground))]">{formatDistanceToNow(new Date(n.date), { addSuffix: true })}</p>
          </AnimatedCard>
        </FadeIn>
      ))}
    </StaggerContainer>
  </AnimatedPage>
);

export default NotificationsPage;