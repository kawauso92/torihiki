import Header from "@/components/Header";

const kpiCards = [
  {
    label: "総入金額",
    value: "¥1,250,000",
    sub: "累計入金",
    color: "var(--accent)",
  },
  {
    label: "現在価値",
    value: "¥1,487,320",
    sub: "評価額合計",
    color: "var(--accent)",
  },
  {
    label: "総損益",
    value: "+¥237,320",
    sub: "+18.99%",
    color: "var(--green)",
    positive: true,
  },
  {
    label: "GMOコイン",
    value: "¥623,450",
    sub: "残高",
    color: "var(--accent)",
  },
  {
    label: "MetaMask",
    value: "¥521,870",
    sub: "残高",
    color: "var(--accent)",
  },
  {
    label: "Phantom",
    value: "¥342,000",
    sub: "残高",
    color: "var(--accent)",
  },
];

export default function DashboardPage() {
  return (
    <div
      style={{
        minHeight: "100dvh",
        backgroundColor: "var(--bg)",
      }}
    >
      <Header />

      <main style={{ padding: "16px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          {kpiCards.map((card) => (
            <KpiCard key={card.label} {...card} />
          ))}
        </div>

        <div
          style={{
            marginTop: "24px",
            padding: "16px",
            backgroundColor: "var(--surface)",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
          }}
        >
          <p
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text2)",
              marginBottom: "8px",
            }}
          >
            最終更新
          </p>
          <p
            style={{
              fontFamily: "var(--font-jetbrains)",
              fontSize: "13px",
              color: "var(--text3)",
            }}
          >
            2026-03-09 12:34:56
          </p>
        </div>
      </main>
    </div>
  );
}

function KpiCard({
  label,
  value,
  sub,
  color,
  positive,
}: {
  label: string;
  value: string;
  sub: string;
  color: string;
  positive?: boolean;
}) {
  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        borderRadius: "var(--radius)",
        border: "1px solid var(--border)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* Top color line */}
      <div
        style={{
          height: "2px",
          backgroundColor: color,
          boxShadow: `0 0 8px ${color}`,
        }}
      />
      <div style={{ padding: "14px 12px" }}>
        <p
          style={{
            fontSize: "9px",
            fontWeight: 700,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text2)",
            marginBottom: "8px",
          }}
        >
          {label}
        </p>
        <p
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "17px",
            fontWeight: 700,
            color: positive ? "var(--green)" : "var(--text)",
            lineHeight: 1.2,
            wordBreak: "break-all",
          }}
        >
          {value}
        </p>
        <p
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "11px",
            color: positive ? "var(--green)" : "var(--text3)",
            marginTop: "4px",
          }}
        >
          {sub}
        </p>
      </div>
    </div>
  );
}
