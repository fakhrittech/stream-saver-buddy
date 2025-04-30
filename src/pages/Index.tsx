
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

interface HistoryItem {
  id: string;
  title: string;
  thumbnail: string;
  format: string;
  timestamp: Date;
}

const Index = () => {
  const { toast } = useToast();
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
    <div className="min-h-screen pb-10">
      {/* Header */}
      <div className="bg-gradient text-white py-8 mb-8">
        <div className="container">
          <h1 className="text-3xl font-bold mb-2">YouTube Video Downloader</h1>
          <p className="opacity-90">Search and download YouTube videos in various formats and qualities</p>
        </div>
      </div>
      
      {/* Main content */}
      <div className="container">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Enter YouTube video URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" disabled={isLoading}>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="md:col-span-1">
              <VideoCard videoInfo={videoInfo} />
            </div>
            <div className="md:col-span-2 space-y-6">
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
          <Card className="mb-8 border-destructive">
            <CardContent className="pt-6">
              <p className="text-destructive">{errorMessage}</p>
            </CardContent>
          </Card>
        )}
        
        {downloadHistory.length > 0 && (
          <DownloadHistory history={downloadHistory} />
        )}
      </div>
    </div>
  );
};

export default Index;
