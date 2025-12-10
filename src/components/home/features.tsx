
import { Shield, Package, Truck, Award } from "lucide-react";

export function Features() {
    return (
        <section className="py-32 bg-[#5D4037] text-white border-t border-white/10 relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="container-custom relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {[
                        { icon: Shield, title: "Unbeatable Durability", desc: "Crafted from 100% Virgin Plastic for extreme longevity." },
                        { icon: Package, title: "Bulk Availability", desc: "Ready stock for large-scale industrial requirements." },
                        { icon: Truck, title: "Rapid Logistics", desc: "Efficient fast-track delivery across Telangana & India." },
                        { icon: Award, title: "Brand Warranty", desc: "Authorized dealer for Aristo, Supreme & Alkon." },
                    ].map((f, i) => (
                        <div key={i} className="space-y-6 group">
                            <div className="size-16 bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-xl shadow-black/10">
                                <f.icon className="size-8" />
                            </div>
                            <h4 className="text-xl font-bold uppercase tracking-wide">{f.title}</h4>
                            <p className="text-white/60 leading-relaxed font-light">{f.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
