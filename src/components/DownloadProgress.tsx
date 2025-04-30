
import React from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface DownloadProgressProps {
  progress: number;
  status: "idle" | "downloading" | "processing" | "complete" | "error";
  error?: string;
}

const DownloadProgress: React.FC<DownloadProgressProps> = ({ 
  progress, 
  status, 
  error 
}) => {
  if (status === "idle") return null;

  const statusLabels = {
    downloading: "Downloading...",
    processing: "Processing...",
    complete: "Download Complete",
    error: "Download Failed"
  };

  const statusColors = {
    downloading: "bg-brand-400",
    processing: "bg-amber-500",
    complete: "bg-green-500",
    error: "bg-destructive"
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Badge className={statusColors[status]}>
          {statusLabels[status]}
        </Badge>
        {status !== "error" && (
          <span className="text-sm font-medium">{Math.round(progress)}%</span>
        )}
      </div>
      
      <Progress value={progress} className="h-2" />
      
      {status === "error" && error && (
        <p className="text-sm text-destructive mt-1">{error}</p>
      )}
    </div>
  );
};

export default DownloadProgress;
