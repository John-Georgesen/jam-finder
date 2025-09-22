import dynamic from 'next/dynamic';

const DynamicMap = dynamic(() => import('./map'));

export default function Home() {
  return (
    <div>
      <h1>My Mapbox Map</h1>
      <DynamicMap />
    </div>
  );
}