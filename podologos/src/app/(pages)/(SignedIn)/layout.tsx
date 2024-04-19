export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full h-full">
      <div className="h-full w-[292px] bg-azul"></div>
      <div className="flex-1">{children}</div>
    </div>
  );
}
