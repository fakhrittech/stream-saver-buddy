
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Search } from "lucide-react";
import VideoCard from "@/components/VideoCard";
import DownloadOptions from "@/components/DownloadOptions";
import DownloadProgress from "@/components/DownloadProgress";
import DownloadHistory from "@/components/DownloadHistory";
import { getVideoInfo, downloadVideo, VideoInfo } from "@/utils/youtubeService";
import { generateUniqueId } from "@/utils/formatters";
import { useIsMobile } from "@/hooks/use-mobile";

interface HistoryItem {
  id: string;
  title: string;
  thumbnail: string;
  format: string;
  timestamp: Date;
}

const Index = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [url, setUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "downloading" | "processing" | "complete" | "error">("idle");
  const [downloadHistory, setDownloadHistory] = useState<HistoryItem[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      toast({
        title: "URL required",
        description: "Please enter a YouTube video URL",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setVideoInfo(null);
    setDownloadStatus("idle");
    setErrorMessage(undefined);

    try {
      const info = await getVideoInfo(url);
      setVideoInfo(info);
      toast({
        title: "Video found",
        description: "Video information retrieved successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to get video information",
        variant: "destructive",
      });
      setErrorMessage(error instanceof Error ? error.message : "Failed to get video information");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = async (format: string) => {
    if (!videoInfo) return;
    
    setDownloadStatus("processing");
    setDownloadProgress(0);
    
    try {
      setDownloadStatus("downloading");
      await downloadVideo({
        videoId: videoInfo.videoId,
        format,
        onProgress: (progress) => {
          setDownloadProgress(progress);
        }
      });
      
      setDownloadStatus("complete");
      
      // Add to download history
      const historyItem: HistoryItem = {
        id: generateUniqueId(),
        title: videoInfo.title,
        thumbnail: videoInfo.thumbnail,
        format: format.replace('-', ' ').toUpperCase(),
        timestamp: new Date()
      };
      
      setDownloadHistory(prev => [historyItem, ...prev]);
      
      toast({
        title: "Download complete",
        description: `${videoInfo.title} has been downloaded successfully`,
      });
    } catch (error) {
      setDownloadStatus("error");
      setErrorMessage("Download failed. Please try again.");
      toast({
        title: "Download failed",
        description: "There was an error during download",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen pb-10 max-w-full">
      {/* Header */}
      <div className="bg-gradient text-white py-6">
        <div className="container px-4">
          <h1 className="text-2xl font-bold mb-1">YouTube Downloader</h1>
          <p className="opacity-90 text-sm">Search and download videos on your mobile</p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container px-4 mt-5">
        <Card className="mb-5 shadow-sm">
          <CardContent className="p-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <Input
                placeholder="Enter YouTube video URL"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                disabled={isLoading}
                className="text-base"
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                    Loading...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Search className="w-4 h-4" /> Search
                  </span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        {videoInfo && (
          <div className="grid grid-cols-1 gap-5 mb-5">
            <VideoCard videoInfo={videoInfo} />
            <div className="space-y-5">
              <DownloadOptions 
                isLoading={downloadStatus === "downloading" || downloadStatus === "processing"} 
                onDownload={handleDownload} 
              />
              
              <DownloadProgress 
                progress={downloadProgress} 
                status={downloadStatus} 
                error={errorMessage} 
              />
            </div>
          </div>
        )}
        
        {errorMessage && !videoInfo && (
          <Card className="mb-5 border-destructive">
            <CardContent className="pt-4">
              <p className="text-destructive">{errorMessage}</p>
            </CardContent>
          </Card>
        )}
        
        {downloadHistory.length > 0 && (
          <div className="mt-5">
            <DownloadHistory history={downloadHistory} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
