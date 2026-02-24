import React, { useEffect, useRef } from 'react';

const AnimatedBackground = () => {
  const orbsRef = useRef([]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
            const scrollY = window.pageYOffset;
            const orbs = document.querySelectorAll('.orb');
            orbs.forEach((orb, index) => {
                const speed = 0.02 + (index * 0.01);
                orb.style.transform = `translateY(${scrollY * speed}px)`;
            });
            ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-animated">
        <div className="bg-gradient"></div>
        <div className="bg-mesh"></div>
        <div className="floating-orbs">
            {/* Using refs for potential access but querySelectorAll works too */}
            <div className="orb orb-1"></div>
            <div className="orb orb-2"></div>
            <div className="orb orb-3"></div>
            <div className="orb orb-4"></div>
            <div className="orb orb-5"></div>
        </div>
        <div className="grid-overlay"></div>
    </div>
  );
};

export default AnimatedBackground;
