
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatDistanceToNow } from "date-fns";

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
  if (history.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Download History</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="download-history-container">
          <div className="space-y-4">
            {history.map((item, index) => (
              <React.Fragment key={item.id}>
                <div className="flex items-start gap-3">
                  <div className="w-16 h-9 flex-shrink-0 rounded overflow-hidden">
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm line-clamp-1">{item.title}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">{item.format}</Badge>
                      <span className="text-xs text-muted-foreground">
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
