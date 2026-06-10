import { useState } from 'react';
import { Search, Download, Video, ClipboardPaste } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const YouTubeDownloader = () => {
  const { t } = useTranslation();
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
      setError(t('error'));
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
      const isShort = url.toLowerCase().includes('/shorts/');
      
      const tryFetch = async (targetUrl) => {
        const proxies = [
          `https://wsrv.nl/?url=${encodeURIComponent(targetUrl)}`,
          `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`,
          `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(targetUrl)}`
        ];
        for (let proxy of proxies) {
          try {
            const res = await fetch(proxy);
            if (res.ok) {
              const blob = await res.blob();
              // YouTube's 404 gray image is usually under 2KB. 
              // If it's too small, it might be the 404 image.
              if (blob.size > 2000) return blob;
            }
          } catch (e) {
            // Ignore proxy errors and try the next one
          }
        }
        return null;
      };

      let blobData = await tryFetch(imgUrl);

      // If maxres fails (often 404s on older videos), fallback to hqdefault
      if (!blobData && quality === 'maxres') {
        blobData = await tryFetch(imgUrl.replace('maxresdefault.jpg', 'hqdefault.jpg'));
      }

      if (!blobData) {
        alert('Failed to download image securely. The image might not be available.');
        return;
      }

      if (isShort) {
        const objectUrl = window.URL.createObjectURL(blobData);
        const img = new Image();
        
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = objectUrl;
        });
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        const cropWidth = img.height * (9 / 16);
        const sx = (img.width - cropWidth) / 2;
        
        canvas.width = cropWidth;
        canvas.height = img.height;
        ctx.drawImage(img, sx, 0, cropWidth, img.height, 0, 0, cropWidth, img.height);
        
        canvas.toBlob((blob) => {
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = blobUrl;
          link.download = `youtube-short-${quality}.jpg`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(blobUrl);
          window.URL.revokeObjectURL(objectUrl);
        }, 'image/jpeg', 0.95);
      } else {
        // Normal video download
        const blobUrl = window.URL.createObjectURL(blobData);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `youtube-thumbnail-${quality}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
      }
    } catch (err) {
      console.error('Download error', err);
      alert('An error occurred during download. Please try again.');
    }
  };

  const isShortUrl = url.includes('/shorts/');
  const imgStyle = {
    width: '100%',
    borderRadius: '8px',
    marginBottom: '1rem',
    ...(isShortUrl ? { aspectRatio: '9/16', objectFit: 'cover', maxWidth: '350px', margin: '0 auto 1rem', display: 'block' } : {})
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Helmet>
        <title>{t('title')} | YouTube Thumbnail Download</title>
        <meta name="description" content={t('subtitle')} />
        <meta name="keywords" content="youtube thumbnail download, thumbnail download, thumbnail downloader, yt thumbnail downloader, youtube thumbnail downloader" />
      </Helmet>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
          <div style={{ background: 'rgba(255, 0, 0, 0.1)', padding: '1rem', borderRadius: '50%' }}>
            <Video size={48} color="#ff0000" />
          </div>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '1rem' }}>
          {t('title')}
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          {t('subtitle')}
        </p>
      </div>

      <form onSubmit={handleSearch} className="input-group">
        <input
          type="text"
          className="url-input"
          placeholder={t('placeholder')}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="button" className="paste-btn" onClick={handlePaste} title={t('paste')}>
          <ClipboardPaste size={16} /> {t('paste')}
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
            <h3 style={{ marginBottom: '1rem', color: '#00f2fe' }}>{t('maxRes')}</h3>
            <img src={thumbnails.maxres} alt="Max Res" style={imgStyle} />
            <button className="btn-primary" style={{ width: '100%' }} onClick={() => downloadImage(thumbnails.maxres, 'maxres')}>
              <Download size={18} /> {t('originalQuality')}
            </button>
          </div>

          <div className="secondary-results">
            <div className="glass-card">
              <h3 style={{ marginBottom: '1rem', color: '#f8fafc' }}>{t('highRes')}</h3>
              <img src={thumbnails.sd} alt="SD Res" style={imgStyle} />
              <button className="btn-primary" style={{ width: '100%', background: 'rgba(255,255,255,0.1)', color: 'white' }} onClick={() => downloadImage(thumbnails.sd, 'sd')}>
                <Download size={18} /> {t('downloadSD')}
              </button>
            </div>
            
            <div className="glass-card">
              <h3 style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>{t('standardRes')}</h3>
              <img src={thumbnails.hq} alt="HQ Res" style={imgStyle} />
              <button className="btn-primary" style={{ width: '100%', background: 'rgba(255,255,255,0.05)', color: 'white' }} onClick={() => downloadImage(thumbnails.hq, 'hq')}>
                <Download size={18} /> {t('downloadNormal')}
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* SEO Content Section for AdSense */}
      <div className="glass-card" style={{ marginTop: '5rem', padding: '3rem', textAlign: 'left', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
        <h2 style={{ color: 'white', marginBottom: '1.5rem' }}>{t('seoHeading')}</h2>
        <p style={{ marginBottom: '1rem' }}>
          {t('seoP1')}
        </p>
        <p style={{ marginBottom: '1rem' }}>
          {t('seoP2')}
        </p>
        
        <h3 style={{ color: 'white', marginTop: '2rem', marginBottom: '1rem' }}>{t('seoHowToHeading')}</h3>
        <ol style={{ marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
          <li>{t('seoHowTo1')}</li>
          <li>{t('seoHowTo2')}</li>
          <li>{t('seoHowTo3')}</li>
          <li>{t('seoHowTo4')}</li>
          <li>{t('seoHowTo5')}</li>
        </ol>

        <h3 style={{ color: 'white', marginTop: '2rem', marginBottom: '1rem' }}>{t('seoWhyHeading')}</h3>
        <p>
          {t('seoWhyP')}
        </p>
        <p style={{ marginTop: '1rem' }}>
          {t('seoLinkP')}
        </p>
      </div>
    </motion.div>
  );
};

export default YouTubeDownloader;
