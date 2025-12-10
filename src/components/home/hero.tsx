"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        id: 1,
        image: "/images/carousel-1.png",
        title: "Industrial Storage",
        subtitle: "Redefined.",
        description: "Premium graded plastic solutions for modern warehousing and logistics."
    },
    {
        id: 2,
        image: "/images/carousel-2.png",
        title: "Efficiency in",
        subtitle: "Motion.",
        description: "Durable crates and bins engineered for maximum operational throughput."
    }
];

export function Hero() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () => setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));

    return (
        <section className="relative h-screen min-h-[600px] w-full overflow-hidden bg-black">
            <AnimatePresence initial={false}>
                <motion.div
                    key={current}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slides[current].image})` }}
                    />
                    <div className="absolute inset-0 bg-black/40" />
                </motion.div>
            </AnimatePresence>

            {/* Content Overlay - Ensure z-index is higher */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center container-custom pt-20">
                <motion.div
                    key={`text-${current}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="max-w-4xl mx-auto space-y-8"
                >
                    <div className="inline-block border border-white/20 bg-white/5 backdrop-blur-sm px-6 py-2">
                        <span className="text-primary tracking-[0.3em] text-xs md:text-sm font-bold uppercase">
                            Premium Industrial Solutions
                        </span>
                    </div>

                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold uppercase tracking-tighter text-white leading-[0.9]">
                        {slides[current].title} <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728]">
                            {slides[current].subtitle}
                        </span>
                    </h1>

                    <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed">
                        {slides[current].description}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8 mx-auto w-full">
                        <Link href="/products">
                            <Button size="lg" className="h-14 px-8 text-lg uppercase tracking-widest rounded-none shadow-lg w-full sm:w-auto">
                                View Products
                            </Button>
                        </Link>
                        <Link href="/contact">
                            <Button variant="outline" size="lg" className="h-14 px-8 text-lg uppercase tracking-widest rounded-none backdrop-blur-md w-full sm:w-auto border-white/30 text-white hover:bg-primary hover:text-black">
                                Contact Us <ArrowRight className="ml-2 size-5" />
                            </Button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Controls */}
            <div className="absolute bottom-12 right-12 flex gap-4 z-20 hidden md:flex">
                <button onClick={prevSlide} className="size-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-black hover:border-primary transition-all">
                    <ChevronLeft className="size-6" />
                </button>
                <button onClick={nextSlide} className="size-12 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-primary hover:text-black hover:border-primary transition-all">
                    <ChevronRight className="size-6" />
                </button>
            </div>

            {/* Indicators */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrent(index)}
                        className={`h-1 transition-all duration-500 ${current === index ? "w-12 bg-primary" : "w-6 bg-white/30 hover:bg-white/50"}`}
                    />
                ))}
            </div>
        </section>
    );
}
