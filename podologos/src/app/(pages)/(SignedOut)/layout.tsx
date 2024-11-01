export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-full w-full flex-col items-center justify-center'>
      <div className='absolute top-0 z-0 h-1/2 w-full bg-[#f1f3f6]'></div>
      <div className='z-10 h-full w-full rounded-2xl bg-white shadow-2xl sm:h-[408px] sm:w-[494px]'>
        {children}
      </div>
    </div>
  );
}
