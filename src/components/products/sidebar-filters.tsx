"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import { X, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarFiltersProps {
    brands: { id: string; name: string }[];
    purposes: { id: string; name: string }[];
}

export function SidebarFilters({ brands, purposes }: SidebarFiltersProps) {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Parse current filters
    const selectedBrands = searchParams.getAll("brand");
    const selectedPurposes = searchParams.getAll("purpose");

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

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500 delay-100">
            {/* Brands Section */}
            <div>
                <h3 className="text-primary font-bold uppercase tracking-[0.2em] mb-4 text-xs border-b border-black/10 pb-2">
                    Brands
                </h3>
                <div className="space-y-1">
                    {brands.map((brand) => {
                        const isSelected = selectedBrands.includes(brand.name);
                        return (
                            <label
                                key={brand.id}
                                className={cn(
                                    "flex items-center justify-between w-full text-left px-4 py-3 border-l-2 transition-all duration-300 font-medium tracking-wider uppercase text-sm cursor-pointer group",
                                    isSelected
                                        ? "border-primary bg-black/5 text-black"
                                        : "border-transparent text-black/50 hover:bg-black/5 hover:text-black"
                                )}
                            >
                                <span className="flex items-center gap-3">
                                    <div className={cn(
                                        "size-4 border border-black/30 flex items-center justify-center transition-colors rounded-sm",
                                        isSelected ? "bg-primary border-primary text-black" : "group-hover:border-black"
                                    )}>
                                        {isSelected && <Check className="size-3" />}
                                    </div>
                                    {brand.name}
                                </span>
                            </label>
                        );
                    })}
                    {brands.map((brand) => (
                        // Hidden checkbox to handle logic while UI is custom
                        <Checkbox
                            key={`cb-${brand.id}`}
                            id={`brand-sidebar-${brand.id}`}
                            checked={selectedBrands.includes(brand.name)}
                            onCheckedChange={(checked) => handleFilterChange("brand", brand.name, checked as boolean)}
                            className="hidden"
                        />
                    ))}
                </div>
            </div>

            {/* Usage Section */}
            <div>
                <h3 className="text-primary font-bold uppercase tracking-[0.2em] mb-4 text-xs border-b border-black/10 pb-2">
                    Usage
                </h3>
                <div className="space-y-1">
                    {purposes.map((purpose) => {
                        const isSelected = selectedPurposes.includes(purpose.name);
                        return (
                            <label
                                key={purpose.id}
                                className={cn(
                                    "flex items-center justify-between w-full text-left px-4 py-3 border-l-2 transition-all duration-300 font-medium tracking-wider uppercase text-sm cursor-pointer group",
                                    isSelected
                                        ? "border-primary bg-black/5 text-black"
                                        : "border-transparent text-black/50 hover:bg-black/5 hover:text-black"
                                )}
                            >
                                <span className="flex items-center gap-3">
                                    <div className={cn(
                                        "size-4 border border-black/30 flex items-center justify-center transition-colors rounded-sm",
                                        isSelected ? "bg-primary border-primary text-black" : "group-hover:border-black"
                                    )}>
                                        {isSelected && <Check className="size-3" />}
                                    </div>
                                    {purpose.name}
                                </span>

                                {/* Actual hidden input logic handler */}
                                <input
                                    type="checkbox"
                                    className="hidden"
                                    checked={isSelected}
                                    onChange={(e) => handleFilterChange("purpose", purpose.name, e.target.checked)}
                                />
                            </label>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
