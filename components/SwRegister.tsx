'use client';
import { useEffect } from 'react';
import { BASE_PATH } from '@/lib/site';

export default function SwRegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register(`${BASE_PATH}/sw.js`).catch(() => {});
    }
  }, []);
  return null;
}
