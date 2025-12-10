"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, Phone, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Categories", href: "/categories" },
        { name: "Products", href: "/products" },
        { name: "Brands", href: "/brands" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            <motion.header
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-[#5D4037]/95 backdrop-blur-lg shadow-lg border-b border-white/5 py-4" : "bg-transparent py-6"
                    }`}
            >
                <div className="container-custom flex items-center justify-between">
                    <Link href="/" className="group flex items-center gap-2">
                        <div className="size-10 bg-gradient-to-br from-primary to-yellow-600 rounded-sm flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-primary/20">
                            H
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold tracking-wider uppercase text-black leading-none group-hover:text-primary transition-colors">
                                Hakimi
                            </span>
                            <span className="text-[0.65rem] font-medium tracking-[0.2em] text-black/60 uppercase leading-none">
                                Industrial Products
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-bold uppercase tracking-widest transition-colors relative group ${scrolled ? 'text-white/90 hover:text-primary' : 'text-black hover:text-[#5D4037]'}`}
                            >
                                {link.name}
                                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-300" />
                            </Link>
                        ))}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <a href="tel:+919885721611" className="text-black/60 hover:text-black transition-colors">
                            <span className="sr-only">Call</span>
                            <Phone className="size-5" />
                        </a>
                        <Link href="/products">
                            <Button className="font-bold rounded-none px-6 uppercase tracking-wider transition-all duration-300 bg-white text-[#5D4037] hover:bg-primary hover:text-white shadow-md">
                                Products
                            </Button>
                        </Link>
                    </div>

                    {/* Mobile Toggle */}
                    <button
                        className="md:hidden text-black hover:text-primary transition-colors"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <Menu className="size-8" />
                    </button>
                </div>
            </motion.header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-[#5D4037]/98 backdrop-blur-xl flex flex-col justify-center items-center text-white"
                    >
                        <button
                            onClick={() => setMobileMenuOpen(false)}
                            className="absolute top-8 right-8 text-white/50 hover:text-primary"
                        >
                            <X className="size-10" />
                        </button>

                        <div className="flex flex-col items-center gap-8">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-3xl font-bold text-white uppercase tracking-widest hover:text-primary transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </motion.div>
                            ))}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.4 }}
                                className="mt-8"
                            >
                                <Link href="/products" onClick={() => setMobileMenuOpen(false)}>
                                    <Button size="lg" className="bg-primary text-black font-bold text-xl px-8 rounded-none">
                                        View Catalog
                                    </Button>
                                </Link>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
