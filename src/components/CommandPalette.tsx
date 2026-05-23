import { Command } from "cmdk";
import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useEmployees } from "@/hooks/useEmployees";
import { AnimatePresence, motion } from "framer-motion";

const commands = [
  ["Dashboard", "/dashboard"],
  ["AI Talent Search", "/talent-search"],
  ["Team Builder", "/team-builder"],
  ["Employee Directory", "/directory"],
  ["AI Chat", "/chat"],
] as const;

export const CommandPalette = ({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) => {
  const navigate = useNavigate();
  const { data } = useEmployees();
  const people = useMemo(() => (data ?? []).slice(0, 6), [data]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-[60] grid place-items-start bg-black/45 p-4 pt-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => onOpenChange(false)}>
          <motion.div initial={{ y: -16, scale: 0.97, opacity: 0 }} animate={{ y: 0, scale: 1, opacity: 1 }} exit={{ y: -10, opacity: 0 }} transition={{ type: "spring", damping: 20, stiffness: 260 }} className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <Command className="w-full overflow-hidden rounded-2xl glass p-2">
              <Command.Input className="w-full border-none bg-transparent px-3 py-3 text-sm text-[hsl(var(--foreground))] outline-none" placeholder="Jump to pages, employees, actions..." />
              <Command.List className="max-h-[420px] overflow-auto">
                <Command.Empty className="p-3 text-sm text-[hsl(var(--muted-foreground))]">No results found.</Command.Empty>
                <Command.Group heading="Pages" className="px-2 text-xs text-[hsl(var(--muted-foreground))]">
                  {commands.map(([label, path]) => (
                    <Command.Item key={path} className="mt-1 cursor-pointer rounded-lg px-3 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary)/0.12)]" onSelect={() => { navigate(path); onOpenChange(false); }}>
                      {label}
                    </Command.Item>
                  ))}
                </Command.Group>
                <Command.Group heading="Employees" className="px-2 text-xs text-[hsl(var(--muted-foreground))]">
                  {people.map((person) => (
                    <Command.Item key={person.id} className="mt-1 cursor-pointer rounded-lg px-3 py-2 text-sm text-[hsl(var(--foreground))] hover:bg-[hsl(var(--primary)/0.12)]" onSelect={() => { navigate(`/employee/${person.id}`); onOpenChange(false); }}>
                      {person.name} - {person.skills[0]}
                    </Command.Item>
                  ))}
                </Command.Group>
              </Command.List>
            </Command>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};