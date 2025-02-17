import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function LoadingScreen({ onComplete }) {
  const containerRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out the loading screen
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          onComplete: () => {
            onComplete();
          }
        });
      }
    });

    // Initial animation sequence
    tl.from(logoRef.current, {
      scale: 0,
      rotation: -180,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out"
    })
    .to(logoRef.current, {
      scale: 1.2,
      duration: 0.5,
      ease: "power2.inOut"
    })
    .to(logoRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.7)"
    });

  }, [onComplete]);

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div ref={logoRef} className="relative w-32 h-32">
        <Image
          src="/main-logo.png"
          alt="Tribbe Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
} 