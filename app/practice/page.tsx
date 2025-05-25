'use client';

// Problem: Child component re-renders even when props don't change
import React, { useState } from 'react';

const Parent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* Preload link that converts to stylesheet on load */}

      <link rel="preload" href="style.css" as="style" />
      <link rel="stylesheet" href="style.css" />

      <button onClick={() => setCount((c) => c + 1)}>Increment: {count}</button>
      <Child />
    </div>
  );
};

const Child = React.memo(function Child() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increment: {count}</button>
      Static Content {count}
    </div>
  );
});

// const Child = () => {
//   return <div>Static Content</div>;
// };

export default Parent;
