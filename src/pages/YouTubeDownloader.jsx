import { useState } from 'react';
import { Search, Download, Video } from 'lucide-react';

const YouTubeDownloader = () => {
  const [url, setUrl] = useState('');
  const [thumbnails, setThumbnails] = useState(null);
  const [error, setError] = useState('');

  const extractVideoId = (link) => {
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
    const match = link.match(regex);
    return match ? match[1] : null;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');
    setThumbnails(null);

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError('Please enter a valid YouTube video URL.');
      return;
    }

    setThumbnails({
      maxres: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
      hq: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      sd: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
    });
  };

  const downloadImage = async (imgUrl, quality) => {
    try {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `youtube-thumbnail-${quality}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
      console.error('Download failed', err);
      // Fallback if CORS prevents direct download
      window.open(imgUrl, '_blank');
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-in-out' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{ background: 'rgba(255, 0, 0, 0.1)', padding: '1rem', borderRadius: '50%' }}>
            <Video size={48} color="#ff0000" />
          </div>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>
          YouTube Thumbnail Downloader
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Paste a YouTube Video or Shorts link below to download the thumbnail in HD quality.
        </p>
      </div>

      <form onSubmit={handleSearch} className="input-group">
        <input
          type="text"
          className="url-input"
          placeholder="Paste YouTube video or Shorts link here..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit" className="submit-btn">
          <Search size={20} />
        </button>
      </form>

      {error && (
        <div style={{ textAlign: 'center', color: '#ff4d4d', marginTop: '1rem' }}>
          {error}
        </div>
      )}

      {thumbnails && (
        <div className="results-grid">
          <div className="glass-card">
            <h3 style={{ marginBottom: '1rem', color: '#00f2fe' }}>Maximum Resolution</h3>
            <img src={thumbnails.maxres} alt="Max Res" style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => downloadImage(thumbnails.maxres, 'maxres')}>
              <Download size={18} /> Original Quality
            </button>
          </div>

          <div className="glass-card">
            <h3 style={{ marginBottom: '1rem', color: '#f8fafc' }}>High Resolution (SD)</h3>
            <img src={thumbnails.sd} alt="SD Res" style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
            <button className="btn-primary" style={{ width: '100%', background: 'rgba(255,255,255,0.1)', color: 'white' }} onClick={() => downloadImage(thumbnails.sd, 'sd')}>
              <Download size={18} /> Download SD
            </button>
          </div>
          
          <div className="glass-card">
            <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>Standard Resolution (HQ)</h3>
            <img src={thumbnails.hq} alt="HQ Res" style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
            <button className="btn-primary" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: 'white' }} onClick={() => downloadImage(thumbnails.hq, 'hq')}>
              <Download size={18} /> Download Normal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default YouTubeDownloader;
