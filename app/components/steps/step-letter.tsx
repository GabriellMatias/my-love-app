"use client";

import { useState } from "react";
import { defaultLetter } from "../../lib/love-content";
import { downloadLetterPdf } from "../../lib/pdf";
import { StepShell } from "../step-shell";

export function StepLetter() {
  const [letter, setLetter] = useState(defaultLetter);

  return (
    <StepShell
      badge="Step 4 • Minha carta pra você ✍️"
      title="A última página, feita com todo o meu amor"
      description="Aqui você pode escrever, ajustar o texto e baixar em PDF para guardar esse momento especial."
    >
      <div className="space-y-4">
        <textarea
          value={letter}
          onChange={(event) => setLetter(event.target.value)}
          rows={12}
          className="w-full rounded-2xl border border-white/10 bg-zinc-900/80 p-4 text-sm leading-relaxed text-zinc-100 outline-none transition focus:border-red-300/40"
        />

        <button
          type="button"
          onClick={() =>
            downloadLetterPdf({ title: "Carta para o meu amor", letter })
          }
          className="btn-love rounded-xl px-4 py-2 text-sm font-semibold"
        >
          📄 Baixar texto em PDF
        </button>
      </div>
    </StepShell>
  );
}
