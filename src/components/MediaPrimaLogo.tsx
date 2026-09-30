import React from 'react';

interface MediaPrimaLogoProps {
  className?: string;
  height?: number;
}

export const MediaPrimaLogo: React.FC<MediaPrimaLogoProps> = ({
  className = 'h-9',
  height,
}) => {
  return (
    <div
      className={`inline-flex items-center overflow-hidden rounded-md border border-[#e2e8f0] shadow-2xs select-none shrink-0 ${className}`}
      style={height ? { height: `${height}px` } : undefined}
      title="Media Prima"
    >
      <svg
        viewBox="0 0 210 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-full w-auto aspect-[2.1/1]"
      >
        {/* Left Red Block */}
        <rect x="0" y="0" width="105" height="100" fill="#E31B23" />
        <text
          x="52.5"
          y="56"
          fill="#FFFFFF"
          fontFamily="Inter, Arial, Helvetica, system-ui, sans-serif"
          fontWeight="900"
          fontSize="35"
          letterSpacing="-1.5"
          textAnchor="middle"
          dominantBaseline="central"
        >
          media
        </text>

        {/* Right White Block */}
        <rect x="105" y="0" width="105" height="100" fill="#FFFFFF" />
        <text
          x="157.5"
          y="56"
          fill="#18181B"
          fontFamily="Inter, Arial, Helvetica, system-ui, sans-serif"
          fontWeight="900"
          fontSize="35"
          letterSpacing="-1.5"
          textAnchor="middle"
          dominantBaseline="central"
        >
          prima
        </text>
      </svg>
    </div>
  );
};
