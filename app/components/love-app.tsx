"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { stepMeta } from "../lib/love-content";
import type { StepId } from "../types/love";
import { StepNavigation } from "./step-navigation";
import { StepIntro } from "./steps/step-intro";
import { StepLetter } from "./steps/step-letter";
import { StepPhotosCarousel } from "./steps/step-photos-carousel";
import { StepTimeline } from "./steps/step-timeline";

const TOTAL_STEPS = 4;

export function LoveApp() {
  const [step, setStep] = React.useState<StepId>(0);

  const nextByStep: Record<StepId, StepId> = { 0: 1, 1: 2, 2: 3, 3: 3 };
  const prevByStep: Record<StepId, StepId> = { 0: 0, 1: 0, 2: 1, 3: 2 };

  const nextStep = () => setStep((prev) => nextByStep[prev]);
  const prevStep = () => setStep((prev) => prevByStep[prev]);
  const restart = () => setStep(0);

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-8 sm:px-6 sm:py-10">
      <header className="mb-6 fade-up">
        <p className="text-xs uppercase tracking-[0.2em] text-red-200/80">
          02/03/2026 • 1 mês juntos
        </p>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-zinc-100 sm:text-4xl">
          Nosso site, nossa história, nosso amor ❤️
        </h1>
      </header>

      <section className="glass-card mb-5 rounded-2xl p-4">
        <div className="mb-3 flex items-center justify-between text-xs text-zinc-300 sm:text-sm">
          <span>
            Step {step + 1} de {TOTAL_STEPS}
          </span>
          <span>{stepMeta[step].label}</span>
        </div>

        <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-red-700 to-red-400"
          />
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {stepMeta.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setStep(item.id)}
              className={`rounded-lg px-2 py-2 text-left text-xs transition sm:text-sm ${
                idx === step
                  ? "bg-red-500/20 text-red-100"
                  : "bg-white/5 text-zinc-300 hover:bg-white/10"
              }`}
            >
              {item.short}
            </button>
          ))}
        </div>
      </section>

      <AnimatePresence mode="wait">
        <motion.div key={step}>
          {step === 0 && <StepIntro />}
          {step === 1 && <StepTimeline />}
          {step === 2 && <StepPhotosCarousel />}
          {step === 3 && <StepLetter />}
        </motion.div>
      </AnimatePresence>

      <StepNavigation
        onPrev={prevStep}
        onNext={nextStep}
        onRestart={restart}
        hidePrev={step === 0}
        hideNext={step === 3}
        showRestart={step === 3}
        nextLabel={step === 2 ? "Ir para a carta" : "Próximo step"}
      />
    </main>
  );
}
