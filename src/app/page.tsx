import prisma from "@/lib/prisma";
import { Hero } from "@/components/home/hero";
import { CategoriesGrid } from "@/components/home/categories-grid";
import { Features } from "@/components/home/features";
import { CTA } from "@/components/home/cta";
import { ShowcaseGrid } from "@/components/home/showcase-grid";

export const revalidate = 60;

export default async function Home() {
  // Fetch a mix of products for the showcase
  const products = await prisma.product.findMany({
    take: 4,
    where: { status: "PUBLISHED" },
    include: {
      images: true,
      category: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  // Fetch categories from DB for the categories grid
  const categories = await prisma.category.findMany({
    orderBy: { name: 'asc' },
  });

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      <Hero />

      {/* Marquee / Clients (Optional Placeholder) */}
      <div className="border-y border-black/5 bg-black/[0.02] py-4 overflow-hidden">
        <div className="flex gap-12 items-center justify-center opacity-50 text-sm tracking-widest uppercase text-black/40 font-semibold animate-pulse">
          <span>Premium Materials</span> • <span>Bulk Orders</span> • <span>Pan India Shipping</span> • <span>GST Invoice</span> • <span>Industrial Grade</span>
        </div>
      </div>

      <ShowcaseGrid products={products} />

      <CategoriesGrid categories={categories} />

      <Features />

      <CTA />

    </div>
  );
}

