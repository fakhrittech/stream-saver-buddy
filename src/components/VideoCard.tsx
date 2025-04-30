
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDuration } from "@/utils/formatters";
import { useIsMobile } from "@/hooks/use-mobile";

interface VideoCardProps {
  videoInfo: {
    title: string;
    thumbnail: string;
    duration: number;
    author: string;
  } | null;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoInfo }) => {
  const isMobile = useIsMobile();
  
  if (!videoInfo) return null;

  return (
    <Card className="w-full overflow-hidden shadow-sm">
      <div className="aspect-video relative overflow-hidden">
        <img
          src={videoInfo.thumbnail}
          alt={videoInfo.title}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute bottom-2 right-2 bg-black/70 hover:bg-black/70">
          {formatDuration(videoInfo.duration)}
        </Badge>
      </div>
      <CardContent className="p-3">
        <h3 className="font-semibold text-base line-clamp-2">{videoInfo.title}</h3>
        <p className="text-muted-foreground text-xs mt-1">{videoInfo.author}</p>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
