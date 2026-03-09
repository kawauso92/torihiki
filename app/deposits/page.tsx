"use client";

import { useState } from "react";
import Header from "@/components/Header";

type Deposit = {
  id: number;
  date: string;
  amount: number;
  destination: string;
  note: string;
};

const dummyDeposits: Deposit[] = [
  { id: 1, date: "2026-03-01", amount: 100000, destination: "GMOコイン", note: "毎月積立" },
  { id: 2, date: "2026-02-15", amount: 50000, destination: "MetaMask", note: "ETH購入資金" },
  { id: 3, date: "2026-02-01", amount: 80000, destination: "Phantom", note: "SOL購入" },
  { id: 4, date: "2026-01-20", amount: 200000, destination: "GMOコイン", note: "" },
];

const destinations = ["GMOコイン", "MetaMask", "Phantom"];

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

export default function DepositsPage() {
  const [deposits, setDeposits] = useState<Deposit[]>(dummyDeposits);
  const [form, setForm] = useState({
    date: new Date().toISOString().slice(0, 10),
    amount: "",
    destination: "GMOコイン",
    note: "",
  });
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.amount) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/deposits", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          date: form.date,
          amount: parseFloat(form.amount),
          destination: form.destination,
          note: form.note,
        }),
      });
      if (res.ok) {
        const newDeposit = await res.json();
        setDeposits([newDeposit, ...deposits]);
        setForm({ date: new Date().toISOString().slice(0, 10), amount: "", destination: "GMOコイン", note: "" });
      }
    } catch {
      // フォールバック：ローカルに追加
      const newDeposit: Deposit = {
        id: Date.now(),
        date: form.date,
        amount: parseFloat(form.amount),
        destination: form.destination,
        note: form.note,
      };
      setDeposits([newDeposit, ...deposits]);
      setForm({ date: new Date().toISOString().slice(0, 10), amount: "", destination: "GMOコイン", note: "" });
    }
    setSubmitting(false);
  }

  const total = deposits.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div style={{ minHeight: "100dvh", backgroundColor: "var(--bg)" }}>
      <Header />

      <main style={{ padding: "16px" }}>
        {/* Form */}
        <section
          style={{
            backgroundColor: "var(--surface)",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            overflow: "hidden",
            marginBottom: "20px",
          }}
        >
          <div
            style={{
              height: "2px",
              backgroundColor: "var(--accent)",
              boxShadow: "0 0 8px var(--accent)",
            }}
          />
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
              入金を記録
            </h2>
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label style={labelStyle}>日付</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  style={{ ...inputStyle, colorScheme: "dark" }}
                  required
                />
              </div>
              <div>
                <label style={labelStyle}>金額（円）</label>
                <input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  placeholder="100000"
                  style={{ ...inputStyle, fontFamily: "var(--font-jetbrains)" }}
                  required
                  min="1"
                />
              </div>
              <div>
                <label style={labelStyle}>入金先</label>
                <select
                  value={form.destination}
                  onChange={(e) => setForm({ ...form, destination: e.target.value })}
                  style={inputStyle}
                >
                  {destinations.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>メモ（任意）</label>
                <input
                  type="text"
                  value={form.note}
                  onChange={(e) => setForm({ ...form, note: e.target.value })}
                  placeholder="メモを入力..."
                  style={inputStyle}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
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
                  cursor: submitting ? "not-allowed" : "pointer",
                  opacity: submitting ? 0.7 : 1,
                }}
              >
                {submitting ? "記録中..." : "入金を記録する"}
              </button>
            </form>
          </div>
        </section>

        {/* Summary */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "12px",
          }}
        >
          <span style={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text2)" }}>
            入金履歴
          </span>
          <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "13px", color: "var(--accent)" }}>
            合計 ¥{total.toLocaleString()}
          </span>
        </div>

        {/* Table */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          {deposits.map((d) => (
            <div
              key={d.id}
              style={{
                backgroundColor: "var(--surface)",
                borderRadius: "var(--radius-sm)",
                border: "1px solid var(--border)",
                padding: "12px 14px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <p style={{ fontFamily: "var(--font-jetbrains)", fontSize: "11px", color: "var(--text3)", marginBottom: "4px" }}>
                  {d.date}
                </p>
                <p style={{ fontSize: "14px", fontWeight: 600, color: "var(--text)", marginBottom: "2px" }}>
                  {d.destination}
                </p>
                {d.note && (
                  <p style={{ fontSize: "11px", color: "var(--text3)" }}>{d.note}</p>
                )}
              </div>
              <p style={{ fontFamily: "var(--font-jetbrains)", fontSize: "15px", fontWeight: 700, color: "var(--green)" }}>
                +¥{d.amount.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
