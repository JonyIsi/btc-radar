'use client';

import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-white shadow">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            BTC Radar
          </Link>
          <div className="flex space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              Indicators
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-800">
              About
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 