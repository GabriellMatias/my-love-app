"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { photoPlaceholders } from "../../lib/love-content";
import { StepShell } from "../step-shell";

export function StepPhotosCarousel() {
  const [index, setIndex] = useState(0);
  const total = photoPlaceholders.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % total);
    }, 4000);

    return () => clearInterval(interval);
  }, [total]);

  const current = useMemo(() => photoPlaceholders[index], [index]);

  const goPrev = () => setIndex((prev) => (prev === 0 ? total - 1 : prev - 1));
  const goNext = () => setIndex((prev) => (prev + 1) % total);

  return (
    <StepShell
      badge="Step 3 • Nossas fotos 📸"
      title="Nossos momentos juntos"
      description="Carreguei as fotos da pasta public/images e o título de cada slide foi montado com base no nome do arquivo."
    >
      <div className="space-y-4">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70">
          {current.src ? (
            <div className="relative h-72 w-full sm:h-96">
              <Image
                src={current.src}
                alt={current.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex h-72 w-full items-center justify-center bg-gradient-to-br from-zinc-800 via-zinc-900 to-red-950/40 sm:h-96">
              <div className="text-center">
                <p className="text-5xl">🖼️</p>
                <p className="mt-2 text-sm text-zinc-300">
                  Placeholder da foto {current.id}
                </p>
              </div>
            </div>
          )}

          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h3 className="text-base font-semibold text-zinc-100 sm:text-lg">
              {current.title}
            </h3>
            <p className="text-sm text-zinc-300">{current.note}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            className="btn-soft rounded-xl px-4 py-2 text-sm"
            onClick={goPrev}
          >
            ← Anterior
          </button>

          <div className="flex items-center gap-2">
            {photoPlaceholders.map((item, dotIndex) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setIndex(dotIndex)}
                className={`h-2.5 w-2.5 rounded-full transition-all ${
                  dotIndex === index ? "bg-red-400" : "bg-white/25"
                }`}
                aria-label={`Ir para foto ${item.id}`}
              />
            ))}
          </div>

          <button
            type="button"
            className="btn-love rounded-xl px-4 py-2 text-sm"
            onClick={goNext}
          >
            Próxima →
          </button>
        </div>
      </div>
    </StepShell>
  );
}
