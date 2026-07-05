import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';

const Privacy = () => {
  return (
    <>
    <Helmet>
      <title>Privacy Policy | Youtube Thumbnail Download</title>
      <meta name="description" content="Privacy Policy for Youtube Thumbnail Download, a free youtube thumbnail downloader." />
      <meta name="keywords" content="youtube thumbnail download, thumbnail download, thumbnail downloader, yt thumbnail downloader, youtube thumbnail downloader" />
    </Helmet>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card" 
      style={{ maxWidth: '800px', margin: '2rem auto', padding: '3rem' }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#00f2fe' }}>Privacy Policy</h1>
      <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
        <p>Effective Date: June 10, 2024</p>
        <h3 style={{ color: 'white', marginTop: '1.5rem' }}>1. Information We Collect</h3>
        <p>At Youtube Thumbnail Download, we do not require you to create an account, and we do not collect personal identifiable information (PII) such as your name, address, or phone number simply for using our core downloader tool. All URL processing is done transparently.</p>
        
        <h3 style={{ color: 'white', marginTop: '1.5rem' }}>2. Cookies and Tracking</h3>
        <p>We use third-party services, such as Google AdSense and Google Analytics, to provide advertisements and analyze website traffic. These third parties may use cookies, web beacons, and similar technologies to collect or receive information from your website and elsewhere on the internet and use that information to provide measurement services and target ads.</p>
        
        <h3 style={{ color: 'white', marginTop: '1.5rem' }}>3. How We Use Information</h3>
        <p>Any non-personal information collected is used strictly to improve the functionality of our website, monitor performance, and provide relevant advertising. We do not sell or share your data with unauthorized third parties.</p>

        <h3 style={{ color: 'white', marginTop: '1.5rem' }}>4. Changes to This Policy</h3>
        <p>We may update this Privacy Policy from time to time. Any changes will be posted on this page.</p>

        <p style={{ marginTop: '2rem' }}>If you have any questions, please contact us via the Contact Us page.</p>
      </div>
    </motion.div>
    </>
  );
};

export default Privacy;
