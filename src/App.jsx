import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { DownloadCloud, BookOpen } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import YouTubeDownloader from './pages/YouTubeDownloader';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import About from './pages/About';
import Contact from './pages/Contact';
import BlogList from './pages/BlogList';
import BlogPost from './pages/BlogPost';

export const validLangs = ['en', 'es', 'hi', 'ko', 'sl', 'pt', 'et', 'zh-TW', 'lt', 'sr', 'nl', 'cs', 'vi', 'uz', 'bg', 'ca', 'id', 'pl', 'it', 'ar'];

const AppLayout = ({ lang }) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    i18n.changeLanguage(lang);
    document.documentElement.lang = lang;
  }, [lang, i18n]);

  const prefix = lang === 'en' ? '' : `/${lang}`;
  
  const handleLangChange = (e) => {
    const newLang = e.target.value;
    let pathWithoutLang = location.pathname;
    if (lang !== 'en') {
      pathWithoutLang = location.pathname.replace(new RegExp(`^/${lang}`), '') || '/';
    }
    const newPrefix = newLang === 'en' ? '' : `/${newLang}`;
    const newPath = `${newPrefix}${pathWithoutLang === '/' ? '' : pathWithoutLang}` || '/';
    navigate(newPath);
  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <nav className="navbar">
        <Link to={`${prefix}/`} className="logo">
          <DownloadCloud className="gradient-text" size={32} />
          <span>Thumb<span className="gradient-text">Down</span></span>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <select value={lang} onChange={handleLangChange} style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid var(--border-color)', cursor: 'pointer', outline: 'none' }}>
            {validLangs.map(l => <option key={l} value={l} style={{color: 'black'}}>{l.toUpperCase()}</option>)}
          </select>
          <Link to={`${prefix}/blog`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
            <BookOpen size={20} /> Blog
          </Link>
        </div>
      </nav>
      
      <main style={{ flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<YouTubeDownloader />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      
      <footer style={{ marginTop: '4rem', padding: '3rem 0', borderTop: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '2rem', marginBottom: '2rem' }}>
          <div style={{ flex: '1 1 300px' }}>
            <Link to={`${prefix}/`} className="logo" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
              <DownloadCloud className="gradient-text" size={24} />
              <span style={{ fontSize: '1.2rem' }}>Thumb<span className="gradient-text">Down</span></span>
            </Link>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.6' }}>
              The fastest, easiest way to download high-quality YouTube thumbnails for free. No watermarks, no sign-ups required.
            </p>
          </div>
          
          <div style={{ flex: '1 1 200px' }}>
            <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.1rem' }}>Legal</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to={`${prefix}/privacy-policy`} style={{ color: 'var(--text-secondary)' }}>Privacy Policy</Link></li>
              <li><Link to={`${prefix}/terms`} style={{ color: 'var(--text-secondary)' }}>Terms & Conditions</Link></li>
            </ul>
          </div>

          <div style={{ flex: '1 1 200px' }}>
            <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.1rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to={`${prefix}/about`} style={{ color: 'var(--text-secondary)' }}>About Us</Link></li>
              <li><Link to={`${prefix}/contact`} style={{ color: 'var(--text-secondary)' }}>Contact Us</Link></li>
              <li><Link to={`${prefix}/blog`} style={{ color: 'var(--text-secondary)' }}>Blog & Resources</Link></li>
            </ul>
          </div>
        </div>
        
        <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
          <p>© {new Date().getFullYear()} ThumbDown. Professional YouTube Thumbnail Downloader.</p>
        </div>
      </footer>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {validLangs.filter(l => l !== 'en').map(lang => (
          <Route key={lang} path={`/${lang}/*`} element={<AppLayout lang={lang} />} />
        ))}
        <Route path="/*" element={<AppLayout lang="en" />} />
      </Routes>
    </Router>
  );
}

export default App;
