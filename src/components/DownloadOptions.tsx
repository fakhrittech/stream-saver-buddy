
import React from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

interface DownloadOptionsProps {
  isLoading: boolean;
  onDownload: (format: string) => void;
}

const DownloadOptions: React.FC<DownloadOptionsProps> = ({ isLoading, onDownload }) => {
  const [selectedFormat, setSelectedFormat] = React.useState("mp4-360p");
  const isMobile = useIsMobile();

  const handleDownload = () => {
    onDownload(selectedFormat);
  };

  return (
    <div className="flex flex-col gap-3">
      <Select
        value={selectedFormat}
        onValueChange={setSelectedFormat}
        disabled={isLoading}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select quality" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="mp4-1080p">MP4 - 1080p</SelectItem>
          <SelectItem value="mp4-720p">MP4 - 720p</SelectItem>
          <SelectItem value="mp4-480p">MP4 - 480p</SelectItem>
          <SelectItem value="mp4-360p">MP4 - 360p</SelectItem>
          <SelectItem value="mp3-128">MP3 - 128kbps</SelectItem>
          <SelectItem value="mp3-192">MP3 - 192kbps</SelectItem>
        </SelectContent>
      </Select>
      <Button 
        className="w-full" 
        onClick={handleDownload} 
        disabled={isLoading}
      >
        <Download className="w-4 h-4 mr-2" /> Download
      </Button>
    </div>
  );
};

export default DownloadOptions;
