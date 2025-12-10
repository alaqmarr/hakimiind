import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, Phone, Instagram, Facebook, Linkedin, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="bg-[#5D4037] border-t border-white/10 text-white pt-20 pb-10">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">

                    {/* Brand */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold uppercase tracking-tighter">
                            Hakimi <span className="text-primary">Ind.</span>
                        </h3>
                        <p className="text-white/60 leading-relaxed max-w-xs">
                            Premium industrial storage solutions engineered for durability and efficiency.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest mb-6 text-primary">Explore</h4>
                        <ul className="space-y-4 text-sm text-white/60">
                            {['Home', 'Products', 'Brands', 'About Us', 'Contact'].map((item) => (
                                <li key={item}>
                                    <Link href={`/${item.toLowerCase().replace(' ', '') === 'home' ? '' : item.toLowerCase().replace(' ', '')}`} className="hover:text-primary transition-colors flex items-center gap-2">
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest mb-6 text-primary">Products</h4>
                        <ul className="space-y-4 text-sm text-white/60">
                            {[
                                { name: 'Dustbins', href: '/products?category=dustbins' },
                                { name: 'Crates', href: '/products?category=crates' },
                                { name: 'Pallets', href: '/products?category=pallets' },
                                { name: 'Ice Boxes', href: '/products?category=iceboxes' }
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-white/60 hover:text-primary hover:pl-2 transition-all duration-300 block">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest mb-6 text-primary">Contact</h4>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li className="flex items-start gap-3">
                                <MapPin className="size-5 text-primary shrink-0" />
                                <span>
                                    Plot no 8, Flat no 101, Bohra Tulip,<br />
                                    RTC Colony, Trimulgherry,<br />
                                    Secunderabad - 500015
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="size-5 text-primary shrink-0" />
                                <a href="tel:+919885721611" className="hover:text-white">+91 9885721611</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="size-5 text-primary shrink-0" />
                                <a href="mailto:hipsecbad@yahoo.com" className="hover:text-white">hipsecbad@yahoo.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-white/30 uppercase tracking-widest">
                        © {new Date().getFullYear()} Hakimi Industrial Products. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        {[Facebook, Instagram, Linkedin].map((Icon, i) => (
                            <a key={i} href="#" className="bg-white/10 hover:bg-primary hover:text-black p-2 rounded-full transition-all text-white">
                                <Icon className="size-4" />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
