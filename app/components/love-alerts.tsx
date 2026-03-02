type LoveAlertsProps = {
  alerts: string[];
};

export function LoveAlerts({ alerts }: LoveAlertsProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {alerts.map((alert) => (
        <div
          key={alert}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-200"
        >
          💌 {alert}
        </div>
      ))}
    </div>
  );
}
