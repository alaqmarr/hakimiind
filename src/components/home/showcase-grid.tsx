
import { ProductCard } from "@/components/products/product-card";
import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ShowcaseGridProps {
    products: any[];
}

export function ShowcaseGrid({ products }: ShowcaseGridProps) {
    if (!products || products.length === 0) return null;

    return (
        <section className="py-24 bg-[#F5F5F4] text-black border-b border-black/5 relative overflow-hidden">
            {/* Simple Light Background, no heavy patterns */}
            <div className="container-custom relative z-10">
                <div className="flex items-center justify-between mb-12 border-b border-black/5 pb-6">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold text-black uppercase tracking-tight mb-2">
                            Signature <span className="text-primary">Series</span>
                        </h2>
                        <div className="h-1 w-24 bg-primary rounded-full"></div>
                    </div>
                    <Link href="/products">
                        <Button variant="outline" className="uppercase tracking-widest rounded-none hidden md:flex border-black/10 text-black hover:bg-black hover:text-white">
                            View Full Catalog <ArrowRight className="ml-2 size-4" />
                        </Button>
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <div key={product.id} className="h-full">
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
