import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';

interface PropertiesProps {
  wallpapers: string[];
  currentWallpaper: string;
  onWallpaperChange: (wallpaper: string) => void;
  onWallpaperUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Properties: React.FC<PropertiesProps> = ({
  wallpapers,
  currentWallpaper,
  onWallpaperChange,
  onWallpaperUpload,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="p-4 bg-background text-foreground">
      <h2 className="text-xl font-bold mb-4">Desktop Background</h2>
      <div className="grid grid-cols-3 gap-4 mb-4">
        {wallpapers.map((wallpaper, index) => (
          <div
            key={index}
            className={`cursor-pointer overflow-hidden rounded-lg ${
              wallpaper === currentWallpaper 
                ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' 
                : 'hover:ring-2 hover:ring-primary/50 hover:ring-offset-2 hover:ring-offset-background'
            }`}
            onClick={() => onWallpaperChange(wallpaper)}
          >
            <div className="relative w-full h-0 pb-[56.25%]">
              <Image 
                src={wallpaper} 
                alt={`Wallpaper ${index + 1}`} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                className="transition-transform duration-300 ease-in-out hover:scale-110"
              />
            </div>
          </div>
        ))}
      </div>
      <div>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={onWallpaperUpload}
          accept="image/*"
        />
        <Button onClick={() => fileInputRef.current?.click()}>
          Upload Custom Wallpaper
        </Button>
      </div>
    </div>
  );
};

export default Properties;