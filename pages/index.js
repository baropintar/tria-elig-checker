import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // 💎 TIER DIAMOND SYSTEM
  const getTier = (rank) => {
    if (rank <= 10) return { name: "Diamond", color: "linear-gradient(90deg, #4facfe, #00f2fe)" };
    if (rank <= 30) return { name: "Platinum", color: "linear-gradient(90deg, #e0e0e0, #ffffff)" };
    if (rank <= 60) return { name: "Gold", color: "linear-gradient(90deg, #f6d365, #fda085)" };
    if (rank <= 100) return { name: "Silver", color: "linear-gradient(90deg, #bdc3c7, #e0eafc)" };
    return { name: "Bronze", color: "linear-gradient(90deg, #d1913c, #ffd194)" };
  };

  const check = async () => {
    setLoading(true);
    setResult(null);

    const clean = input.replace("@", "").toLowerCase();
    const res = await fetch(`/api/check?handle=${clean}`);
    const data = await res.json();

    // inject badge tier
    if (data.eligible) {
      data.data.tier = getTier(data.data.rank);
    }

    setResult(data);
    setLoading(false);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/tria.jfif')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "450px",
          background: "rgba(0, 0, 0, 0.55)",
          borderRadius: "20px",
          padding: "2.2rem",
          boxShadow: "0 0 25px rgba(0,0,0,0.6)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(255,255,255,0.15)",
          color: "white",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "1.9rem", fontWeight: "700", marginBottom: "1.5rem" }}>
          Tria Airdrop Eligibility Checker
        </h1>

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="@yourhandle"
          style={{
            width: "100%",
            padding: "0.8rem",
            borderRadius: "12px",
            border: "none",
            outline: "none",
            marginBottom: "1rem",
            fontSize: "1rem",
          }}
        />

        <button
          onClick={check}
          style={{
            width: "100%",
            padding: "0.9rem",
            borderRadius: "12px",
            border: "none",
            background: "linear-gradient(90deg, #2563eb, #3b82f6)",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            fontSize: "1rem",
            boxShadow: "0 0 12px rgba(59,130,246,0.6)",
          }}
        >
          {loading ? "Checking..." : "Check"}
        </button>

        {result && (
          <div
            style={{
              marginTop: "1.6rem",
              background: "rgba(255,255,255,0.08)",
              padding: "1rem",
              borderRadius: "12px",
              textAlign: "left",
            }}
          >
            {result.eligible ? (
              <div>
                <p style={{ color: "#4ade80", fontWeight: "700" }}>Eligible ✓</p>
                <p>Handle: @{result.data.handle}</p>
                <p>Rank: {result.data.rank}</p>

                {/* 💎 TIER BADGE */}
                <div
                  style={{
                    marginTop: "10px",
                    display: "inline-block",
                    padding: "6px 14px",
                    borderRadius: "14px",
                    background: result.data.tier.color,
                    fontWeight: "700",
                    color: "#000",
                    textShadow: "0 0 2px rgba(255,255,255,0.6)",
                    boxShadow: "0 0 10px rgba(255,255,255,0.4)",
                  }}
                >
                  {result.data.tier.name} Tier
                </div>

                {/* allocation */}
                {result.data.allocation && (
                  <p style={{ marginTop: "12px" }}>
                    Allocation: {result.data.allocation}
                  </p>
                )}
              </div>
            ) : (
              <p style={{ color: "#f87171" }}>{result.message}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
