import prisma from "@/lib/prisma";
import { ProductCard } from "@/components/products/product-card";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateStaticParams() {
    const categories = await prisma.category.findMany({ select: { id: true } });
    return categories.map((c) => ({ id: c.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const category = await prisma.category.findUnique({ where: { id }, select: { name: true } });
    if (!category) return { title: "Category Not Found" };
    return {
        title: `${category.name} - Hakimi Industrial Products`,
        description: `Browse our ${category.name} collection of industrial products.`,
    };
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const category = await prisma.category.findUnique({
        where: { id },
    });

    if (!category) {
        notFound();
    }

    const products = await prisma.product.findMany({
        where: { categoryId: id },
        include: { images: true, category: true, brand: true },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="min-h-screen bg-transparent text-black pb-20">
            {/* Header */}
            <div className="bg-[#5D4037] text-white py-16 md:py-24 relative overflow-hidden border-b border-white/10">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container-custom relative z-10">
                    <Link href="/categories" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm uppercase tracking-widest mb-6 transition-colors">
                        <ArrowLeft className="size-4" /> All Categories
                    </Link>
                    <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-tighter">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] via-[#d4af37] to-[#b38728]">
                            {category.name}
                        </span>
                    </h1>
                </div>
            </div>

            <div className="container-custom py-12">
                <div className="text-black/40 text-xs uppercase tracking-widest mb-8">
                    Showing {products.length} Products
                </div>

                {products.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product as any} />
                        ))}
                    </div>
                ) : (
                    <div className="min-h-[300px] flex flex-col items-center justify-center border border-dashed border-black/10 bg-black/[0.02]">
                        <h3 className="text-2xl font-bold text-black mb-2 uppercase tracking-widest">No Products Yet</h3>
                        <p className="text-black/40 font-light">Check back later for new additions.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
