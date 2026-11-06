interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section" | "h2" | "p" | "li";
}

export function Reveal({ children, className = "", delay = 0, as: Tag = "div" }: RevealProps) {
  return (
    <Tag
      style={{ animationDelay: `${Math.min(delay, 120)}ms` }}
      className={`za-reveal ${className}`}
    >
      {children}
    </Tag>
  );
}
