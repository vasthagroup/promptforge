import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "#09090B" }}>
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(124,58,237,0.1) 0%, transparent 70%)" }} />
      <div className="relative z-10 w-full max-w-sm px-4">
        <div className="text-center mb-8">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3" style={{ background: "linear-gradient(135deg, #7C3AED, #5B21B6)" }}>
            <span className="text-lg">⚡</span>
          </div>
          <h1 className="text-xl font-bold" style={{ fontFamily: "Syne, sans-serif", color: "#FAFAFA" }}>Create your account</h1>
          <p className="text-sm mt-1" style={{ color: "#71717A" }}>Start generating expert AI prompts for free</p>
        </div>
        <SignUp appearance={{ variables: { colorBackground: "#18181B", colorText: "#FAFAFA", colorPrimary: "#7C3AED", colorInputBackground: "#27272A", colorInputText: "#FAFAFA" } }} />
      </div>
    </div>
  );
}
