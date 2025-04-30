
import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDuration } from "@/utils/formatters";

interface VideoCardProps {
  videoInfo: {
    title: string;
    thumbnail: string;
    duration: number;
    author: string;
  } | null;
}

const VideoCard: React.FC<VideoCardProps> = ({ videoInfo }) => {
  if (!videoInfo) return null;

  return (
    <Card className="w-full overflow-hidden">
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
      <CardContent className="pt-4">
        <h3 className="font-semibold text-lg line-clamp-2">{videoInfo.title}</h3>
        <p className="text-muted-foreground text-sm mt-1">{videoInfo.author}</p>
      </CardContent>
    </Card>
  );
};

export default VideoCard;
