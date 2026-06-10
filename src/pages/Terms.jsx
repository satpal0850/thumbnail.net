import { motion } from 'framer-motion';

const Terms = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card" 
      style={{ maxWidth: '800px', margin: '2rem auto', padding: '3rem' }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#00f2fe' }}>Terms and Conditions</h1>
      <div style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
        <p>Welcome to ThumbDown. By accessing this website, we assume you accept these terms and conditions. Do not continue to use ThumbDown if you do not agree to all of the terms and conditions stated on this page.</p>
        
        <h3 style={{ color: 'white', marginTop: '1.5rem' }}>1. License and Usage</h3>
        <p>ThumbDown provides a tool to extract and download thumbnails from publicly available YouTube videos. You agree to use this tool only for lawful purposes, such as fair use, education, and personal archiving.</p>
        
        <h3 style={{ color: 'white', marginTop: '1.5rem' }}>2. Copyright Respect</h3>
        <p>The thumbnails downloaded via this site are the property of their respective creators and copyright holders. ThumbDown does not grant you the right to use these thumbnails for commercial purposes or to re-upload them as your own original work. Users are solely responsible for ensuring they have the legal right to use downloaded media.</p>
        
        <h3 style={{ color: 'white', marginTop: '1.5rem' }}>3. Disclaimer</h3>
        <p>The materials on ThumbDown's website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property.</p>

        <h3 style={{ color: 'white', marginTop: '1.5rem' }}>4. Limitations</h3>
        <p>In no event shall ThumbDown or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website.</p>
      </div>
    </motion.div>
  );
};

export default Terms;
