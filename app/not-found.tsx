import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#09090B" }}
    >
      <div className="text-center px-6">
        <div
          className="text-8xl font-black mb-4"
          style={{
            fontFamily: "Syne, sans-serif",
            background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </div>
        <h1
          className="text-2xl font-bold mb-3"
          style={{ fontFamily: "Syne, sans-serif", color: "#FAFAFA" }}
        >
          Page not found
        </h1>
        <p className="text-sm mb-8 max-w-sm mx-auto" style={{ color: "#71717A" }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold"
            style={{ border: "1px solid rgba(255,255,255,0.1)", color: "#A1A1AA" }}
          >
            Go home
          </Link>
          <Link
            href="/dashboard/generate"
            className="px-5 py-2.5 rounded-xl text-sm font-semibold"
            style={{
              background: "linear-gradient(135deg, #7C3AED, #5B21B6)",
              color: "#FAFAFA",
            }}
          >
            Start generating
          </Link>
        </div>
      </div>
    </div>
  );
}
