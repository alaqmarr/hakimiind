
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface Category {
    id: string;
    name: string;
    description?: string | null;
}

interface CategoriesGridProps {
    categories: Category[];
}

export function CategoriesGrid({ categories }: CategoriesGridProps) {
    const getColor = (i: number) => {
        const colors = [
            "border-l-[#d4af37]", // Gold
            "border-l-[#5D4037]", // Brown
            "border-l-black",     // Black
        ];
        return colors[i % colors.length];
    };

    if (!categories || categories.length === 0) return null;

    return (
        <section className="py-32 bg-white relative">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 text-black">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-tighter">
                            Primary <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#bf953f] to-[#b38728]">Categories</span>
                        </h2>
                        <div className="h-1 w-20 bg-primary"></div>
                    </div>
                    <p className="text-black/60 max-w-md text-right md:text-left">
                        Explore our core industrial categories. Designed for heavy-duty application.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {categories.slice(0, 6).map((cat, i) => (
                        <Link href={`/categories/${cat.id}`} key={cat.id} className="group">
                            <div className={`
                                relative h-[280px] bg-[#F5F5F4] border border-black/10 hover:border-black/30 
                                transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-1
                                p-8 flex flex-col justify-between overflow-hidden border-l-8 ${getColor(i)}
                            `}>
                                {/* Abstract Letter Background */}
                                <div className="absolute top-0 right-0 p-4 opacity-5">
                                    <div className="text-9xl font-black text-black leading-none -mr-8 -mt-8 select-none">
                                        {cat.name.charAt(0)}
                                    </div>
                                </div>

                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-black group-hover:text-primary transition-colors uppercase tracking-tight">
                                        {cat.name}
                                    </h3>
                                    <div className="h-1 w-12 bg-black/10 mt-4 mb-4 group-hover:bg-primary transition-colors delay-100" />
                                    <p className="text-black/60 font-medium">
                                        {cat.description || "Industrial grade heavy duty material handling."}
                                    </p>
                                </div>

                                <div className="relative z-10 flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-black/40 group-hover:text-black transition-colors">
                                    <span>Browse</span>
                                    <ArrowRight className="size-4 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
