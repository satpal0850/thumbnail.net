import { useState } from 'react';
import { Search, Download, Video, ClipboardPaste } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const YouTubeDownloader = () => {
  const [url, setUrl] = useState('');
  const [thumbnails, setThumbnails] = useState(null);
  const [error, setError] = useState('');

  const extractVideoId = (link) => {
    const regex = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/;
    const match = link.match(regex);
    return match ? match[1] : null;
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch (err) {
      console.error('Failed to read clipboard', err);
    }
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
      window.open(imgUrl, '_blank');
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
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
          Paste a YouTube Video or Shorts link below to download the thumbnail in Orignal 4K quality.
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
        <button type="button" className="paste-btn" onClick={handlePaste} title="Paste from clipboard">
          <ClipboardPaste size={16} /> Paste
        </button>
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
        <motion.div 
          className="results-layout"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="glass-card primary-result">
            <h3 style={{ marginBottom: '1rem', color: '#00f2fe' }}>Maximum Resolution</h3>
            <img src={thumbnails.maxres} alt="Max Res" style={{ width: '100%', borderRadius: '8px', marginBottom: '1rem' }} />
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => downloadImage(thumbnails.maxres, 'maxres')}>
              <Download size={18} /> Original Quality
            </button>
          </div>

          <div className="secondary-results">
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
        </motion.div>
      )}

      {/* SEO Content Section for AdSense */}
      <div className="glass-card" style={{ marginTop: '5rem', padding: '3rem', textAlign: 'left', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
        <h2 style={{ color: 'white', marginBottom: '1.5rem' }}>Free HD YouTube Thumbnail Downloader</h2>
        <p style={{ marginBottom: '1rem' }}>
          Welcome to the best <strong>youtube thumbnail downloader</strong> on the internet. Whether you are a content creator looking to analyze your competitors, a designer searching for inspiration, or someone who simply needs to save a cover image for a presentation, our tool makes <strong>youtube thumbnail download</strong> fast, easy, and completely free.
        </p>
        <p style={{ marginBottom: '1rem' }}>
          Using our <strong>yt thumbnail downloader</strong>, you can extract images from any YouTube video or Short in seconds. We provide multiple resolution options, ensuring you get the crispest image possible. Simply copy the video link, paste it into our search bar, and let our <strong>thumbnail downloader</strong> do the heavy lifting.
        </p>
        
        <h3 style={{ color: 'white', marginTop: '2rem', marginBottom: '1rem' }}>How to do a Thumbnail Download</h3>
        <ol style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
          <li>Open the YouTube app or website and find the video whose thumbnail you want.</li>
          <li>Click the "Share" button and select "Copy Link".</li>
          <li>Return to our <strong>youtube thumbnail downloader</strong> page.</li>
          <li>Paste the link into the input box and hit the search icon.</li>
          <li>Click "Original Quality" to complete your <strong>thumbnail download</strong>.</li>
        </ol>

        <h3 style={{ color: 'white', marginTop: '2rem', marginBottom: '1rem' }}>Why use a YT Thumbnail Downloader?</h3>
        <p>
          High-quality thumbnails are the backbone of a successful video strategy. By using a reliable <strong>yt thumbnail downloader</strong>, you can study the text placement, color theory, and facial expressions used by top creators in your niche. All downloads are executed securely in your browser without the need to install any shady extensions or software.
        </p>
        <p style={{ marginTop: '1rem' }}>
          Want to learn more about optimizing your videos? Check out our <Link to="/blog/ultimate-guide-youtube-thumbnail-sizes" style={{color: '#00f2fe', textDecoration: 'none'}}>Ultimate Guide to YouTube Thumbnail Sizes</Link> or discover <Link to="/blog" style={{color: '#00f2fe', textDecoration: 'none'}}>more YouTube SEO tips in our blog</Link> to help your channel grow faster!
        </p>
      </div>
    </motion.div>
  );
};

export default YouTubeDownloader;
