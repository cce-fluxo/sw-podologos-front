export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <div className="absolute top-0 z-0 h-1/2 w-full bg-[#f1f3f6]"></div>
      <div className="h-full sm:h-[408px] w-full sm:w-[494px] z-10 rounded-2xl bg-white shadow-2xl">
        {children}
      </div>
    </div>
  );
}
