import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { Phone, Check, Shield, Package, ArrowLeft, Mail } from "lucide-react";
import { EnquireModal } from "@/components/products/enquire-modal";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = (await params);

    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            images: true,
            category: true,
            brand: true,
        },
    });

    if (!product) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-transparent text-black pb-20">
            <div className="container-custom">
                {/* Breadcrumb */}
                <div className="mb-8 flex items-center gap-2 text-xs uppercase tracking-widest text-black/40">
                    <Link href="/products" className="hover:text-primary transition-colors flex items-center gap-1">
                        <ArrowLeft className="size-3" /> Catalog
                    </Link>
                    <span>/</span>
                    <span className="text-primary">{product.category?.name || "Product"}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

                    {/* Gallery Section */}
                    <div className="space-y-4">
                        <div className="aspect-[4/5] bg-black/[0.02] border border-black/10 relative overflow-hidden group">
                            {product.images[0] ? (
                                <img
                                    src={product.images[0].url}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-black/20 uppercase tracking-widest">No Preview</div>
                            )}

                            {/* Brand Tag Overlay */}
                            {product.brand && (
                                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-2 border border-black/5 shadow-sm">
                                    <span className="text-xs font-bold uppercase tracking-widest text-black">
                                        {product.brand.name}
                                    </span>
                                </div>
                            )}
                        </div>

                        {product.images.length > 1 && (
                            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
                                {product.images.map((img) => (
                                    <div key={img.id} className="h-24 w-24 flex-shrink-0 bg-white border border-black/10 cursor-pointer hover:border-primary transition-colors overflow-hidden">
                                        <img src={img.url} alt="" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-opacity" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details Section */}
                    <div className="py-4">
                        <h1 className="text-4xl md:text-5xl font-bold text-black mb-2 tracking-tight uppercase leading-none">
                            {product.name}
                        </h1>
                        <div className="h-1 w-20 bg-primary mb-8" />

                        {/* Price Removed */}

                        <div className="prose prose-neutral prose-p:text-black/60 prose-p:font-light prose-headings:font-bold prose-headings:uppercase prose-headings:tracking-wider mb-10 max-w-none border-l-2 border-primary/20 pl-6"
                            dangerouslySetInnerHTML={{ __html: product.description || "No detailed description available." }}>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-2 gap-4 mb-10">
                            {[
                                { icon: Shield, label: "Material", val: "Virgin Plastic" },
                                { icon: Package, label: "Stock", val: "Ready to Ship" },
                                { icon: Check, label: "Warranty", val: "1 Year Standard" },
                                { icon: Check, label: "Bulk", val: "Discount Available" },
                            ].map((spec, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 border border-black/5 bg-black/[0.02]">
                                    <spec.icon className="size-5 text-primary" />
                                    <div>
                                        <div className="text-[10px] uppercase tracking-widest text-black/40">{spec.label}</div>
                                        <div className="text-sm font-semibold text-black/80">{spec.val}</div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Actions */}
                        <div className="flex flex-col gap-4">
                            <a
                                href={`https://wa.me/919885721611?text=I am enquiring about ${product.name}, please share more details and quote.`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full"
                            >
                                <Button className="w-full h-14 bg-[#25D366] text-white hover:bg-[#128C7E] font-bold uppercase tracking-widest text-lg rounded-none transition-all shadow-xl shadow-green-500/20 border-none">
                                    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5 mr-3" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>
                                    Enquire on WhatsApp
                                </Button>
                            </a>

                            <EnquireModal
                                productName={product.name}
                                prefilledMessage={`I am enquiring about ${product.name}, please share more details and quote.`}
                                trigger={
                                    <Button className="w-full h-14 bg-black text-white hover:bg-primary hover:text-black font-bold uppercase tracking-widest text-lg rounded-none shadow-xl shadow-black/10 transition-all">
                                        <Mail className="size-5 mr-3" /> Request Quote
                                    </Button>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
