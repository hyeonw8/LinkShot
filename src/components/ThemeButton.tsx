'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function ThemeButton() {
  const { resolvedTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    // console.log('현재 theme:', theme);
    // console.log('시스템 theme:', resolvedTheme);
    setMounted(true);
  }, [theme, resolvedTheme, mounted]);

  if (!mounted) return null;

  return (
    <button onClick={() => setTheme(isDark ? 'light' : 'dark')} type="button">
      <Image
        src={isDark ? '/assets/svg/moon.svg' : '/assets/svg/sun.svg'}
        alt="theme icon"
        width={48}
        height={48}
      />
    </button>
  );
}
