import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    // 1. CLEANUP
    await prisma.variantImage.deleteMany();
    await prisma.productVariant.deleteMany();
    await prisma.product.deleteMany();
    await prisma.category.deleteMany();
    await prisma.brand.deleteMany();
    await prisma.purpose.deleteMany();

    // 2. SEED BRANDS
    const brandAristo = await prisma.brand.create({
      data: {
        id: "aristo",
        name: "Aristo",
        imageUrl: "/images/brands/aristo.png",
      },
    });

    const brandSupreme = await prisma.brand.create({
      data: {
        id: "supreme",
        name: "Supreme",
        imageUrl: "/images/brands/supreme.png",
      },
    });

    const brandAlkon = await prisma.brand.create({
      data: {
        id: "alkon",
        name: "Alkon",
        imageUrl: "/images/brands/alkon.png",
      },
    });

    // 3. SEED PURPOSES
    const purposeStorage = await prisma.purpose.create({
      data: { id: "storage", name: "Storage" },
    });

    const purposeLogistics = await prisma.purpose.create({
      data: { id: "logistics", name: "Logistics" },
    });

    const purposeWaste = await prisma.purpose.create({
      data: { id: "waste-management", name: "Waste Management" },
    });

    const purposeOrg = await prisma.purpose.create({
      data: { id: "organization", name: "Organization" },
    });

    // 4. SEED CATEGORIES
    const catDustbins = await prisma.category.create({
      data: {
        id: "dustbins",
        name: "Dustbins",
      },
    });

    const catCrates = await prisma.category.create({
      data: {
        id: "plastic-crates",
        name: "Plastic Crates",
      },
    });

    const catPallets = await prisma.category.create({
      data: {
        id: "plastic-pallets",
        name: "Plastic Pallets",
      },
    });

    const catFPObins = await prisma.category.create({
      data: {
        id: "fpo-bins",
        name: "FPO Bins",
      },
    });

    const catRoadSafety = await prisma.category.create({
      data: {
        id: "road-safety",
        name: "Road Safety",
      },
    });

    const catIceBox = await prisma.category.create({
      data: {
        id: "ice-boxes",
        name: "Ice Boxes",
      },
    });

    // 5. SEED PRODUCTS
    // Using a helper to create products with relations
    const createProduct = async (data: any) => {
      const { categoryId, brandId, purposeId, image, ...rest } = data;
      const slug =
        rest.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
        "-" +
        Math.floor(Math.random() * 1000);

      await prisma.product.create({
        data: {
          ...rest,
          slug,
          status: "PUBLISHED",
          categoryId,
          brandId,
          purposeId,
          images: {
            create: {
              url: image, // Use provided image path
              alt: rest.name,
              isPrimary: true,
            },
          },
        },
      });
    };

    // Data Array (Subset of previous seed)
    const products = [
      {
        name: "Mobile Garbage Bin 120L",
        price: 2500,
        description:
          "<h2>Industrial Waste Bin</h2><p>120L capacity with durable wheels.</p>",
        categoryId: catDustbins.id,
        brandId: brandSupreme.id,
        purposeId: purposeWaste.id,
        image: "/images/products/bin-120l.png",
      },
      {
        name: "Jumbo Crate 600x400",
        price: 850,
        description:
          "<h2>Heavy Duty Crate</h2><p>Ventilated sides for produce storage.</p>",
        categoryId: catCrates.id,
        brandId: brandAristo.id,
        purposeId: purposeLogistics.id,
        image: "/images/products/crate-jumbo.png",
      },
      {
        name: "Euro Pallet 1200x800",
        price: 3200,
        description:
          "<h2>Rackable Pallet</h2><p>Steel reinforced for heavy loads.</p>",
        categoryId: catPallets.id,
        brandId: brandSupreme.id,
        purposeId: purposeLogistics.id,
        image: "/images/products/pallet-euro.png",
      },
      {
        name: "FPO Bin Size 25",
        price: 150,
        description:
          "<h2>Small Parts Bin</h2><p>Stackable bin for organizing nuts and bolts.</p>",
        categoryId: catFPObins.id,
        brandId: brandAlkon.id,
        purposeId: purposeOrg.id,
        image: "/images/products/bin-fpo.png",
      },
      {
        name: "Traffic Cone 750mm",
        price: 650,
        description:
          "<h2>Reflective Cone</h2><p>High visibility orange with heavy base.</p>",
        categoryId: catRoadSafety.id,
        brandId: brandSupreme.id,
        purposeId: purposeWaste.id, // Using waste/generic for now or create safety purpose
        image: "/images/products/cone.png",
      },
      {
        name: "Ice Box 50L",
        price: 4500,
        description:
          "<h2>Insulated Ice Box</h2><p>Keeps content cold for 48 hours.</p>",
        categoryId: catIceBox.id,
        brandId: brandAristo.id,
        purposeId: purposeStorage.id,
        image: "/images/products/icebox.png",
      },
      {
        name: "Vegetable Crate",
        price: 450,
        description:
          "<h2>Perforated Crate</h2><p>Ideal for agricultural produce transport.</p>",
        categoryId: catCrates.id,
        brandId: brandAristo.id,
        purposeId: purposeLogistics.id,
        image: "/images/products/crate-veg.png",
      },
      {
        name: "Rhino Tuff Bin",
        price: 500,
        description:
          "<h2>Reinforced Storage Bin</h2><p>Extra thick walls for rugged usage conditions.</p>",
        categoryId: catFPObins.id,
        brandId: brandAlkon.id,
        purposeId: purposeOrg.id,
        image: "/images/products/bin-fpo-blue.png",
      },
    ];

    for (const p of products) {
      await createProduct(p);
    }

    return NextResponse.json({
      message:
        "Database seeded successfully with Brands, Purposes, and Products!",
    });
  } catch (error) {
    console.error("Seeding error:", error);
    return NextResponse.json(
      { error: "Failed to seed database", details: String(error) },
      { status: 500 }
    );
  }
}
