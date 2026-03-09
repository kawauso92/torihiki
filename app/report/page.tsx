"use client";

import { useState } from "react";
import Header from "@/components/Header";

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  backgroundColor: "var(--surface2)",
  border: "1px solid var(--border)",
  borderRadius: "var(--radius-sm)",
  color: "var(--text)",
  fontFamily: "var(--font-rajdhani)",
  fontSize: "15px",
  outline: "none",
  colorScheme: "dark",
} as React.CSSProperties;

const labelStyle = {
  display: "block",
  fontSize: "9px",
  fontWeight: 700,
  letterSpacing: "0.12em",
  textTransform: "uppercase" as const,
  color: "var(--text2)",
  marginBottom: "6px",
};

function ResultCard({
  label,
  value,
  color,
  sub,
}: {
  label: string;
  value: string;
  color: string;
  sub?: string;
}) {
  return (
    <div
      style={{
        backgroundColor: "var(--surface)",
        borderRadius: "var(--radius)",
        border: "1px solid var(--border)",
        overflow: "hidden",
        flex: 1,
      }}
    >
      <div style={{ height: "2px", backgroundColor: color, boxShadow: `0 0 8px ${color}` }} />
      <div style={{ padding: "14px 12px" }}>
        <p style={labelStyle}>{label}</p>
        <p
          style={{
            fontFamily: "var(--font-jetbrains)",
            fontSize: "18px",
            fontWeight: 700,
            color,
          }}
        >
          {value}
        </p>
        {sub && (
          <p style={{ fontFamily: "var(--font-jetbrains)", fontSize: "11px", color: "var(--text3)", marginTop: "4px" }}>
            {sub}
          </p>
        )}
      </div>
    </div>
  );
}

export default function ReportPage() {
  const [startDate, setStartDate] = useState("2026-01-01");
  const [endDate, setEndDate] = useState("2026-03-31");
  const [searched, setSearched] = useState(false);

  // ダミーデータ
  const dummyResult = {
    depositTotal: 430000,
    profitLoss: 237320,
    profitPct: 18.99,
    depositCount: 4,
  };

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setSearched(true);
  }

  return (
    <div style={{ minHeight: "100dvh", backgroundColor: "var(--bg)" }}>
      <Header />

      <main style={{ padding: "16px" }}>
        <section
          style={{
            backgroundColor: "var(--surface)",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            overflow: "hidden",
            marginBottom: "20px",
          }}
        >
          <div style={{ height: "2px", backgroundColor: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }} />
          <div style={{ padding: "16px" }}>
            <h2
              style={{
                fontFamily: "var(--font-rajdhani)",
                fontSize: "14px",
                fontWeight: 700,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent)",
                marginBottom: "16px",
              }}
            >
              期間指定レポート
            </h2>
            <form onSubmit={handleSearch} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={labelStyle}>開始日</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <div>
                <label style={labelStyle}>終了日</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  style={inputStyle}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: "12px",
                  backgroundColor: "var(--accent)",
                  color: "#000",
                  border: "none",
                  borderRadius: "var(--radius-sm)",
                  fontFamily: "var(--font-rajdhani)",
                  fontSize: "15px",
                  fontWeight: 700,
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  cursor: "pointer",
                }}
              >
                集計する
              </button>
            </form>
          </div>
        </section>

        {searched && (
          <>
            <p
              style={{
                fontSize: "9px",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "var(--text2)",
                marginBottom: "12px",
              }}
            >
              集計結果：{startDate} 〜 {endDate}
            </p>

            <div style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
              <ResultCard
                label="期間内入金合計"
                value={`¥${dummyResult.depositTotal.toLocaleString()}`}
                color="var(--accent)"
                sub={`${dummyResult.depositCount}件`}
              />
              <ResultCard
                label="期間損益"
                value={`+¥${dummyResult.profitLoss.toLocaleString()}`}
                color="var(--green)"
                sub={`+${dummyResult.profitPct}%`}
              />
            </div>

            <div
              style={{
                backgroundColor: "var(--surface)",
                borderRadius: "var(--radius)",
                border: "1px solid var(--border)",
                padding: "16px",
              }}
            >
              <p style={labelStyle}>内訳</p>
              {[
                { dest: "GMOコイン", amount: 300000 },
                { dest: "MetaMask", amount: 80000 },
                { dest: "Phantom", amount: 50000 },
              ].map((item) => (
                <div
                  key={item.dest}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingTop: "10px",
                    paddingBottom: "10px",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <span style={{ fontSize: "14px", color: "var(--text2)" }}>{item.dest}</span>
                  <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "14px", color: "var(--text)" }}>
                    ¥{item.amount.toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {!searched && (
          <div
            style={{
              textAlign: "center",
              padding: "40px 20px",
              color: "var(--text3)",
              fontSize: "14px",
            }}
          >
            期間を選択して集計してください
          </div>
        )}
      </main>
    </div>
  );
}
