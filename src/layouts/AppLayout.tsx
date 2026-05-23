import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Bell, Command, Menu, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Input } from "@/components/ui/primitives";
import { CommandPalette } from "@/components/CommandPalette";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AppSidebar, sidebarNavItems } from "@/components/sidebar/AppSidebar";
import { SidebarHeader } from "@/components/sidebar/SidebarHeader";
import { SidebarItem } from "@/components/sidebar/SidebarItem";
import { SidebarFooter } from "@/components/sidebar/SidebarFooter";
import { useAuthStore } from "@/store/auth.store";

export const AppLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const logout = useAuthStore((s) => s.logout);
  const session = useAuthStore((s) => s.session);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [sidebarCompact, setSidebarCompact] = useState(() => localStorage.getItem("uth_sidebar_compact") === "1");

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((s) => !s);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    localStorage.setItem("uth_sidebar_compact", sidebarCompact ? "1" : "0");
  }, [sidebarCompact]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))]">
      <CommandPalette open={open} onOpenChange={setOpen} />

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div className="fixed inset-0 z-50 bg-black/30 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)}>
            <motion.aside initial={{ x: -300 }} animate={{ x: 0 }} exit={{ x: -300 }} transition={{ type: "spring", stiffness: 260, damping: 28 }} className="h-full w-[280px] border-r border-[hsl(var(--border))] bg-[hsl(var(--card))] p-3 shadow-[var(--shadow-floating)]" onClick={(e) => e.stopPropagation()}>
              <SidebarHeader compact={false} session={session} />
              <div className="space-y-1.5">
                {sidebarNavItems.map((item) => (
                  <div key={item.to} onClick={() => setMobileOpen(false)}>
                    <SidebarItem item={item} compact={false} />
                  </div>
                ))}
              </div>
              <SidebarFooter compact={false} onLogout={handleLogout} />
            </motion.aside>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="mx-auto flex max-w-[1560px] gap-4 p-3">
        <AppSidebar compact={sidebarCompact} onToggleCompact={() => setSidebarCompact((s) => !s)} session={session} onLogout={handleLogout} />

        <main className="min-w-0 flex-1">
          <header className="mb-4 flex items-center gap-3 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card)/0.78)] px-4 py-3 shadow-[var(--shadow-soft)] backdrop-blur">
            <button className="rounded-lg border border-[hsl(var(--border))] p-2 md:hidden" onClick={() => setMobileOpen(true)}>{mobileOpen ? <X size={16} /> : <Menu size={16} />}</button>
            <div className="hidden md:block">
              <p className="text-[28px] font-semibold leading-7">AI Talent Matching</p>
              <p className="text-[10px] tracking-[0.35em] text-[hsl(var(--muted-foreground))]">WORKSPACE</p>
            </div>
            <div className="relative mx-auto w-full max-w-[560px]">
              <Search className="absolute left-3 top-2.5 size-4 text-[hsl(var(--muted-foreground))]" />
              <Input className="pl-9" placeholder="Search employees, projects, skills..." />
            </div>
            <button className="hidden items-center gap-1 rounded-lg border border-[hsl(var(--border))] px-2 py-1 text-xs text-[hsl(var(--muted-foreground))] sm:flex" onClick={() => setOpen(true)}><Command size={12} />K</button>
            <button className="rounded-lg border border-[hsl(var(--border))] p-2"><Bell size={16} /></button>
            <ThemeToggle />
          </header>

          <AnimatePresence mode="wait">
            <motion.div key={location.pathname} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.22 }}>
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
