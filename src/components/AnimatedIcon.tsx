"use client";

import React from "react";
import { LucideProps } from "lucide-react";

interface AnimatedIconProps {
  icon: React.ComponentType<LucideProps>;
  size?: number;
  className?: string;
  duration?: number;
}

const AnimatedIcon: React.FC<AnimatedIconProps> = ({
  icon: Icon,
  size = 24,
  className = "",
  duration = 800,
}) => {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Base icon (thin outline) */}
      <div className="absolute inset-0 text-gray-400 group-hover:text-black transition-colors duration-700">
        <Icon size={size} fill="none" stroke="currentColor" strokeWidth={1.5} />
      </div>

      {/* Thicker stroke icon (animated clip) */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: "inset(0 100% 0 0)",
          transition: `clip-path ${duration}ms ease-out`,
        }}
      >
        <div className="text-black group-hover:animate-fill-left-to-right">
          <Icon size={size} fill="none" stroke="black" strokeWidth={3} />
        </div>
      </div>
    </div>
  );
};

export default AnimatedIcon;
