"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type InviteStage = {
  id: number;
  time: string;
  title: string;
  summary: string;
  details: string;
  emoji: string;
};

const ACCESS_PASSWORD = "02022026";
const WHATSAPP_CONFIRM_URL =
  "https://wa.me/5561993916872?text=Aceito%20seu%20convite%20hoje%20eu%20sou%20toda%20sua%20para%20voce%20fazer%20o%20que%20quiser%20comigo%20e%20onde%20quiser%20❤️";

const INVITE_HOUR = 18;
const INVITE_MINUTE = 0;

const stages: InviteStage[] = [
  {
    id: 1,
    time: "18:00",
    title: "Partida para a noite misteriosa",
    summary: "Vamos sair daqui rumo a um lugar especial, sem spoilers.",
    details:
      "No caminho, já começa nossa provocação: clima quente, carinho e aquele jogo de química que só a gente sabe fazer.",
    emoji: "🚗",
  },
  {
    id: 2,
    time: "19:00",
    title: "Jantar em local surpresa",
    summary: "Comida boa, bebida e conversa leve sobre tudo que importa.",
    details:
      "A ideia é aproveitar um ambiente bonito, brindar nosso momento e conversar sobre o que precisamos, sem peso e com conexão.",
    emoji: "🍷",
  },
  {
    id: 3,
    time: "20:30",
    title: "Pausa privada e divertida",
    summary: "Depois do jantar, pausa íntima para elevar a temperatura.",
    details:
      "No estacionamento, vamos curtir nosso lado mais atrevido, com liberdade, presença e muita vontade.",
    emoji: "🔥",
  },
  {
    id: 4,
    time: "21:30",
    title: "Segundo local misterioso",
    summary:
      "No segundo encontro misterioso, o clima pede silêncio e presença.",
    details:
      "Aqui, a regra é falar pouco e sentir muito: bastante beijo, toque, olho no olho e companhia intensa.",
    emoji: "🤫",
  },
  {
    id: 5,
    time: "22:30",
    title: "Última parada da noite",
    summary: "Última parada para fechar a noite do jeito certo.",
    details:
      "Finalizamos tudo com intensidade e sintonia, e só depois voltamos para casa com memória boa na pele.",
    emoji: "🌙",
  },
  {
    id: 6,
    time: "23:30",
    title: "Confirmar presença",
    summary: "Último passo: me confirma agora para fecharmos a noite.",
    details:
      "Toque no botão de confirmar para me enviar no WhatsApp a frase: Aceito seu convite.",
    emoji: "✅",
  },
];

export function SecretInvite() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");
  const [activeStageId, setActiveStageId] = useState<number>(1);
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());

    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const inviteStart = useMemo(() => {
    const date = new Date();
    date.setHours(INVITE_HOUR, INVITE_MINUTE, 0, 0);
    return date;
  }, []);

  const timelineTimes = useMemo(() => {
    return stages.map((stage) => {
      const [hours, minutes] = stage.time.split(":").map(Number);
      const date = new Date(inviteStart);
      date.setHours(hours, minutes, 0, 0);
      return date;
    });
  }, [inviteStart]);

  const timelineStart = timelineTimes[0].getTime();
  const timelineEnd =
    timelineTimes[timelineTimes.length - 1].getTime() + 60 * 60 * 1000;

  const progressByClock = useMemo(() => {
    if (!now) return 0;

    const nowMs = now.getTime();
    if (nowMs <= timelineStart) return 0;
    if (nowMs >= timelineEnd) return 100;

    const value =
      ((nowMs - timelineStart) / (timelineEnd - timelineStart)) * 100;
    return Number(value.toFixed(1));
  }, [now, timelineEnd, timelineStart]);

  const countdownText = useMemo(() => {
    if (!now) return "Calculando horário...";

    const diff = inviteStart.getTime() - now.getTime();
    if (diff <= 0) return "A noite já começou 💃";

    const totalSeconds = Math.floor(diff / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const hh = String(hours).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");

    return `${hh}:${mm}:${ss} para as 18:00`;
  }, [inviteStart, now]);

  const activeStage = useMemo(
    () => stages.find((stage) => stage.id === activeStageId) ?? stages[0],
    [activeStageId]
  );

  const stageProgress = useMemo(() => {
    return Number(((activeStageId / stages.length) * 100).toFixed(0));
  }, [activeStageId]);

  const handleUnlock = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === ACCESS_PASSWORD) {
      setIsUnlocked(true);
      setError("");
      return;
    }

    setError("Senha incorreta. Tenta de novo, amor ❤️");
  };

  if (!isUnlocked) {
    return (
      <main className="mx-auto flex min-h-dvh w-full max-w-4xl items-center px-4 py-8 sm:px-6 sm:py-10">
        <section className="glass-card w-full rounded-3xl p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.2em] text-red-200/80">
            Acesso privado
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-100 sm:text-4xl">
            Convite Secreto de Hoje
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300 sm:text-base">
            Digite a senha para desbloquear o convite misterioso de hoje, às
            18:00.
          </p>

          <form onSubmit={handleUnlock} className="mt-6 space-y-3">
            <label
              htmlFor="password"
              className="text-sm font-semibold text-zinc-200"
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-zinc-900/80 px-4 py-3 text-zinc-100 outline-none transition focus:border-red-300/40"
              placeholder="Digite a senha..."
              autoComplete="off"
            />

            {error ? <p className="text-sm text-red-300">{error}</p> : null}

            <button
              type="submit"
              className="btn-love rounded-xl px-5 py-2.5 text-sm font-semibold"
            >
              Desbloquear convite 💌
            </button>
          </form>

          <Link
            href="/"
            className="mt-6 inline-block text-sm text-zinc-300 underline underline-offset-4"
          >
            Voltar para a página principal
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-dvh w-full max-w-5xl flex-col px-4 py-8 sm:px-6 sm:py-10">
      <header className="glass-card rounded-3xl p-6 sm:p-8">
        <p className="text-xs uppercase tracking-[0.2em] text-red-200/80">
          Convite desbloqueado • Hoje 18:00
        </p>
        <h1 className="mt-2 text-3xl font-black tracking-tight text-zinc-100 sm:text-4xl">
          Noite Misteriosa com Você ✨
        </h1>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-zinc-300 sm:text-base">
          O resto é surpresa, clima e nós dois curtindo cada etapa.
        </p>

        <div className="mt-4 rounded-2xl border border-red-300/35 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          <p className="font-semibold uppercase tracking-[0.12em] text-red-200">
            Dress Code Oficial
          </p>
          <p className="mt-1">
            Hoje você vem de vestido longo, elegante e fácil de tirar, para
            facilitar nossas aventuras da noite.
          </p>
        </div>

        <div className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          Você só precisa chegar linda e pronta para viver uma noite especial ao
          meu lado ❤️
        </div>

        <section className="mt-4 space-y-3 rounded-2xl border border-white/10 bg-black/20 p-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              Contagem Regressiva
            </p>
            <p className="text-sm font-semibold text-red-200">
              {countdownText}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              Progresso da Noite
            </p>
            <p className="text-sm font-semibold text-zinc-200">
              {progressByClock}%
            </p>
          </div>

          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{ width: `${progressByClock}%` }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-red-800 via-red-500 to-red-300"
            />
          </div>

          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400">
              Rota Misteriosa
            </p>
            <p className="text-sm font-semibold text-zinc-200">
              Etapa atual: {stageProgress}%
            </p>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <motion.div
              animate={{ width: `${stageProgress}%` }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-red-700 to-red-400"
            />
          </div>
        </section>
      </header>

      <section className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_1.3fr]">
        <div className="glass-card rounded-2xl p-4 sm:p-5">
          <h2 className="text-lg font-bold text-zinc-100">Mapa das paradas</h2>
          <p className="mt-1 text-sm text-zinc-300">
            Escolha uma parada no mapa para revelar os detalhes.
          </p>

          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="flex flex-wrap items-center gap-2">
              {stages.map((stage, idx) => {
                const isActive = stage.id === activeStageId;
                return (
                  <div key={`map-${stage.id}`} className="flex items-center">
                    <button
                      type="button"
                      onClick={() => setActiveStageId(stage.id)}
                      className={`inline-flex h-9 w-9 items-center justify-center rounded-full border text-sm transition ${
                        isActive
                          ? "border-red-300/60 bg-red-500/25"
                          : "border-white/15 bg-zinc-900/60 hover:bg-white/10"
                      }`}
                      aria-label={`Selecionar etapa ${stage.id}`}
                    >
                      {stage.emoji}
                    </button>
                    {idx < stages.length - 1 ? (
                      <span className="mx-1 h-[2px] w-5 bg-gradient-to-r from-red-500/70 to-white/20" />
                    ) : null}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 space-y-2">
            {stages.map((stage) => {
              const isActive = stage.id === activeStageId;
              return (
                <button
                  key={stage.id}
                  type="button"
                  onClick={() => setActiveStageId(stage.id)}
                  className={`w-full rounded-xl border px-3 py-3 text-left transition ${
                    isActive
                      ? "border-red-400/40 bg-red-500/15"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-red-200">
                    {stage.time}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-zinc-100">
                    {stage.emoji} {stage.title}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <motion.div
          key={activeStage.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
          className="glass-card rounded-2xl p-5 sm:p-6"
        >
          <p className="text-xs uppercase tracking-[0.18em] text-red-200/80">
            Etapa {activeStage.id} • {activeStage.time}
          </p>
          <h3 className="mt-2 text-2xl font-bold text-zinc-100">
            {activeStage.emoji} {activeStage.title}
          </h3>
          <p className="mt-3 text-base text-zinc-200">{activeStage.summary}</p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            {activeStage.details}
          </p>

          {activeStage.id === 6 ? (
            <Link
              href={WHATSAPP_CONFIRM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-love mt-5 inline-flex rounded-xl px-4 py-2 text-sm font-semibold"
            >
              Confirmar presença no WhatsApp 💬
            </Link>
          ) : null}

          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-zinc-200">
            Dica: deixe esse convite salvo e vamos seguindo etapa por etapa
            juntos hoje 😉
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              type="button"
              className="btn-soft rounded-xl px-4 py-2 text-sm"
              onClick={() =>
                setActiveStageId((prev) =>
                  prev === 1 ? stages.length : prev - 1
                )
              }
            >
              ← Etapa anterior
            </button>
            <button
              type="button"
              className="btn-love rounded-xl px-4 py-2 text-sm"
              onClick={() =>
                setActiveStageId((prev) =>
                  prev === stages.length ? 1 : prev + 1
                )
              }
            >
              Próxima etapa →
            </button>
            <Link href="/" className="btn-soft rounded-xl px-4 py-2 text-sm">
              Voltar para o início
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
