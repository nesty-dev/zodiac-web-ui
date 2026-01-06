export default function Theme2Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="p-8 bg-blue-50 min-h-screen">{children}</div>;
}
