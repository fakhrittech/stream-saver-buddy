
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";

interface HistoryItem {
  id: string;
  title: string;
  thumbnail: string;
  format: string;
  timestamp: Date;
}

interface DownloadHistoryProps {
  history: HistoryItem[];
}

const DownloadHistory: React.FC<DownloadHistoryProps> = ({ history }) => {
  const isMobile = useIsMobile();
  
  if (history.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-1 pt-3 px-3">
        <CardTitle className="text-lg">Download History</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="download-history-container max-h-64">
          <div className="p-3 space-y-3">
            {history.map((item, index) => (
              <React.Fragment key={item.id}>
                <div className="flex items-start gap-2">
                  <div className="w-14 h-8 flex-shrink-0 rounded overflow-hidden">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-xs line-clamp-1">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-[10px] px-1 py-0">{item.format}</Badge>
                      <span className="text-[10px] text-muted-foreground">
                        {formatDistanceToNow(item.timestamp, { addSuffix: true })}
                      </span>
                    </div>
                  </div>
                </div>
                {index < history.length - 1 && <Separator />}
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DownloadHistory;
