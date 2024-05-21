import usePlayMusic from '@hooks/usePlayMusic';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import useSound from 'use-sound';

const ThemeSongWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { isPlaying, setIsPlaying } = usePlayMusic();
  const [first, setIsFirst] = useState(true);
  const [play, { stop }] = useSound('/static/sounds/landingPageMusicUpdated.wav');

  function playSong() {
    setIsPlaying(true);
    play();
  }

  function stopSong() {
    setIsPlaying(false);
    stop();
  }

  return (
    <div
      className={className}
      onMouseDown={() => {
        if (first && !isPlaying) {
          setIsFirst(false);
          playSong();
        }
      }}
    >
      {children}
      <div className="fixed bottom-0 right-0 z-10 h-16 w-16">
        {isPlaying ? (
          <Image
            onClick={() => stopSong()}
            height={64}
            width={64}
            src="/static/images/playButton.webp"
            alt="Play Button"
            className="cursor-pointer"
          />
        ) : (
          <Image
            onClick={() => playSong()}
            height={64}
            width={64}
            src="/static/images/soundDisabled.webp"
            alt="Sound Disabled"
            className="cursor-pointer"
          />
        )}
      </div>
    </div>
  );
};

export default ThemeSongWrapper;
