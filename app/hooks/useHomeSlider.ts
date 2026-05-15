"use client";

import { useState, useEffect, useCallback } from "react";

interface SpaceSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  sector: string;
}

export function useHomeSlider(slides: SpaceSlide[], intervalDuration: number = 6000) {
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const setSlide = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, intervalDuration);
    return () => clearInterval(timer);
  }, [nextSlide, intervalDuration]);

  return {
    currentSlide,
    nextSlide,
    prevSlide,
    setSlide,
    activeSlide: slides[currentSlide],
  };
}