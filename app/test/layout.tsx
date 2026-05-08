import "./_styles/palette.css";

export default function TestLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div data-theme="test" className="min-h-screen bg-[var(--t-bg)] text-[var(--t-text)] antialiased">
      {children}
    </div>
  );
}
