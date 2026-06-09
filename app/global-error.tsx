"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[GLOBAL_ERROR]", error);
  }, [error]);

  return (
    <html lang="en" className="dark">
      <body style={{ background: "#09090B", margin: 0 }}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "system-ui, sans-serif",
            color: "#FAFAFA",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "48px",
                marginBottom: "16px",
              }}
            >
              ⚡
            </div>
            <h1
              style={{
                fontSize: "24px",
                fontWeight: 700,
                marginBottom: "8px",
                color: "#FAFAFA",
              }}
            >
              Something went wrong
            </h1>
            <p
              style={{
                fontSize: "14px",
                color: "#71717A",
                marginBottom: "24px",
                maxWidth: "320px",
              }}
            >
              An unexpected error occurred. Our team has been notified.
            </p>
            <button
              onClick={reset}
              style={{
                padding: "10px 24px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
                color: "#FAFAFA",
                border: "none",
                fontSize: "14px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
