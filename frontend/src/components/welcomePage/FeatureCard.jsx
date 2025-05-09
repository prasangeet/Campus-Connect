'use client';

import { motion } from 'framer-motion';

export default function FeatureCard({ icon, title, description, delay = 0 }) {
  return (
    <motion.div 
      className="bg-card hover:bg-card/80 shadow-sm hover:shadow-md rounded-lg p-6 transition-all duration-300 border border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  );
}