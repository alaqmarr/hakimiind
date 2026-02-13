import prisma from "@/lib/prisma";
import { ProductCard } from "@/components/products/product-card";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { ProductFilters } from "@/components/products/product-filters";
import { SidebarFilters } from "@/components/products/sidebar-filters";

export const revalidate = 60;

export default async function ProductsPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string; search?: string; brand?: string | string[]; purpose?: string | string[] }>;
}) {
    const { category, search, brand, purpose } = await searchParams;

    // Normalize filters to arrays
    const brandFilters = brand ? (Array.isArray(brand) ? brand : [brand]) : [];
    const purposeFilters = purpose ? (Array.isArray(purpose) ? purpose : [purpose]) : [];

    const where: any = {
        status: "PUBLISHED", // Only show active products
    };

    if (category) {
        where.category = { name: { contains: category, mode: "insensitive" } };
    }

    if (search) {
        where.OR = [
            { name: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
        ];
    }

    if (brandFilters.length > 0) {
        where.brand = { name: { in: brandFilters } };
    }

    if (purposeFilters.length > 0) {
        where.purpose = { name: { in: purposeFilters } };
    }

    const products = await prisma.product.findMany({
        where,
        include: {
            images: true,
            category: true,
            brand: true,
        },
        orderBy: { createdAt: "desc" },
    });

    const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
    const brands = await prisma.brand.findMany({ orderBy: { name: "asc" } });
    const purposes = await prisma.purpose.findMany({ orderBy: { name: "asc" } });

    return (
        <div className="min-h-screen bg-transparent text-black selection:bg-primary selection:text-white">
            {/* Header - Industrial Brown */}
            <div className="bg-[#5D4037] border-b border-white/10 py-12 md:py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.05)_49.9%,rgba(212,175,55,0.1)_50%,rgba(255,255,255,0.05)_50.1%)] bg-[length:20px_20px] opacity-20"></div>
                <div className="container-custom relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-widest mb-4 text-white">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728]">
                            Industrial Catalog
                        </span>
                    </h1>
                    <p className="text-white/80 max-w-2xl mx-auto text-lg font-light tracking-wide">
                        Precision-engineered storage solutions for the modern enterprise.
                    </p>
                </div>
            </div>

            <div className="container-custom py-12">
                {/* Search & Layout */}
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Filters */}
                    <aside className="w-full lg:w-72 space-y-8 bg-white/50 backdrop-blur-sm p-6 border border-black/5 h-fit shadow-sm">
                        {/* Search */}
                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-black/40 group-focus-within:text-primary transition-colors" />
                            <form>
                                <input
                                    name="search"
                                    placeholder="SEARCH CATALOG..."
                                    defaultValue={search}
                                    className="w-full bg-white border border-black/10 text-black placeholder:text-black/30 pl-12 pr-4 py-4 focus:outline-none focus:border-primary/50 font-medium tracking-widest text-sm uppercase rounded-none transition-all shadow-sm"
                                />
                            </form>
                        </div>

                        <div className="block lg:hidden">
                            <ProductFilters brands={brands} purposes={purposes} categories={categories} />
                        </div>

                        {/* Categories - Always visible on Desktop Sidebar */}
                        <div className="hidden lg:block">
                            <h3 className="text-primary font-bold uppercase tracking-[0.2em] mb-6 text-xs border-b border-black/10 pb-2">
                                Categories
                            </h3>
                            <div className="space-y-1">
                                <a href="/products" className={`block w-full text-left px-4 py-3 border-l-2 transition-all duration-300 font-medium tracking-wider uppercase text-sm hover:bg-black/5 hover:text-black ${!category ? 'border-primary text-black bg-black/5' : 'border-transparent text-black/50'}`}>
                                    All Collection
                                </a>
                                {categories.map((cat) => (
                                    <a
                                        key={cat.id}
                                        href={`/products?category=${cat.name}`}
                                        className={`block w-full text-left px-4 py-3 border-l-2 transition-all duration-300 font-medium tracking-wider uppercase text-sm hover:bg-black/5 hover:text-black ${category === cat.name ? 'border-primary text-black bg-black/5' : 'border-transparent text-black/50'}`}
                                    >
                                        {cat.name}
                                    </a>
                                ))}
                            </div>
                        </div>


                        {/* Sidebar Filters (Desktop) linked to "The Box" style */}
                        <div className="hidden lg:block">
                            <SidebarFilters brands={brands} purposes={purposes} />
                        </div>
                    </aside>

                    {/* Grid */}
                    <div className="flex-1">
                        <div className="flex flex-col gap-6 mb-8">
                            {/* Top Bar: Count (Desktop Filters Removed from here) */}
                            <div className="flex items-center justify-between">
                                <div className="text-black/40 text-xs uppercase tracking-widest">
                                    Showing {products.length} Results
                                </div>
                            </div>
                        </div>

                        {products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                                {products.map((product) => (
                                    <ProductCard key={product.id} product={product as any} />
                                ))}
                            </div>
                        ) : (
                            <div className="min-h-[400px] flex flex-col items-center justify-center border border-dashed border-black/10 rounded-none bg-black/[0.02]">
                                <h3 className="text-2xl font-bold text-black mb-2 uppercase tracking-widest">No Matches</h3>
                                <p className="text-black/40 mb-8 font-light">Try adjusting your search criteria.</p>
                                <a href="/products">
                                    <Button variant="outline" className="uppercase tracking-widest rounded-none border-black/20 text-black hover:bg-primary hover:text-white">
                                        Reset Catalog
                                    </Button>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div >
        </div >
    );
}
