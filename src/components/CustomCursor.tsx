"use client";
import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;

      // Check if we're over a clickable element
      const target = e.target as HTMLElement;
      const isClickable = target.tagName === 'BUTTON' || 
                          target.tagName === 'A' || 
                          target.closest('button') || 
                          target.closest('a') ||
                          target.getAttribute('role') === 'button' ||
                          target.classList.contains('clickable');

      if (isClickable) {
        cursor.classList.add('hovering');
      } else {
        cursor.classList.remove('hovering');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div ref={cursorRef} className="custom-cursor">
      <svg viewBox="0 0 10.08 10.08" xmlns={"http://www.w3.org/2000/svg"}>
        <path d="M4.8,0H.46C.2,0,0,.2,0,.46v4.34c0,2.89,2.33,5.38,5.22,5.28,2.64-.09,4.76-2.22,4.85-4.86C10.18,2.33,7.69,0,4.8,0ZM5.04,6.99c-1.08,0-1.95-.87-1.95-1.95s.87-1.95,1.95-1.95,1.95.87,1.95,1.95-.87,1.95-1.95,1.95Z"/>
      </svg>
    </div>
  );
}