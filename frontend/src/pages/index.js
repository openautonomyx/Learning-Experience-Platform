import React from 'react';
import Header from '../components/Header';

const HomePage = () => {
  return (
    <div>
      <Header />
      <main className="p-8">
        <h2 className="text-2xl font-semibold">Welcome to the LXP Platform</h2>
        <p>Build and sell online courses easily.</p>
      </main>
    </div>
  );
};

export default HomePage;