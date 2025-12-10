import Link from "next/link";
import { MessageCircle, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EnquireModal } from "./enquire-modal";

interface ProductWithImage {
    id: string;
    name: string;
    description: string | null;
    price: any;
    images: { url: string }[];
    category?: { name: string } | null;
}

interface ProductCardProps {
    product: ProductWithImage;
}

export function ProductCard({ product }: ProductCardProps) {
    return (
        <div className="group relative bg-[#F5F5F4] border border-black/10 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-500 overflow-hidden flex flex-col h-full">
            {/* Image Area */}
            <div className="aspect-[4/5] relative overflow-hidden bg-black/5">
                {product.images[0] ? (
                    <img
                        src={product.images[0].url}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 hover:sepia-[.25]"
                    />
                ) : (
                    <div className="flex items-center justify-center h-full text-black/20 uppercase tracking-widest text-xs">
                        No Image
                    </div>
                )}

                <div className="absolute top-4 left-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-black bg-white/90 backdrop-blur-md px-2 py-1 border border-black/10">
                        {product.category?.name || "Industrial"}
                    </span>
                </div>
            </div>

            {/* Info Area */}
            <div className="p-6 flex flex-col flex-grow">
                <Link href={`/products/${product.id}`} className="block">
                    <h3 className="text-xl font-bold text-black mb-2 line-clamp-1 group-hover:text-primary transition-colors">{product.name}</h3>
                </Link>
                <p className="text-black/60 text-sm line-clamp-2 mb-4 font-light flex-grow">
                    {product.description?.replace(/<[^>]*>?/gm, "") || "Premium industrial quality."}
                </p>

                <div className="space-y-3 mt-auto">
                    {/* Price Removed */}

                    <div className="flex flex-col gap-3 w-full">
                        <EnquireModal
                            productName={product.name}
                            prefilledMessage={`I am enquiring about ${product.name}, please share more details and quote.`}
                            trigger={
                                <Button className="w-full font-bold uppercase tracking-wider text-xs h-10 shadow-sm transition-all duration-300 bg-[#5D4037] text-white hover:bg-[#d4af37] hover:text-black">
                                    <Mail className="size-4 mr-2" /> Enquire Now
                                </Button>
                            }
                        />

                        <a
                            href={`https://wa.me/919885721611?text=I am enquiring about ${product.name}, please share more details and quote.`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full"
                        >
                            <Button className="w-full bg-[#25D366] text-white hover:bg-[#128C7E] font-bold uppercase tracking-wider text-xs h-10 shadow-md transition-all duration-300 border-none">
                                <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-4 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                                </svg>
                                Enquire on WhatsApp
                            </Button>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
