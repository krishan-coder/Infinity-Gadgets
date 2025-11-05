'use client';

import { useRouter } from 'next/navigation';

export default function ContactUsLink({ className = '' }) {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();

    // Make sure we’re on the home route (optional — only if needed)
    if (window.location.pathname !== '/') {
      router.push('/'); // Go home first
      setTimeout(() => {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
      }, 600); // give time for navigation
    } else {
      // Just scroll down
      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    }
  };

  return (
    <a href="#footer" onClick={handleClick} className={className}>
      Contact Us
    </a>
  );
}
