interface VectorSvgProps {
  className?: string;
  direction?: "left" | "right";
}

export default function VectorSvg({ className, direction = "left" }: VectorSvgProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      style={direction === "right" ? { transform: "rotate(180deg)" } : undefined}
    >
      <path
        d="M17 12H8M11 8l-4 4 4 4"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
