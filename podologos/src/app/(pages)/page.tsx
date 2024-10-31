"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/Login");
  }, [router]);

  return <div className="w-screen h-screen"></div>;
}
