import React from 'react';

interface AnimatedLetterTextProps {
  text: string;
  className?: string;
  delayOffset?: number;
  duration?: number;
}

export const AnimatedLetterText: React.FC<AnimatedLetterTextProps> = ({
  text,
  className = '',
  delayOffset = 0,
  duration = 4.5
}) => {
  // Split text by words so responsive line breaks remain grammatically clean
  const words = text.split(' ');
  let runningIndex = delayOffset;

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, wordIndex) => {
        const letters = word.split('');
        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {letters.map((char, charIndex) => {
              const letterDelay = `${(runningIndex * 0.08).toFixed(2)}s`;
              runningIndex++;
              return (
                <span
                  key={charIndex}
                  className="chromatic-letter select-none"
                  style={{
                    animationDuration: `${duration}s`,
                    animationDelay: letterDelay
                  }}
                >
                  {char}
                </span>
              );
            })}
            {/* Preserve word space */}
            {wordIndex < words.length - 1 && (
              <span className="inline-block select-none">&nbsp;</span>
            )}
          </span>
        );
      })}
    </span>
  );
};
