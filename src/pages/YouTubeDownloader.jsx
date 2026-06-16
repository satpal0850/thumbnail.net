import { useState } from 'react';
import { Search, Download, Video, ClipboardPaste } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

const otherDownloaders = [
  {
    name: 'TikTok Video Downloader',
    link: 'https://ssstiktok.pinsaver.cloud/',
    desc: 'Download high-quality TikTok videos without watermarks instantly.',
    bgColor: 'rgba(0, 0, 0, 0.6)',
    iconColor: '#00f2fe',
    glowColor: 'rgba(254, 44, 85, 0.4)',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.07-2.89-.52-4.06-1.37-.28-.2-.53-.43-.77-.68v6.46c0 1.93-.65 3.86-1.97 5.23-1.41 1.48-3.52 2.37-5.59 2.37-2.6 0-5.11-1.39-6.38-3.66-1.57-2.73-1.12-6.52 1.13-8.73 1.5-1.48 3.61-2.23 5.72-2.03v4.06c-.84-.11-1.72.12-2.39.65-.89.7-.99 2.05-.22 2.91.68.79 1.87.95 2.74.39.43-.27.69-.73.69-1.24V.02z"/>
      </svg>
    )
  },
  {
    name: 'Instagram Thumbnail Download',
    link: 'https://pinsaver.cloud/instagram-thumbnail-download',
    desc: 'Save post cover images and IG TV thumbnails in original quality.',
    bgColor: 'rgba(225, 48, 108, 0.1)',
    iconColor: '#e1306c',
    glowColor: 'rgba(225, 48, 108, 0.4)',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  },
  {
    name: 'Instagram Video Download',
    link: 'https://pinsaver.cloud/',
    desc: 'Download high-quality Instagram reels and videos in one click.',
    bgColor: 'rgba(225, 48, 108, 0.1)',
    iconColor: '#ff3008',
    glowColor: 'rgba(225, 48, 108, 0.4)',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M23 7a2 2 0 0 0-2.45-1.45L16 7V5a2 2 0 0 0-2-2H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2l4.55 1.45A2 2 0 0 0 23 17V7z"></path>
      </svg>
    )
  },
  {
    name: 'Facebook Video Download',
    link: 'https://pinsaver.cloud/',
    desc: 'Easily download and save Facebook videos to your device gallery.',
    bgColor: 'rgba(24, 119, 242, 0.1)',
    iconColor: '#1877f2',
    glowColor: 'rgba(24, 119, 242, 0.4)',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    )
  },
  {
    name: 'Download Snapchat Videos',
    link: 'https://pinsaver.cloud/',
    desc: 'Save your favorite Snapchat spotlight videos and stories instantly.',
    bgColor: 'rgba(255, 252, 0, 0.1)',
    iconColor: '#eab308',
    glowColor: 'rgba(254, 240, 138, 0.4)',
    icon: (
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M12 2c-3.78 0-6.68 2.66-6.68 6.36 0 2.27.97 3.59 1.63 4.22-.38.16-.76.38-1.12.66-.99.78-1.83 2.12-.89 3.26.47.57 1.4.37 2.16.19.46-.11.94-.23 1.4-.21.49.02.93.19 1.36.36.69.27 1.4.55 2.14.55s1.45-.28 2.14-.55c.43-.17.87-.34 1.36-.36.46-.02.94.1 1.4.21.76.18 1.69.38 2.16-.19.94-1.14.1-2.48-.89-3.26-.36-.28-.74-.5-1.12-.66.66-.63 1.63-1.95 1.63-4.22C18.68 4.66 15.78 2 12 2z"/>
      </svg>
    )
  }
];

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
        <title>{t('title')} | KlickThumb</title>
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

      {/* Quick Downloader Tools Grid */}
      <div className="downloader-tools-section">
        <h2 className="downloader-tools-title">Our Other Downloaders</h2>
        <div className="downloader-tools-grid">
          {otherDownloaders.map((tool, idx) => (
            <a key={idx} href={tool.link} target="_blank" rel="noopener noreferrer" className="downloader-tool-card" style={{ '--hover-glow': tool.glowColor }}>
              <div className="downloader-tool-icon" style={{ background: tool.bgColor, color: tool.iconColor }}>
                {tool.icon}
              </div>
              <h3 className="downloader-tool-name">{tool.name}</h3>
              <p className="downloader-tool-desc">{tool.desc}</p>
            </a>
          ))}
        </div>
      </div>

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
