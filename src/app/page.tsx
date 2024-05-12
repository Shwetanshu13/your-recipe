import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center bg-center" style={{ backgroundImage: "url('/images/guest.jpg')" }}>
      <Head>
        <title>My Recipe Book</title>
        <meta name="description" content="Store and organize your recipes online with My Recipe Book" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-20 flex flex-col items-center">
        <h1 className="text-4xl mb-4 font-bold">Welcome to My Recipe Book</h1>
        <p className="text-lg font-semibold mb-6">Store and organize your favorite recipes online!</p>
        <p className="text-lg font-semibold mb-6">Never lose a recipe again. Keep them all in one place and access them from anywhere.</p>
        <Link
          href="/auth/signup"
          className="btn bg-black hover:bg-slate-800 text-white font-bold py-2 px-4 rounded"
        >
          Get Started
        </Link>
      </main>
    </div>
  );
};

export default Home;
