"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Header from "@/components/Header";

const dummyData = [
  { date: "1/01", value: 820000 },
  { date: "1/15", value: 900000 },
  { date: "2/01", value: 980000 },
  { date: "2/15", value: 1050000 },
  { date: "3/01", value: 1200000 },
  { date: "3/09", value: 1487320 },
];

function formatYen(v: number) {
  if (v >= 1000000) return `${(v / 1000000).toFixed(1)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(0)}K`;
  return `${v}`;
}

export default function ChartPage() {
  const latest = dummyData[dummyData.length - 1].value;
  const first = dummyData[0].value;
  const gain = latest - first;
  const gainPct = ((gain / first) * 100).toFixed(2);

  return (
    <div style={{ minHeight: "100dvh", backgroundColor: "var(--bg)" }}>
      <Header />

      <main style={{ padding: "16px" }}>
        {/* Summary row */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
          <div
            style={{
              flex: 1,
              backgroundColor: "var(--surface)",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <div style={{ height: "2px", backgroundColor: "var(--accent)", boxShadow: "0 0 8px var(--accent)" }} />
            <div style={{ padding: "14px 12px" }}>
              <p
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text2)",
                  marginBottom: "6px",
                }}
              >
                現在価値
              </p>
              <p style={{ fontFamily: "var(--font-jetbrains)", fontSize: "18px", fontWeight: 700, color: "var(--text)" }}>
                ¥{latest.toLocaleString()}
              </p>
            </div>
          </div>
          <div
            style={{
              flex: 1,
              backgroundColor: "var(--surface)",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
              overflow: "hidden",
            }}
          >
            <div style={{ height: "2px", backgroundColor: "var(--green)", boxShadow: "0 0 8px var(--green)" }} />
            <div style={{ padding: "14px 12px" }}>
              <p
                style={{
                  fontSize: "9px",
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text2)",
                  marginBottom: "6px",
                }}
              >
                累計損益
              </p>
              <p style={{ fontFamily: "var(--font-jetbrains)", fontSize: "18px", fontWeight: 700, color: "var(--green)" }}>
                +{gainPct}%
              </p>
            </div>
          </div>
        </div>

        {/* Chart */}
        <div
          style={{
            backgroundColor: "var(--surface)",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            overflow: "hidden",
            padding: "16px 8px 16px 0",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-rajdhani)",
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--text3)",
              paddingLeft: "16px",
              marginBottom: "16px",
            }}
          >
            資産推移（ダミーデータ）
          </p>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={dummyData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="accentGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e2d3d" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fill: "#607080", fontSize: 11, fontFamily: "JetBrains Mono" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={formatYen}
                tick={{ fill: "#607080", fontSize: 10, fontFamily: "JetBrains Mono" }}
                axisLine={false}
                tickLine={false}
                width={48}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#141b24",
                  border: "1px solid #1e2d3d",
                  borderRadius: "8px",
                  fontFamily: "JetBrains Mono",
                  fontSize: "12px",
                  color: "#e2e8f0",
                }}
                formatter={(value) => [`¥${Number(value).toLocaleString()}`, "評価額"]}
                labelStyle={{ color: "#8899aa" }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#00d4ff"
                strokeWidth={2}
                fill="url(#accentGrad)"
                dot={{ fill: "#00d4ff", r: 3, strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#00d4ff" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Data points */}
        <div style={{ marginTop: "16px" }}>
          <p
            style={{
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--text2)",
              marginBottom: "10px",
            }}
          >
            データポイント
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            {[...dummyData].reverse().map((d) => (
              <div
                key={d.date}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "10px 14px",
                  backgroundColor: "var(--surface)",
                  borderRadius: "var(--radius-sm)",
                  border: "1px solid var(--border)",
                }}
              >
                <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "12px", color: "var(--text3)" }}>
                  2026/{d.date}
                </span>
                <span style={{ fontFamily: "var(--font-jetbrains)", fontSize: "14px", color: "var(--text)" }}>
                  ¥{d.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
