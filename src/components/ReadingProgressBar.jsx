"use client";
import React, { useEffect, useState } from 'react';

export function ReadingProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Calculate progress
      const scrollY = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const maxScroll = documentHeight - windowHeight;
      
      const currentProgress = maxScroll > 0 ? (scrollY / maxScroll) * 100 : 0;
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 h-1.5 bg-gray-200/50 dark:bg-gray-800/50 backdrop-blur">
      <div 
        className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
