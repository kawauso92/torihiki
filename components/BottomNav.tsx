"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/", label: "ダッシュボード", icon: "⬛" },
  { href: "/deposits", label: "入金", icon: "＋" },
  { href: "/report", label: "レポート", icon: "📋" },
  { href: "/chart", label: "グラフ", icon: "📈" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: "430px",
        backgroundColor: "var(--surface)",
        borderTop: "1px solid var(--border)",
        display: "flex",
        zIndex: 100,
      }}
    >
      {tabs.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              paddingTop: "4px",
              paddingBottom: "12px",
              gap: "4px",
              textDecoration: "none",
              position: "relative",
              color: active ? "var(--accent)" : "var(--text3)",
              transition: "color 0.2s",
            }}
          >
            {active && (
              <span
                style={{
                  position: "absolute",
                  top: 0,
                  left: "10%",
                  right: "10%",
                  height: "2px",
                  backgroundColor: "var(--accent)",
                  boxShadow: "0 0 8px var(--accent)",
                  borderRadius: "0 0 2px 2px",
                }}
              />
            )}
            <span style={{ fontSize: "18px", lineHeight: 1 }}>{tab.icon}</span>
            <span
              style={{
                fontSize: "10px",
                fontFamily: "var(--font-rajdhani)",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {tab.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
