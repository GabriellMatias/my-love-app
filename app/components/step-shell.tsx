import { motion } from "framer-motion";

type StepShellProps = {
  badge: string;
  title: string;
  description: string;
  children: React.ReactNode;
};

export function StepShell({
  badge,
  title,
  description,
  children,
}: StepShellProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      className="glass-card fade-up w-full rounded-3xl p-5 shadow-2xl shadow-black/20 sm:p-7"
    >
      <span className="mb-4 inline-flex rounded-full border border-red-400/30 bg-red-500/10 px-3 py-1 text-xs font-semibold text-red-200">
        {badge}
      </span>
      <h1 className="text-2xl font-bold tracking-tight text-zinc-50 sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-300 sm:text-base">
        {description}
      </p>
      <div className="mt-6">{children}</div>
    </motion.section>
  );
}
