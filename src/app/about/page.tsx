import { Button } from "@/components/ui/button";
import { CheckCircle2, Award, History, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-transparent text-black selection:bg-primary selection:text-white pb-20">

            {/* Header */}
            <div className="container-custom mb-20 text-center">
                <span className="text-primary text-sm font-bold tracking-[0.3em] uppercase mb-4 block">Since 2023</span>
                <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-8">
                    Standard of <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] to-[#b38728]">Excellence</span>
                </h1>
                <p className="text-black/50 text-xl max-w-2xl mx-auto leading-relaxed font-light">
                    Hakimi Industrial Products stands at the forefront of storage innovation, delivering premium plastic solutions that define durability and efficiency.
                </p>
            </div>

            <div className="container-custom">
                {/* Mission Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-32">
                    <div className="relative aspect-square border-none bg-transparent flex items-center justify-center p-8">
                        <div className="relative h-full w-full">
                            <Image
                                src="/images/logo.jpg"
                                alt="Hakimi Industrial Products Logo"
                                fill
                                className="object-contain drop-shadow-2xl"
                            />
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4 uppercase tracking-wide">Our Mission</h2>
                            <p className="text-black/60 leading-relaxed text-lg font-light">
                                To revolutionize industrial organization by providing high-grade virgin plastic crates, dustbins, and pallets that withstand the rigors of modern logistics while maintaining an aesthetic of professional elegance.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-8 border-t border-black/10 pt-8">
                            {[
                                { label: "Premium Materials", val: "100% Virgin" },
                                { label: "Clients Served", val: "500+" },
                                { label: "Product Range", val: "200+" },
                                { label: "Delivery", val: "Pan India" },
                            ].map((stat, i) => (
                                <div key={i}>
                                    <div className="text-3xl font-bold text-black mb-1">{stat.val}</div>
                                    <div className="text-xs text-primary uppercase tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </div>

                        <Link href="/contact">
                            <Button className="h-14 px-8 bg-black text-white hover:bg-primary hover:text-black font-bold uppercase tracking-widest rounded-none mt-4 transition-all">
                                Partner With Us
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Why Choose Us */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {[
                        { icon: Award, title: "Industry Standard", desc: "Setting benchmarks in quality since inception." },
                        { icon: History, title: "Legacy of Trust", desc: "Built on decades of business integrity." },
                        { icon: Users, title: "Client Centric", desc: "Tailored solutions for every unique requirement." },
                    ].map((item, i) => (
                        <div key={i} className="p-8 border border-black/10 bg-black/[0.02] hover:bg-black/[0.05] transition-colors group">
                            <item.icon className="size-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xl font-bold uppercase tracking-wide mb-4">{item.title}</h3>
                            <p className="text-black/50 leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* Showroom Location */}
                <div className="bg-white text-black p-12 md:p-20 text-center relative overflow-hidden border-t border-black/5">
                    <div className="relative z-10">
                        <h2 className="text-4xl font-bold mb-6 uppercase tracking-tighter">Visit Us</h2>
                        <address className="not-italic text-black/60 text-lg mb-10 max-w-md mx-auto">
                            Plot no 8, Flat no 101, Bohra Tulip,<br />
                            RTC Colony, Trimulgherry,<br />
                            Secunderabad - 500015
                        </address>
                        <div className="flex justify-center gap-6">
                            <a href="tel:+919885721611">
                                <Button variant="outline" className="h-12 px-8 uppercase tracking-widest font-bold rounded-none border-black text-black hover:bg-secondary hover:text-white">Call Now</Button>
                            </a>
                            <a href="https://maps.google.com/?q=Hakimi+Industrial+Products+Secunderabad" target="_blank" rel="noopener noreferrer">
                                <Button className="h-12 px-8 uppercase tracking-widest font-bold rounded-none shadow-md">Get Directions</Button>
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
