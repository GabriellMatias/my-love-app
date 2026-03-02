import { relationshipTimeline } from "../../lib/love-content";
import { StepShell } from "../step-shell";

export function StepTimeline() {
  return (
    <StepShell
      badge="Step 2 • Nossa cronologia 🗓️"
      title="Da primeira conversa até o nosso futuro"
      description="Cada momento com você fortaleceu minha certeza: estamos construindo algo raro, bonito e verdadeiro."
    >
      <ol className="relative ml-2 border-s border-white/15 pl-5">
        {relationshipTimeline.map((event) => (
          <li key={`${event.date}-${event.title}`} className="mb-6 last:mb-0">
            <span className="absolute -start-[10px] mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-red-300/40 bg-red-500/20 text-xs">
              {event.emoji}
            </span>
            <time className="text-xs font-semibold uppercase tracking-wider text-red-200">
              {event.date}
            </time>
            <h3 className="mt-1 text-base font-semibold text-zinc-100 sm:text-lg">
              {event.title}
            </h3>
            <p className="mt-1 text-sm leading-relaxed text-zinc-300">
              {event.description}
            </p>
          </li>
        ))}
      </ol>
    </StepShell>
  );
}
