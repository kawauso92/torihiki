export default function Header() {
  return (
    <header
      style={{
        backgroundColor: "var(--surface)",
        borderBottom: "1px solid var(--border)",
        padding: "16px",
        display: "flex",
        alignItems: "center",
        gap: "12px",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          width: "3px",
          height: "28px",
          backgroundColor: "var(--accent)",
          boxShadow: "0 0 10px var(--accent)",
          borderRadius: "2px",
          flexShrink: 0,
        }}
      />
      <div>
        <h1
          style={{
            fontFamily: "var(--font-rajdhani)",
            fontSize: "20px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--accent)",
            lineHeight: 1.1,
          }}
        >
          CRYPTO DASHBOARD
        </h1>
        <p
          style={{
            fontSize: "10px",
            color: "var(--text3)",
            letterSpacing: "0.08em",
            marginTop: "2px",
          }}
        >
          暗号資産管理
        </p>
      </div>
    </header>
  );
}
