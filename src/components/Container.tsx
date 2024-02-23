export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full pt-6 pb-12 md:pt-12 md:pb-24">
      <div className="container px-4 md:px-6">{children}</div>
    </div>
  );
}
