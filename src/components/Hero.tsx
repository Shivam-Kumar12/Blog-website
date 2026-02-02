import React from 'react';

export default function Hero() {
  return (
    <section className="py-12 md:py-20 border-b border-border bg-gradient-to-b from-background to-secondary/20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
          Stay Ahead in <span className="text-primary">Tech</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          The latest insights, tutorials, and news from the world of web development and technology.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <button className="bg-foreground text-background px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
            Latest Articles
          </button>
          <button className="bg-background text-foreground border border-border px-8 py-3 rounded-full font-semibold hover:bg-secondary transition-colors">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
}
