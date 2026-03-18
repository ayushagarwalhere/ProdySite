import { useRef, useEffect } from 'react';

interface CustomCursorProps {
  x: number;
  y: number;
}

export default function CustomCursor({ x, y }: CustomCursorProps) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const outerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    pos.current = { x, y };
  }, [x, y]);

  useEffect(() => {
    let raf: number;
    const animate = () => {
      // Inner dot follows tightly
      if (innerRef.current) {
        innerRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      // Outer ring lerps behind
      outerPos.current.x += (pos.current.x - outerPos.current.x) * 0.12;
      outerPos.current.y += (pos.current.y - outerPos.current.y) * 0.12;
      if (outerRef.current) {
        outerRef.current.style.transform = `translate(${outerPos.current.x - 20}px, ${outerPos.current.y - 20}px)`;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div
        ref={innerRef}
        className="fixed top-0 left-0 z-50 pointer-events-none"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'hsl(38 70% 50%)',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={outerRef}
        className="fixed top-0 left-0 z-50 pointer-events-none"
        style={{
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1px solid hsl(38 70% 50% / 0.5)',
          mixBlendMode: 'difference',
        }}
      />
    </>
  );
}
