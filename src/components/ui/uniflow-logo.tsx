import { cn } from "@/lib/utils";

interface UniFlowLogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
  className?: string;
  animated?: boolean;
}

const sizeClasses = {
  sm: "text-xl",
  md: "text-2xl", 
  lg: "text-4xl",
  xl: "text-responsive-2xl",
  "2xl": "text-responsive-3xl"
};

export function UniFlowLogo({ size = "md", className, animated = false }: UniFlowLogoProps) {
  return (
    <h1 className={cn("uniflow-logo", sizeClasses[size], className)}>
      <span className="uni">UNI</span>
      <span className={cn("flow", animated && "animate-gradient-flow")}>FLOW</span>
    </h1>
  );
}