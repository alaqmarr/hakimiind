
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Link from "next/link";

export default function BrandsPage() {
    const brands = [
        {
            name: "Aristo",
            description: "Leading manufacturer of plastic crates, pallets, and waste management solutions known for durability and precision.",
            color: "bg-red-600",
            href: "/products?search=aristo"
        },
        {
            name: "Supreme",
            description: "India's plastic trendsetter offering a vast range of industrial handling and storage products.",
            color: "bg-blue-600",
            href: "/products?search=supreme"
        },
        {
            name: "Alkon",
            description: "Specialized storage systems for electronic components, hardware, and automotive industries.",
            color: "bg-green-600",
            href: "/products?search=alkon"
        }
    ];

    return (
        <div className="min-h-screen bg-transparent text-black pb-20">
            {/* Header */}
            <div className="bg-[#5D4037] text-white py-20 md:py-32 relative overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container-custom relative z-10 text-center">
                    <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6">
                        Our <span className="text-primary">Partners</span>
                    </h1>
                    <p className="text-white/70 max-w-2xl mx-auto text-xl font-light tracking-wide">
                        Authorized distributors for India's most trusted industrial brands.
                    </p>
                </div>
            </div>

            {/* Brands Grid */}
            <div className="container-custom py-20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {brands.map((brand, i) => (
                        <div key={i} className="group relative bg-[#F5F5F4] border border-black/5 hover:border-primary/50 transition-all duration-500 overflow-hidden flex flex-col p-8">
                            <div className="mb-6 flex items-center justify-between">
                                <div className={`h-12 w-12 rounded-full ${brand.color} opacity-80 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-bold text-xl uppercase`}>
                                    {brand.name[0]}
                                </div>
                                <Star className="text-primary fill-primary size-5 opacity-50 group-hover:opacity-100 transition-opacity" />
                            </div>

                            <h3 className="text-3xl font-bold uppercase tracking-wide mb-4 text-black group-hover:text-primary transition-colors">
                                {brand.name}
                            </h3>
                            <p className="text-black/60 leading-relaxed mb-8 flex-grow">
                                {brand.description}
                            </p>

                            <Link href={brand.href}>
                                <Button className="w-full bg-black text-white hover:bg-primary hover:text-black uppercase tracking-widest rounded-none h-12">
                                    View Products <ArrowRight className="ml-2 size-4" />
                                </Button>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA */}
            <div className="container-custom pb-20">
                <div className="bg-[#1a1a1a] p-12 md:p-20 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#5D4037]/20"></div>
                    <div className="relative z-10">
                        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6">
                            Become a Partner?
                        </h2>
                        <p className="text-white/60 max-w-xl mx-auto mb-8 text-lg">
                            We are always looking to expand our catalog with high-quality industrial solutions.
                        </p>
                        <Link href="/contact">
                            <Button size="lg" className="bg-primary text-black hover:bg-white hover:text-black font-bold uppercase tracking-widest px-10 h-14 rounded-none">
                                Contact Us
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
