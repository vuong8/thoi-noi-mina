import React, { useState, useRef, useEffect } from 'react';
import { Music, Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Using a royalty-free baby lullaby from freemusicarchive.org
  const audioSrc = "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/Creative_Commons/Chad_Crouch/Arps/Chad_Crouch_-_Shipping_Lanes.mp3";

  useEffect(() => {
    // Show player after a short delay
    const timer = setTimeout(() => {
      setShowPlayer(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Set default volume to 30%
      audioRef.current.loop = true;
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            console.log("Audio play failed:", error);
          });
        }
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleAudioError = () => {
    console.log("Audio failed to load");
    setIsPlaying(false);
  };

  if (!showPlayer) return null;

  return (
    <>
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        onEnded={handleAudioEnded}
        onError={handleAudioError}
        preload="metadata"
      />

      {/* Floating music player */}
      <div className="fixed bottom-6 right-6 z-40 animate-fade-in-up">
        <Card className="shadow-gentle border-0 bg-card/95 backdrop-blur-md">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Music className="w-5 h-5 text-primary animate-gentle-bounce" />
                <span className="text-sm font-nunito font-medium text-primary hidden sm:inline">
                  Nhạc nền
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  onClick={togglePlay}
                  size="sm"
                  variant="outline"
                  className="w-10 h-10 p-0 hover:bg-primary/10 border-primary/30"
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 text-primary" />
                  ) : (
                    <Play className="w-4 h-4 text-primary" />
                  )}
                </Button>
                
                <Button
                  onClick={toggleMute}
                  size="sm"
                  variant="outline"
                  className="w-10 h-10 p-0 hover:bg-primary/10 border-primary/30"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-muted-foreground" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-primary" />
                  )}
                </Button>
              </div>
            </div>

            {/* Now playing indicator */}
            {isPlaying && (
              <div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
                <div className="flex gap-1">
                  <div className="w-1 h-3 bg-primary/60 rounded animate-bounce"></div>
                  <div className="w-1 h-3 bg-primary/60 rounded animate-bounce delay-75"></div>
                  <div className="w-1 h-3 bg-primary/60 rounded animate-bounce delay-150"></div>
                </div>
                <span className="font-nunito">Đang phát nhạc thiệu nhi</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Music notification */}
      {showPlayer && !isPlaying && (
        <div className="fixed bottom-24 right-6 z-30 animate-fade-in-up">
          <Card className="shadow-soft border-0 bg-accent-light/90 backdrop-blur-sm">
            <CardContent className="p-3">
              <p className="text-xs font-nunito text-accent-foreground flex items-center gap-2">
                <Music className="w-4 h-4" />
                Bấm play để nghe nhạc nền nhẹ nhàng 🎵
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;