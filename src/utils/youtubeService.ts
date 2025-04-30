
// This is a mock service for YouTube downloads
// In a real application, you would use a proper backend service

function parseYoutubeUrl(url: string): string | null {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}

export interface VideoInfo {
  videoId: string;
  title: string;
  thumbnail: string;
  duration: number;
  author: string;
}

export async function getVideoInfo(url: string): Promise<VideoInfo | null> {
  const videoId = parseYoutubeUrl(url);
  
  if (!videoId) {
    throw new Error('Invalid YouTube URL');
  }
  
  // In a real app, you would make an API call to get video information
  // For demonstration purposes, we'll simulate a delay and return mock data
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  return {
    videoId,
    title: `Sample YouTube Video (${videoId})`,
    thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
    duration: 389, // 6:29 in seconds
    author: "YouTube Creator"
  };
}

export interface DownloadOptions {
  videoId: string;
  format: string;
  onProgress: (progress: number) => void;
}

export async function downloadVideo(options: DownloadOptions): Promise<string> {
  const { videoId, format, onProgress } = options;
  
  // Simulate download progress
  for (let i = 0; i <= 100; i += 5) {
    onProgress(i);
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  // In a real application, this would initiate the actual download
  return `https://example.com/downloads/${videoId}.${format.split('-')[0]}`;
}
