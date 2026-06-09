export default function DashboardLoading() {
  return (
    <div className="max-w-4xl">
      {/* Header skeleton */}
      <div className="mb-8">
        <div className="h-7 w-48 rounded-lg mb-2 skeleton" />
        <div className="h-4 w-80 rounded-lg skeleton" />
      </div>

      {/* Content skeleton */}
      <div className="space-y-4">
        <div className="h-32 rounded-2xl skeleton" />
        <div className="flex gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-9 w-24 rounded-xl skeleton" />
          ))}
        </div>
        <div className="h-64 rounded-2xl skeleton" />
      </div>

      <style>{`
        .skeleton {
          background: linear-gradient(90deg, 
            rgba(255,255,255,0.03) 25%, 
            rgba(255,255,255,0.06) 50%, 
            rgba(255,255,255,0.03) 75%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s infinite;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}
