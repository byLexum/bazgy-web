export function DropletIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M12 3c4 5 7 8.5 7 12a7 7 0 1 1-14 0c0-3.5 3-7 7-12Z" strokeLinejoin="round" />
    </svg>
  );
}

export function BuildingIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <rect x="5" y="3" width="14" height="18" rx="0.5" />
      <path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1M10 21v-4h4v4" />
    </svg>
  );
}

export function MosqueIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M12 3c1.6 1.6 2.4 3 2.4 4.4A2.4 2.4 0 0 1 12 9.8a2.4 2.4 0 0 1-2.4-2.4C9.6 6 10.4 4.6 12 3Z" />
      <path d="M4 21v-6.5A4 4 0 0 1 6.3 11l1.2-.8" />
      <path d="M20 21v-6.5A4 4 0 0 0 17.7 11l-1.2-.8" />
      <path d="M9 21v-4a3 3 0 0 1 6 0v4" />
      <path d="M2.5 21h19" />
      <path d="M4 14.5V21M20 14.5V21" />
    </svg>
  );
}

export function RoadIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={className}>
      <path d="M9 3 4 21" />
      <path d="M15 3l5 18" />
      <path d="M11.5 9h1M11 13h2M10.5 17h3" strokeDasharray="0.1 3" />
    </svg>
  );
}
