import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { blogs } from '../data/blogs';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';

const BlogPost = () => {
  const { id } = useParams();
  const blog = blogs.find(b => b.id === id);

  if (!blog) {
    return (
      <div style={{ textAlign: 'center', marginTop: '4rem' }}>
        <h2 style={{ color: 'white' }}>Article not found</h2>
        <Link to="/blog" className="btn-primary" style={{ marginTop: '2rem' }}>Back to Blog</Link>
      </div>
    );
  }

  return (
    <>
    <Helmet>
      <title>{blog.title} | YouTube Thumbnail Download</title>
      <meta name="description" content={`Read about ${blog.title} and discover how to optimize with a youtube thumbnail downloader.`} />
      <meta name="keywords" content="youtube thumbnail download, thumbnail download, thumbnail downloader, yt thumbnail downloader, youtube thumbnail downloader" />
    </Helmet>
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="glass-card" 
      style={{ maxWidth: '800px', margin: '2rem auto', padding: '3rem' }}
    >
      <Link to="/blog" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: '#00f2fe', marginBottom: '2rem', fontWeight: 'bold' }}>
        <ArrowLeft size={20} /> Back to all articles
      </Link>
      
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'white', lineHeight: '1.2' }}>{blog.title}</h1>
      <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', marginBottom: '3rem', fontSize: '0.9rem' }}>
        <span>{blog.date}</span>
        <span>•</span>
        <span>{blog.readTime}</span>
      </div>

      <div 
        style={{ lineHeight: '1.8', color: 'var(--text-primary)', fontSize: '1.1rem' }}
        dangerouslySetInnerHTML={{ __html: blog.content }} 
      />
    </motion.div>
    </>
  );
};

export default BlogPost;
