import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';
import { BookOpen } from 'lucide-react';

const BlogList = () => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{ animation: 'fadeIn 0.5s ease-in-out' }}
    >
      <div style={{ textAlign: 'center', marginBottom: '4rem', marginTop: '2rem' }}>
        <h1 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem' }}>
          Creator <span className="gradient-text">Resources</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
          Learn the secrets to YouTube growth, SEO, and thumbnail optimization from our detailed guides.
        </p>
      </div>

      <div className="tools-grid">
        {blogs.map((blog, index) => (
          <motion.div 
            key={blog.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/blog/${blog.id}`} className="glass-card" style={{ display: 'flex', flexDirection: 'column', gap: '1rem', height: '100%' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
                <BookOpen size={24} color="#00f2fe" />
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{blog.readTime}</span>
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'white', flexGrow: 1 }}>{blog.title}</h3>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '1rem' }}>
                Published on {blog.date}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default BlogList;
