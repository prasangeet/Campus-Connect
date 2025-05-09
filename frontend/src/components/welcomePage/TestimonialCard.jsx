'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function TestimonialCard({ quote, name, role, image, delay = 0 }) {
  return (
    <motion.div 
      className="bg-card rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-border"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="relative mb-6">
        <div className="absolute -top-3 -left-3 text-4xl text-primary opacity-30">"</div>
        <p className="italic relative z-10">{quote}</p>
        <div className="absolute -bottom-3 -right-3 text-4xl text-primary opacity-30">"</div>
      </div>
      
      <div className="flex items-center">
        <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4 border-2 border-primary">
          <img 
            src={image} 
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </motion.div>
  );
}