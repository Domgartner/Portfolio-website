import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Get the root element
const rootElement = document.getElementById('root');

// Create a root and render the App
const root = createRoot(rootElement);
root.render(<App />);
