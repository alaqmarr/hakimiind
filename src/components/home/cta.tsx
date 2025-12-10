
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function CTA() {
    return (
        <section className="py-40 relative overflow-hidden flex items-center justify-center bg-[#5D4037]">
            <div className="absolute inset-0 bg-white/10"></div>
            {/* Artistic Overlay */}
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

            <div className="container-custom relative z-10 text-center">
                <h2 className="text-4xl md:text-7xl font-bold text-white mb-8 tracking-tighter shadow-sm">
                    READY TO STORE?
                </h2>
                <p className="text-xl text-white/90 max-w-2xl mx-auto mb-12 font-medium">
                    Join 500+ industries optimizing their space with Hakimi Products.
                    Get a customized quote today.
                </p>
                <Link href="/contact">
                    <Button size="lg" className="h-16 px-12 text-xl font-bold uppercase tracking-widest rounded-none shadow-2xl transition-transform hover:scale-105 bg-primary text-black hover:bg-white hover:text-[#5D4037]">
                        Request Quote
                    </Button>
                </Link>
            </div>
        </section>
    );
}
