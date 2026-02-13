import Link from "next/link";
import { ArrowRight } from "lucide-react";
import prisma from "@/lib/prisma";

export const metadata = {
    title: "Categories - Hakimi Industrial Products",
    description: "Browse our extensive range of industrial storage solutions.",
};

export const revalidate = 60;

export default async function CategoriesPage() {
    const dbCategories = await prisma.category.findMany({
        orderBy: { name: 'asc' }
    });

    const displayCategories = dbCategories.length > 0 ? dbCategories : [];

    const getColor = (i: number) => {
        // Industrial colors
        const colors = [
            "border-l-[#d4af37]", // Gold
            "border-l-[#5D4037]", // Brown
            "border-l-black",     // Black
        ];
        return colors[i % colors.length];
    };

    return (
        <div className="min-h-screen bg-transparent text-black pb-20">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-bold uppercase tracking-tighter mb-6">
                        Product <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] to-[#b38728]">Categories</span>
                    </h1>
                    <p className="text-black/60 text-lg max-w-2xl mx-auto">
                        Explore our comprehensive catalog of industrial grade storage solutions designed for durability and performance.
                    </p>
                </div>

                {displayCategories.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {displayCategories.map((cat: any, i: number) => (
                            <Link href={`/categories/${cat.id}`} key={i} className="group">
                                <div className={`h-[250px] relative bg-[#F5F5F4] border border-black/10 hover:border-black/30 transition-all duration-300 shadow-sm hover:shadow-md p-10 flex flex-col justify-between overflow-hidden border-l-8 ${getColor(i)}`}>

                                    {/* Abstract Pattern overlay */}
                                    <div className="absolute top-0 right-0 p-4 opacity-10">
                                        <div className="text-9xl font-black text-black leading-none -mr-10 -mt-10 select-none">
                                            {cat.name.charAt(0)}
                                        </div>
                                    </div>

                                    <div className="relative z-10">
                                        <h3 className="text-3xl font-bold text-black group-hover:text-primary transition-colors uppercase tracking-tight">
                                            {cat.name}
                                        </h3>
                                        <div className="h-1 w-12 bg-black/10 mt-4 mb-4 group-hover:bg-primary transition-colors delay-100" />
                                        <p className="text-black/60 font-medium max-w-sm">
                                            {cat.description || "Industrial grade heavy duty material handling."}
                                        </p>
                                    </div>

                                    <div className="relative z-10 flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
                                        <span>View Collection</span>
                                        <ArrowRight className="size-4 group-hover:translate-x-2 transition-transform" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 border border-dashed border-black/20 bg-black/5">
                        <h3 className="text-2xl font-bold text-black/50 uppercase tracking-widest">No Categories Found</h3>
                        <p className="text-black/40 mt-2">Please seed the database.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
