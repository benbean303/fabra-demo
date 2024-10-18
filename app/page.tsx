import dynamic from 'next/dynamic';

// Import the Scene component dynamically to avoid SSR
const Scene = dynamic(() => import('@/components/3D/Scene'), { ssr: false });

export default function Home() {
  return (
    <div className="h-screen w-screen">
      <Scene />
    </div>
  );
}