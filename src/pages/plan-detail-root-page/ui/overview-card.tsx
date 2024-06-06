import { useRef, useState } from "react";
import { cn } from "../../../shared/utils/cn";

interface Props {
  icon?: React.ReactNode;
  label?: React.ReactNode;
  value?: React.ReactNode;
  className?: string;
}

// Copy from https://ui.aceternity.com/components/3d-card-effect
export const OverviewCard: React.FC<Props> = ({
  icon,
  label,
  value,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMouseEntered, setIsMouseEntered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } =
      containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left - width / 2) / 20;
    const y = (e.clientY - top - height / 2) / 3;
    containerRef.current.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseEntered(true);
    if (!containerRef.current) return;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    setIsMouseEntered(false);
    containerRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn(
        "w-full h-full transition-all duration-200 ease-linear",
        className
      )}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div className="flex-1 flex flex-row flex-wrap items-center px-8 py-6 border shadow rounded-xl">
        <div className="mr-6 text-primary-300">{icon}</div>
        <div className="flex-1 flex flex-col flex-wrap gap-1">
          <p className="text-sm font-bold text-primary-400/80">{label}</p>
          <p className="text-base font-extrabold text-primary-500/80">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};
