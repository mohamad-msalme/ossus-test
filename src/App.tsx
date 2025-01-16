import React from 'react';
import { DemoPage } from './exemples';

export const App: React.FC = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '80%',
        margin: '0 auto',
        gap: '2rem',
      }}
    >
      <DemoPage />
    </div>
  );
};
