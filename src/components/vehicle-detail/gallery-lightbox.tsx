'use client';

import React, { useState } from 'react';
import { VehicleImage } from '@/types';
import { ChevronLeft, ChevronRight, Maximize2, X, Play } from 'lucide-react';

interface GalleryLightboxProps {
  images: VehicleImage[];
  vehicleName: string;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({ images, vehicleName }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const activeImage = images[activeIndex] || images[0];

  const prevImage = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-4">
      {/* Main Image Stage */}
      <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-2xl group">
        <img
          src={activeImage?.url}
          alt={activeImage?.altText || vehicleName}
          className="w-full h-full object-cover object-center transition-all duration-500"
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/50 hover:bg-black/80 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Video Tour Badge (Optional Video) */}
        <button
          onClick={() => setIsVideoOpen(true)}
          className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 hover:bg-black/90 text-white text-xs font-semibold backdrop-blur-md border border-white/10 transition-colors"
        >
          <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          <span>Cinematic Walkaround Video</span>
        </button>

        {/* Fullscreen Lightbox Button */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute bottom-4 right-4 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
          title="Fullscreen Gallery"
          aria-label="Fullscreen Gallery"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Image Counter */}
        <div className="absolute top-4 right-4 text-xs font-mono bg-black/60 backdrop-blur-md text-zinc-300 px-2.5 py-1 rounded-sm border border-white/10">
          {activeIndex + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails Row */}
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {images.map((img, idx) => (
            <button
              key={img.id || idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative shrink-0 w-24 sm:w-28 aspect-[16/10] rounded-md overflow-hidden border-2 transition-all ${
                activeIndex === idx
                  ? 'border-amber-500 scale-95 shadow-md shadow-amber-500/20'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
            >
              <img src={img.url} alt={img.altText} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-8 backdrop-blur-xl">
          <div className="flex items-center justify-between text-white pb-4">
            <div className="font-bold text-sm tracking-wide">{vehicleName}</div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-full hover:bg-zinc-800 text-zinc-300 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-grow flex items-center justify-center max-h-[75vh]">
            <img
              src={activeImage.url}
              alt={activeImage.altText}
              className="max-h-full max-w-full object-contain rounded-lg shadow-2xl"
            />

            <button
              onClick={prevImage}
              className="absolute left-4 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 p-3 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="text-center text-xs text-zinc-400 font-mono pt-4">
            Viewing image {activeIndex + 1} of {images.length}
          </div>
        </div>
      )}

      {/* Video Tour Modal */}
      {isVideoOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
            <div className="flex items-center justify-between p-4 border-b border-zinc-800 text-white">
              <span className="font-semibold text-sm">Cinematic Walkaround &bull; {vehicleName}</span>
              <button onClick={() => setIsVideoOpen(false)} className="p-1 hover:text-amber-400">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="aspect-video w-full bg-black flex items-center justify-center">
              <iframe
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/g2qF_p3Uv5s?autoplay=1&mute=1"
                title="Vehicle Walkaround"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
