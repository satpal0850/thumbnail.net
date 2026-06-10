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
import NotFound from './pages/NotFound';

export const validLangs = ['en', 'es', 'hi', 'ko', 'sl', 'pt', 'et', 'zh-TW', 'lt', 'sr', 'nl', 'cs', 'vi', 'uz', 'bg', 'ca', 'id', 'pl', 'it', 'ar'];

const AppLayout = ({ lang, children }) => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  
  // If we're not on the homepage, force language to English in the UI
  const isHomepage = location.pathname === '/' || validLangs.some(l => location.pathname === `/${l}` || location.pathname === `/${l}/`);
  const effectiveLang = isHomepage ? lang : 'en';
  
  useEffect(() => {
    i18n.changeLanguage(effectiveLang);
    document.documentElement.lang = effectiveLang;
  }, [effectiveLang, i18n]);

  const prefix = effectiveLang === 'en' ? '' : `/${effectiveLang}`;
  
  const handleLangChange = (e) => {
    const newLang = e.target.value;
    const newPrefix = newLang === 'en' ? '' : `/${newLang}`;
    // Always navigate back to the translated homepage if they change language, 
    // because other pages do not support translation.
    navigate(newPrefix || '/');
  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <nav className="navbar">
        <Link to={`${prefix}/`} className="logo">
          <DownloadCloud className="gradient-text" size={32} />
          <span>Thumb<span className="gradient-text">Down</span></span>
        </Link>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          {/* Only show language dropdown on the homepage */}
          {isHomepage && (
            <select value={effectiveLang} onChange={handleLangChange} style={{ padding: '0.5rem', borderRadius: '8px', background: 'rgba(255,255,255,0.1)', color: 'white', border: '1px solid var(--border-color)', cursor: 'pointer', outline: 'none' }}>
              {validLangs.map(l => <option key={l} value={l} style={{color: 'black'}}>{l.toUpperCase()}</option>)}
            </select>
          )}
          <Link to={`/blog`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600' }}>
            <BookOpen size={20} /> Blog
          </Link>
        </div>
      </nav>
      
      <main style={{ flexGrow: 1 }}>
        {children}
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
              <li><Link to={`/privacy-policy`} style={{ color: 'var(--text-secondary)' }}>Privacy Policy</Link></li>
              <li><Link to={`/terms`} style={{ color: 'var(--text-secondary)' }}>Terms & Conditions</Link></li>
            </ul>
          </div>

          <div style={{ flex: '1 1 200px' }}>
            <h4 style={{ color: 'white', marginBottom: '1rem', fontSize: '1.1rem' }}>Company</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <li><Link to={`/about`} style={{ color: 'var(--text-secondary)' }}>About Us</Link></li>
              <li><Link to={`/contact`} style={{ color: 'var(--text-secondary)' }}>Contact Us</Link></li>
              <li><Link to={`/blog`} style={{ color: 'var(--text-secondary)' }}>Blog & Resources</Link></li>
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
          <Route key={lang} path={`/${lang}`} element={<AppLayout lang={lang}><YouTubeDownloader /></AppLayout>} />
        ))}
        <Route path="/" element={<AppLayout lang="en"><YouTubeDownloader /></AppLayout>} />
        
        {/* Other pages (English only) */}
        <Route path="/blog" element={<AppLayout lang="en"><BlogList /></AppLayout>} />
        <Route path="/blog/:id" element={<AppLayout lang="en"><BlogPost /></AppLayout>} />
        <Route path="/privacy-policy" element={<AppLayout lang="en"><Privacy /></AppLayout>} />
        <Route path="/terms" element={<AppLayout lang="en"><Terms /></AppLayout>} />
        <Route path="/about" element={<AppLayout lang="en"><About /></AppLayout>} />
        <Route path="/contact" element={<AppLayout lang="en"><Contact /></AppLayout>} />
        
        {/* Fallback for undefined routes */}
        <Route path="/*" element={<AppLayout lang="en"><NotFound /></AppLayout>} />
      </Routes>
    </Router>
  );
}

export default App;
