'use client';
import { getWords } from '@/lib/soup'
import { useEffect, useState } from 'react';

export default function Home() {
  const [abc, setAbc] = useState('');
  useEffect(() => {
    getWords().then((s) => {
      setAbc(s)
    })
  }, []);

  return (
    <div>
      hi {abc}
    </div>
  );
}
