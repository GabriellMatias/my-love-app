import { loveAlerts } from "../../lib/love-content";
import { LoveAlerts } from "../love-alerts";
import { StepShell } from "../step-shell";

export function StepIntro() {
  return (
    <StepShell
      badge="Step 1 • Nosso primeiro mês 💖"
      title="Parabéns pra gente por 1 mês de namoro"
      description="Você é muito importante pra mim. Obrigado por ser minha parceira, por me apoiar, por me fazer rir e por construir comigo uma relação leve, madura e cheia de amor."
    >
      <div className="space-y-4">
        <div className="rounded-2xl border border-red-400/20 bg-red-500/10 p-4 text-zinc-100">
          <p className="text-base leading-relaxed sm:text-lg">
            Eu te amo muito, e escolher você foi a melhor decisão que eu já
            tomei. ❤️
          </p>
        </div>

        <LoveAlerts alerts={loveAlerts} />
      </div>
    </StepShell>
  );
}
