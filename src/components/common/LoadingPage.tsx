import React from 'react';

interface LoadingProps {
  message?: string;
  size?: number; // spinner size in pixels
  color?: string; // spinner color
}

export const Loading: React.FC<LoadingProps> = ({
  message = 'Loading...',
  size = 48,
  color = 'blue-500',
}) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      {/* Spinner */}
      <div
        className={`w-${size} h-${size} border-4 border-gray-300 border-t-${color} rounded-full animate-spin mb-4`}
        style={{ width: size, height: size }}
      ></div>

      {/* Message */}
      <p className="text-gray-700 text-center text-lg">{message}</p>
    </div>
  );
};
