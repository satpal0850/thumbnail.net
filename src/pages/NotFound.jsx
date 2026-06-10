import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '100px 20px', minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Helmet>
        <title>404 - Page Not Found | ThumbDown</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <h1 style={{ fontSize: '6rem', fontWeight: '900', background: 'linear-gradient(135deg, #FF0000 0%, #FF4444 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1rem' }}>
        404
      </h1>
      
      <h2 style={{ color: 'white', fontSize: '2rem', marginBottom: '1.5rem' }}>
        Page Not Found
      </h2>
      
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2.5rem', maxWidth: '500px' }}>
        Oops! The page you are looking for doesn't exist, has been moved, or the language you requested is not supported yet.
      </p>
      
      <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'linear-gradient(135deg, #FF0000 0%, #FF4444 100%)', color: 'white', padding: '1rem 2rem', borderRadius: '12px', textDecoration: 'none', fontWeight: '600', fontSize: '1.1rem', transition: 'transform 0.2s', boxShadow: '0 4px 15px rgba(255,0,0,0.3)' }}>
        <Home size={20} />
        Back to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
