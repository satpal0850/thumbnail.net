import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const About = () => {
  return (
    <>
    <Helmet>
      <title>About Us | Youtube Thumbnail Download</title>
      <meta name="description" content="Learn about Youtube Thumbnail Download, your reliable yt thumbnail downloader." />
      <meta name="keywords" content="youtube thumbnail download, thumbnail download, thumbnail downloader, yt thumbnail downloader, youtube thumbnail downloader" />
      <link rel="canonical" href="https://youtube-thumbnail-download.pinsaver.cloud/about" />
      <meta name="robots" content="index, follow" />
    </Helmet>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card" 
      style={{ maxWidth: '800px', margin: '2rem auto', padding: '3rem', textAlign: 'center' }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#00f2fe' }}>About Us</h1>
      <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)', textAlign: 'left' }}>
        <p>Welcome to <strong>Youtube Thumbnail Download</strong>, your number one source for performing a fast and free <Link to="/" style={{color: '#00f2fe', textDecoration: 'none'}}>youtube thumbnail download</Link> instantly and securely.</p>
        <p style={{ marginTop: '1rem' }}>We're dedicated to providing you the very best experience, with an emphasis on speed, original HD quality, and user-friendly design. We understand how important visual assets are for content creators, marketers, educators, and fans alike. That's why we built a tool that bypasses the friction and gives you the exact image you need in seconds.</p>
        <p style={{ marginTop: '1rem' }}>Founded in 2024, Youtube Thumbnail Download was created to solve a simple problem: the lack of a clean, fast, and ad-spam-free way to grab thumbnails for reference, analysis, and fair-use creation. We have continually optimized our platform to ensure the fastest extraction times on the web.</p>
        <p style={{ marginTop: '1rem' }}>We hope you enjoy our tool as much as we enjoy offering it to you. If you have any questions or comments, please don't hesitate to contact us.</p>
      </div>
    </motion.div>
    </>
  );
};

export default About;
