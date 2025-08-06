// src/overlay.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import OverlayApp from './components/OverlayApp';
import { useTimerStore } from './store/timerStore';
import './index.css';

// Initialize store for overlay
const initializeOverlay = async () => {
  const store = useTimerStore.getState();
  await store.loadFromStorage();
  console.log('Overlay initialized with data:', store.timerData);
};

// Initialize store
initializeOverlay().catch(console.error);

ReactDOM.createRoot(document.getElementById('overlay-root')!).render(
  <React.StrictMode>
    <OverlayApp />
  </React.StrictMode>
);