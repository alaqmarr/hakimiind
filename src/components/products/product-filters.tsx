"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, X, ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import * as Accordion from "@radix-ui/react-accordion";

interface ProductFiltersProps {
    brands: { id: string; name: string }[];
    purposes: { id: string; name: string }[];
    categories?: { id: string; name: string }[];
}

export function ProductFilters({ brands, purposes, categories = [] }: ProductFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [open, setOpen] = useState(false);

    // Parse current filters
    const selectedBrands = searchParams.getAll("brand");
    const selectedPurposes = searchParams.getAll("purpose");
    const currentSearch = searchParams.get("search");
    const currentCategory = searchParams.get("category");

    const handleFilterChange = (type: "brand" | "purpose", value: string, checked: boolean) => {
        const params = new URLSearchParams(searchParams.toString());
        const currentValues = params.getAll(type);

        if (checked) {
            params.append(type, value);
        } else {
            params.delete(type);
            currentValues.filter(v => v !== value).forEach(v => params.append(type, v));
        }

        router.push(`/products?${params.toString()}`);
    };

    const handleCategoryChange = (categoryName: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (currentCategory === categoryName) {
            params.delete("category");
        } else {
            params.set("category", categoryName);
        }
        router.push(`/products?${params.toString()}`);
    };

    const removeFilter = (type: "brand" | "purpose", value: string) => {
        handleFilterChange(type, value, false);
    };

    const clearAll = () => {
        router.push("/products");
    };

    const hasActiveFilters = selectedBrands.length > 0 || selectedPurposes.length > 0 || currentSearch || currentCategory;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="outline" className="h-10 border-black/20 text-black hover:bg-secondary hover:text-white uppercase tracking-widest gap-2 bg-transparent text-xs w-full sm:w-auto">
                            <Filter className="size-3" />
                            Refine Products
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[320px] overflow-y-auto bg-[#F5F5F4] border-r border-black/10 text-black p-0">
                        <SheetHeader className="p-6 bg-white border-b border-black/5">
                            <SheetTitle className="uppercase tracking-widest text-lg font-bold text-black flex items-center pt-4">
                                <Filter className="size-4 mr-2" /> Filters
                            </SheetTitle>
                        </SheetHeader>

                        <div className="p-6 space-y-8">
                            {/* Accordion Style Sections */}
                            <Accordion.Root type="multiple" defaultValue={["categories", "brands", "usage"]} className="space-y-4">

                                {/* Categories Accordion */}
                                <Accordion.Item value="categories" className="border border-black/5 bg-white rounded-none overflow-hidden shadow-sm">
                                    <Accordion.Trigger className="flex w-full items-center justify-between p-4 text-sm font-bold uppercase tracking-widest hover:bg-black/5 transition-colors group">
                                        <span>Categories</span>
                                        <ChevronDown className="size-4 text-black/40 group-data-[state=open]:rotate-180 transition-transform" />
                                    </Accordion.Trigger>
                                    <Accordion.Content className="border-t border-black/5 p-4 bg-white/50 animate-accordion-down">
                                        <div className="space-y-3">
                                            {categories.map((cat) => (
                                                <div key={cat.id} className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleCategoryChange(cat.name)}>
                                                    <div className={cn(
                                                        "size-5 border border-black/20 rounded-full flex items-center justify-center transition-all",
                                                        currentCategory === cat.name ? "bg-primary border-primary" : "bg-white group-hover:border-black/50"
                                                    )}>
                                                        {currentCategory === cat.name && <div className="size-2 bg-black rounded-full" />}
                                                    </div>
                                                    <span className="text-sm font-medium uppercase tracking-wide text-black/70 group-hover:text-black transition-colors select-none">
                                                        {cat.name}
                                                    </span>
                                                </div>
                                            ))}
                                            <div className="flex items-center space-x-3 group cursor-pointer" onClick={() => router.push('/products')}>
                                                <div className={cn(
                                                    "size-5 border border-black/20 rounded-full flex items-center justify-center transition-all",
                                                    !currentCategory ? "bg-primary border-primary" : "bg-white group-hover:border-black/50"
                                                )}>
                                                    {!currentCategory && <div className="size-2 bg-black rounded-full" />}
                                                </div>
                                                <span className="text-sm font-medium uppercase tracking-wide text-black/70 group-hover:text-black transition-colors select-none">
                                                    View All
                                                </span>
                                            </div>
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Item>

                                {/* Brands Accordion */}
                                <Accordion.Item value="brands" className="border border-black/5 bg-white rounded-none overflow-hidden shadow-sm">
                                    <Accordion.Trigger className="flex w-full items-center justify-between p-4 text-sm font-bold uppercase tracking-widest hover:bg-black/5 transition-colors group">
                                        <span>Brands</span>
                                        <ChevronDown className="size-4 text-black/40 group-data-[state=open]:rotate-180 transition-transform" />
                                    </Accordion.Trigger>
                                    <Accordion.Content className="border-t border-black/5 p-4 bg-white/50 animate-accordion-down">
                                        <div className="space-y-3">
                                            {brands.map((brand) => (
                                                <div key={brand.id} className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleFilterChange("brand", brand.name, !selectedBrands.includes(brand.name))}>
                                                    <div className={cn(
                                                        "size-5 border border-black/20 rounded-sm flex items-center justify-center transition-all",
                                                        selectedBrands.includes(brand.name) ? "bg-primary border-primary" : "bg-white group-hover:border-black/50"
                                                    )}>
                                                        {selectedBrands.includes(brand.name) && <Check className="size-3 text-black" />}
                                                    </div>
                                                    <span className="text-sm font-medium uppercase tracking-wide text-black/70 group-hover:text-black transition-colors select-none">
                                                        {brand.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Item>

                                {/* Purpose Accordion */}
                                <Accordion.Item value="usage" className="border border-black/5 bg-white rounded-none overflow-hidden shadow-sm">
                                    <Accordion.Trigger className="flex w-full items-center justify-between p-4 text-sm font-bold uppercase tracking-widest hover:bg-black/5 transition-colors group">
                                        <span>Usage</span>
                                        <ChevronDown className="size-4 text-black/40 group-data-[state=open]:rotate-180 transition-transform" />
                                    </Accordion.Trigger>
                                    <Accordion.Content className="border-t border-black/5 p-4 bg-white/50 animate-accordion-down">
                                        <div className="space-y-3">
                                            {purposes.map((purpose) => (
                                                <div key={purpose.id} className="flex items-center space-x-3 group cursor-pointer" onClick={() => handleFilterChange("purpose", purpose.name, !selectedPurposes.includes(purpose.name))}>
                                                    <div className={cn(
                                                        "size-5 border border-black/20 rounded-sm flex items-center justify-center transition-all",
                                                        selectedPurposes.includes(purpose.name) ? "bg-primary border-primary" : "bg-white group-hover:border-black/50"
                                                    )}>
                                                        {selectedPurposes.includes(purpose.name) && <Check className="size-3 text-black" />}
                                                    </div>
                                                    <span className="text-sm font-medium uppercase tracking-wide text-black/70 group-hover:text-black transition-colors select-none">
                                                        {purpose.name}
                                                    </span>
                                                </div>
                                            ))}
                                        </div>
                                    </Accordion.Content>
                                </Accordion.Item>
                            </Accordion.Root>
                        </div>

                        <div className="p-6 border-t border-black/10 bg-white">
                            <Button onClick={clearAll} variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 hover:border-red-300 uppercase tracking-widest text-xs h-12">
                                Clear All Filters
                            </Button>
                        </div>
                    </SheetContent>
                </Sheet>

                {/* Active Filters Display (Desktop Only - handled by parent page or this could be hidden/simplified) */}
                {/* For Mobile, we might just show a count or "Active" badge on the trigger */}
            </div>

            {/* Mobile Active Filter Chips - Optional if space permits, or keep hidden on mobile to reduce clutter */}
            {hasActiveFilters && (
                <div className="flex lg:hidden flex-wrap gap-2 items-center mt-4">
                    {currentCategory && (
                        <div className="bg-white border border-black/10 px-2 py-1 text-[10px] uppercase tracking-wider flex items-center gap-1 rounded-sm text-black">
                            <span>{currentCategory}</span>
                            <Button variant="ghost" size="icon" className="h-3 w-3 p-0 hover:bg-black/5" onClick={() => router.push('/products')}>
                                <X className="size-2" />
                            </Button>
                        </div>
                    )}
                    {selectedBrands.map(brand => (
                        <div key={brand} className="bg-white border border-black/10 px-2 py-1 text-[10px] uppercase tracking-wider flex items-center gap-1 rounded-sm text-black">
                            <span>{brand}</span>
                            <Button variant="ghost" size="icon" className="h-3 w-3 p-0 hover:bg-black/5" onClick={() => removeFilter("brand", brand)}>
                                <X className="size-2" />
                            </Button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
