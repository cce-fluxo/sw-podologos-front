'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push('/Login');
  }, [router]);

  return <div className='h-screen w-screen'></div>;
}
