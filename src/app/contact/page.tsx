"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Send, Loader2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setStatus("idle");

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData);

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) throw new Error("Failed to send message");

            setStatus("success");
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error(error);
            setStatus("error");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-transparent text-black pb-20">
            <div className="container-custom max-w-6xl">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    {/* Info Side */}
                    <div className="space-y-12">
                        <div className="p-8 bg-white/50 backdrop-blur-sm border border-black/5">
                            <h4 className="text-primary text-sm font-bold tracking-[0.3em] uppercase mb-4">Get in Touch</h4>
                            <h1 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-8 leading-none text-black">
                                Let's Save & <br /> Store <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] to-[#5D4037]">Smarter.</span>
                            </h1>
                            <p className="text-black/60 text-lg leading-relaxed max-w-md">
                                Whether you need a custom quote for bulk orders or have questions about our premium range, our team is here to assist.
                            </p>
                        </div>

                        <div className="space-y-8">
                            {[
                                { icon: MapPin, title: "Visit Us", content: "Plot no 8, Flat no 101, Bohra Tulip, RTC Colony, Trimulgherry, Secunderabad - 500015" },
                                { icon: Phone, title: "Call Us", content: "+91 9885721611, +91 9885797890", href: "tel:+919885721611" },
                                { icon: Mail, title: "Email Us", content: "hipsecbad@yahoo.com", href: "mailto:hipsecbad@yahoo.com" },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-6 group bg-[#F5F5F4] p-6 border border-black/5 hover:border-primary/30 transition-all">
                                    <div className="size-12 border border-black/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all bg-white">
                                        <item.icon className="size-5" />
                                    </div>
                                    <div>
                                        <h5 className="font-bold uppercase tracking-wider mb-2 text-sm">{item.title}</h5>
                                        {item.href ? (
                                            <a href={item.href} className="text-black/60 hover:text-black transition-colors">{item.content}</a>
                                        ) : (
                                            <p className="text-black/60 leading-relaxed max-w-xs">{item.content}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form Side */}
                    <div className="bg-white border border-black/5 p-8 md:p-12 shadow-xl shadow-black/5">
                        <h3 className="text-2xl font-bold uppercase tracking-wide mb-8">Send Message</h3>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-black/40">Name</label>
                                    <Input name="name" placeholder="JOHN DOE" required className="bg-black/5 border-black/10 h-12 text-black placeholder:text-black/20 rounded-none focus:border-primary" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs uppercase tracking-widest text-black/40">Phone</label>
                                    <Input name="phone" placeholder="+91..." className="bg-black/5 border-black/10 h-12 text-black placeholder:text-black/20 rounded-none focus:border-primary" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-black/40">Email</label>
                                <Input name="email" type="email" placeholder="EMAIL@COMPANY.COM" required className="bg-black/5 border-black/10 h-12 text-black placeholder:text-black/20 rounded-none focus:border-primary" />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-widest text-black/40">Message</label>
                                <Textarea name="message" placeholder="TELL US ABOUT YOUR REQUIREMENTS..." className="bg-black/5 border-black/10 min-h-[150px] text-black placeholder:text-black/20 rounded-none focus:border-primary resize-none" required />
                            </div>

                            <Button type="submit" className="w-full h-14 bg-primary text-black hover:bg-black hover:text-white font-bold uppercase tracking-widest rounded-none transition-all" disabled={loading}>
                                {loading ? (
                                    <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</>
                                ) : (
                                    <><Send className="mr-2 h-4 w-4" /> Send Inquiry</>
                                )}
                            </Button>

                            {status === "success" && (
                                <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-500 text-sm text-center uppercase tracking-wider">
                                    Message sent successfully.
                                </div>
                            )}
                            {status === "error" && (
                                <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 text-sm text-center uppercase tracking-wider">
                                    Failed to send. Please try again.
                                </div>
                            )}
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
}
