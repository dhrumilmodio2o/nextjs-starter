'use client';
import { useState, useEffect, useRef, useCallback } from 'react';

// Static data
const sampleDescriptions = [
  'A relaxing beach sunset',
  'Mountains covered in snow',
  'Delicious homemade pasta',
  'Vintage camera collection',
  'Cozy reading nook',
  'City skyline at night',
  'Blooming cherry blossoms',
  'Aesthetic workspace setup',
  'Cup of coffee and journal',
  'Rustic countryside road',
  'Starry sky in the desert',
  'Ocean waves crashing',
  'Cute puppy with sunglasses',
  'Handmade pottery collection',
  'Dreamy forest path',
];

const generatePins = (count = 30) => {
  return Array.from({ length: count }).map((_, i) => {
    const randomHeight = 400 + Math.floor(Math.random() * 300);
    return {
      id: Math.random(),
      image: `https://placehold.co/300x${randomHeight}?rnd=${Math.random()}`,
      height: randomHeight,
      description: sampleDescriptions[i % sampleDescriptions.length],
    };
  });
};

export default function MasonrySearchPage() {
  const [pins, setPins] = useState(generatePins());
  const [page, setPage] = useState(1);
  const loader = useRef(null);

  useEffect(() => {
    const pinsNew = generatePins();
    setPins((prev) => [...prev, ...pinsNew]);
  }, [page]);

  const handleObserver = useCallback((entries: any) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
    return () => observer.disconnect();
  }, [handleObserver]);

  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {pins.map((pin) => (
          <ImageCard key={pin.id} pin={pin} />
        ))}
      </div>

      {/* Infinite scroll trigger */}
      <div ref={loader} className="h-10"></div>
    </div>
  );
}

function ImageCard({ pin }: { pin: any }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="break-inside-avoid">
      <div className="mb-4 relative">
        {!loaded && (
          <div
            className="absolute inset-0 bg-gray-300 animate-pulse rounded-t-2xl"
            style={{ height: pin.height }}
          />
        )}
        <img
          src={pin.image}
          alt="pin"
          className={`w-full rounded-t-2xl transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          height={pin.height}
          width={300}
          onLoad={() => setLoaded(true)}
        />
        <div className="text-sm p-2">{pin.description}</div>
      </div>
    </div>
  );
}
