"use client";
import '@vidstack/react/player/styles/default/theme.css';
import '@vidstack/react/player/styles/default/layouts/video.css';
import { MediaPlayer, MediaProvider } from '@vidstack/react';
import { defaultLayoutIcons, DefaultVideoLayout } from '@vidstack/react/player/layouts/default';
import { SeekButton } from '@vidstack/react';
import { SeekForward10Icon, SeekBackward10Icon } from '@vidstack/react/icons';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <MediaPlayer title="Sprite Fight" src="https://files.vidstack.io/sprite-fight/hls/stream.m3u8">
        <MediaProvider>
          <DefaultVideoLayout thumbnails="https://files.vidstack.io/sprite-fight/thumbnails.vtt" icons={defaultLayoutIcons} />
          <SeekButton className="vds-button" seconds={10}>
            <SeekForward10Icon className="vds-icon" />
            <SeekBackward10Icon className="vds-icon" />
          </SeekButton>
        </MediaProvider>
      </MediaPlayer>
    </main>
  );
}
