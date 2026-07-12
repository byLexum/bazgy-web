export default function PlaceholderPhoto({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`absolute inset-0 flex items-center justify-center bg-[repeating-linear-gradient(135deg,#e5e5e5,#e5e5e5_10px,#f0f0f0_10px,#f0f0f0_20px)] ${className}`}
    >
      <span className="px-4 text-center font-mono text-[11px] uppercase tracking-wider text-neutral-500">
        {label}
      </span>
    </div>
  );
}
