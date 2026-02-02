'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { BlogPost } from '../data/blogData';

interface ArticleModalProps {
  post: BlogPost | null;
  onClose: () => void;
}

const getArticleSchema = (post: BlogPost) => ({
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.description,
  image: post.image,
  datePublished: post.date,
  author: {
    '@type': 'Person',
    name: 'John Doe',
  },
});

export default function ArticleModal({ post, onClose }: ArticleModalProps) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    if (post) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [post, onClose]);

  if (!post) return null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getArticleSchema(post)),
        }}
      />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
        onClick={onClose}
      >
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity" />

        <div
          className="relative bg-card w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-border"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 bg-background/50 backdrop-blur-md rounded-full hover:bg-secondary transition-colors"
            aria-label="Close modal"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l18 18"
              />
            </svg>
          </button>

          <div className="aspect-[21/9] w-full relative">
            <img
              src={post.image}
              alt={`Featured image for ${post.title} - ${post.category} article`}
              className="object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
              <span className="bg-primary text-primary-foreground px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mb-4">
                {post.category}
              </span>
            </div>
          </div>

          <div className="p-8 sm:p-12">
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
              <time className="font-medium">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span className="w-1.5 h-1.5 rounded-full bg-border" />
              <span className="font-medium">8 min read</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 leading-tight">
              {post.title}
            </h2>

            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground leading-relaxed space-y-6">
              <p className="text-xl font-medium text-foreground italic border-l-4 border-primary pl-6 py-2">
                {post.description}
              </p>
              {post.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-12 pt-8 border-t border-border flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center font-bold">JD</div>
                <div>
                  <p className="text-sm font-bold">John Doe</p>
                  <p className="text-xs text-muted-foreground">Technical Writer</p>
                </div>
              </div>
              <button className="text-sm font-bold hover:text-primary transition-colors">Share Article</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
