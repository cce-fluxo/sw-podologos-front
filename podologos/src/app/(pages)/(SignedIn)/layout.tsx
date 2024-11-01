import SideBar from '@/Components/SideBar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className='flex h-full w-full'>
      <SideBar />
      <div className='flex-1'>{children}</div>
    </div>
  );
}
