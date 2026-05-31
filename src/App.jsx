import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { DownloadCloud } from 'lucide-react';
import YouTubeDownloader from './pages/YouTubeDownloader';

function App() {
  return (
    <Router>
      <div className="container">
        <nav className="navbar">
          <Link to="/" className="logo">
            <DownloadCloud className="gradient-text" size={32} />
            <span>Thumb<span className="gradient-text">Down</span></span>
          </Link>
        </nav>
        
        <Routes>
          <Route path="/" element={<YouTubeDownloader />} />
        </Routes>
        
        <footer>
          <p>© {new Date().getFullYear()} ThumbDown. Professional YouTube Thumbnail Downloader.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
