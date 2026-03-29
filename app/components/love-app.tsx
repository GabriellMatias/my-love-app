"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
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
  const [showInviteAlert, setShowInviteAlert] = React.useState(true);

  const nextByStep: Record<StepId, StepId> = { 0: 1, 1: 2, 2: 3, 3: 3 };
  const prevByStep: Record<StepId, StepId> = { 0: 0, 1: 0, 2: 1, 3: 2 };

  const nextStep = () => setStep((prev) => nextByStep[prev]);
  const prevStep = () => setStep((prev) => prevByStep[prev]);
  const restart = () => setStep(0);

  const progress = ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-8 sm:px-6 sm:py-10">
      {showInviteAlert ? (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass-card w-full max-w-md rounded-3xl p-6 shadow-2xl shadow-black/40"
          >
            <p className="text-xs uppercase tracking-[0.18em] text-red-200/80">
              Alerta Especial
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-zinc-100">
              💌 Convite Misterioso Liberado
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Prepare-se para uma noite especial hoje às 18:00. Toque no botão
              para abrir o convite privado.
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/convite"
                className="inline-flex items-center gap-2 rounded-xl border border-red-300/40 bg-gradient-to-r from-red-700 via-red-600 to-red-500 px-4 py-2.5 text-sm font-black tracking-wide text-white"
              >
                Abrir Convite ✨
              </Link>
              <button
                type="button"
                onClick={() => setShowInviteAlert(false)}
                className="btn-soft rounded-xl px-4 py-2.5 text-sm font-semibold"
              >
                Fechar
              </button>
            </div>
          </motion.div>
        </div>
      ) : null}

      <header className="mb-6 fade-up">
        <p className="text-xs uppercase tracking-[0.2em] text-red-200/80">
          02/03/2026 • 1 mês juntos
        </p>
        <h1 className="mt-2 text-2xl font-black tracking-tight text-zinc-100 sm:text-4xl">
          Nosso site, nossa história, nosso amor ❤️
        </h1>
        <div className="mt-5">
          <Link
            href="/convite"
            className="inline-flex items-center gap-2 rounded-2xl border border-red-300/40 bg-gradient-to-r from-red-700 via-red-600 to-red-500 px-5 py-3 text-sm font-black tracking-wide text-white shadow-lg shadow-red-900/40 transition hover:-translate-y-0.5"
          >
            <span className="inline-flex h-2.5 w-2.5 animate-pulse rounded-full bg-white" />
            CONVITE MISTERIOSO DE HOJE
            <span>✨</span>
          </Link>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-red-200/80">
            Acesso privado • 18:00
          </p>
        </div>
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
