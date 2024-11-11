import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

import { LineWave } from 'react-loader-spinner';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Loader component that displays the loading spinner
function Loader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <LineWave
        visible={true}
        height="220"
        width="220"
        color="#3b82f6"
        ariaLabel="line-wave-loading"
      />
    </div>
  );
}

function Index() {
  const [loading, setLoading] = useState(true);

  // Effect to handle the app content load
  useEffect(() => {
    // Listen for when everything (including assets) has loaded
    const handleWindowLoad = () => {
      setLoading(false);
    };

    window.addEventListener('load', handleWindowLoad);

    // Cleanup listener if the component unmounts
    return () => {
      window.removeEventListener('load', handleWindowLoad);
    };
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <App />;
}

root.render(<Index />);
