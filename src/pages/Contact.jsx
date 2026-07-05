import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Mail, MessageSquare } from 'lucide-react';

const Contact = () => {
  return (
    <>
    <Helmet>
      <title>Contact Us | Youtube Thumbnail Download</title>
      <meta name="description" content="Contact Youtube Thumbnail Download for any inquiries regarding our youtube thumbnail downloader." />
      <meta name="keywords" content="youtube thumbnail download, thumbnail download, thumbnail downloader, yt thumbnail downloader, youtube thumbnail downloader" />
      <link rel="canonical" href="https://youtube-thumbnail-download.pinsaver.cloud/contact" />
      <meta name="robots" content="index, follow" />
    </Helmet>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card" 
      style={{ maxWidth: '800px', margin: '2rem auto', padding: '3rem', textAlign: 'center' }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#00f2fe' }}>Contact Us</h1>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Have questions, feedback, or need support? We'd love to hear from you.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '500px', margin: '0 auto' }}>
        <a 
          href="mailto:contact@yourdomain.com" 
          className="btn-primary" 
          style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '1rem', padding: '1rem' }}
        >
          <Mail size={24} />
          Email Support
        </a>
        
        <div style={{ background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '12px', marginTop: '2rem' }}>
          <MessageSquare size={40} color="#00f2fe" style={{ marginBottom: '1rem' }} />
          <h3 style={{ color: 'white', marginBottom: '0.5rem' }}>Business Inquiries</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            For advertising, partnerships, or bulk API requests, please email us directly with the subject line "Partnership".
          </p>
        </div>
      </div>
    </motion.div>
    </>
  );
};

export default Contact;
