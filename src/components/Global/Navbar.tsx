"use client";

import { usePathname } from 'next/navigation';
import PillNav from '@/components/Members/PillNav';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Team', href: '/members' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed top-0 left-0 w-full flex justify-center px-8 py-5 z-[100] bg-black/50 backdrop-blur-md border-b border-white/5 pointer-events-auto">
      <PillNav
        logo=""
        logoAlt=""
        items={NAV_ITEMS}
        activeHref={pathname}
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
        initialLoadAnimation={true}
      />
    </div>
  );
}
