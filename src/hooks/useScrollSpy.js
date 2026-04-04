import { useEffect, useRef, useState } from 'react';

const SECTIONS = ['experience', 'projects', 'skills', 'contact'];

export default function useScrollSpy() {
  const [active, setActive] = useState('');
  const observer = useRef(null);

  useEffect(() => {
    observer.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: '-80px 0px -60% 0px', threshold: 0 },
    );

    for (const id of SECTIONS) {
      const el = document.getElementById(id);
      if (el) observer.current.observe(el);
    }

    return () => observer.current?.disconnect();
  }, []);

  return active;
}
