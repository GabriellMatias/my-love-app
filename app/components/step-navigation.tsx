type StepNavigationProps = {
  onPrev?: () => void;
  onNext?: () => void;
  onRestart?: () => void;
  prevLabel?: string;
  nextLabel?: string;
  restartLabel?: string;
  hidePrev?: boolean;
  hideNext?: boolean;
  showRestart?: boolean;
};

export function StepNavigation({
  onPrev,
  onNext,
  onRestart,
  prevLabel = "Voltar",
  nextLabel = "Próximo",
  restartLabel = "Voltar ao início",
  hidePrev,
  hideNext,
  showRestart,
}: StepNavigationProps) {
  return (
    <div className="mt-8 flex flex-wrap items-center gap-3">
      {!hidePrev && (
        <button
          type="button"
          onClick={onPrev}
          className="btn-soft rounded-xl px-4 py-2 text-sm font-semibold"
        >
          ← {prevLabel}
        </button>
      )}

      {!hideNext && (
        <button
          type="button"
          onClick={onNext}
          className="btn-love rounded-xl px-4 py-2 text-sm font-semibold"
        >
          {nextLabel} →
        </button>
      )}

      {showRestart && (
        <button
          type="button"
          onClick={onRestart}
          className="btn-love pulse-love rounded-xl px-4 py-2 text-sm font-semibold"
        >
          🔁 {restartLabel}
        </button>
      )}
    </div>
  );
}
