import prisma from "../src/lib/db";

async function main() {
  console.log("Start seeding ...");

  // CLEANUP (Order is important because of foreign keys)
  await prisma.variantImage.deleteMany();
  await prisma.variantInventoryLog.deleteMany();
  await prisma.inventoryLog.deleteMany();
  await prisma.inventory.deleteMany();
  await prisma.productVariant.deleteMany();
  await prisma.image.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.brand.deleteMany();
  await prisma.purpose.deleteMany();

  // 1. BRANDS
  const brandAristo = await prisma.brand.create({
    data: {
      id: "brand-aristo",
      name: "Aristo",
      imageUrl: "/images/brands/aristo.png",
    },
  });
  const brandSupreme = await prisma.brand.create({
    data: {
      id: "brand-supreme",
      name: "Supreme",
      imageUrl: "/images/brands/supreme.png",
    },
  });
  const brandAlkon = await prisma.brand.create({
    data: {
      id: "brand-alkon",
      name: "Alkon",
      imageUrl: "/images/brands/alkon.png",
    },
  });

  // 2. CATEGORIES (Strict Schema: id, name only)
  const catDustbins = await prisma.category.create({
    data: {
      id: "cat-dustbins",
      name: "Industrial Dustbins",
    },
  });
  const catCrates = await prisma.category.create({
    data: {
      id: "cat-crates",
      name: "Plastic Crates",
    },
  });
  const catPallets = await prisma.category.create({
    data: {
      id: "cat-pallets",
      name: "Pallets",
    },
  });
  const catFPObins = await prisma.category.create({
    data: {
      id: "cat-fpobins",
      name: "FPO Bins",
    },
  });

  // 4. PURPOSES
  const purposeStorage = await prisma.purpose.create({
    data: { id: "purpose-storage", name: "Storage" },
  });
  const purposeLogistics = await prisma.purpose.create({
    data: { id: "purpose-logistics", name: "Logistics" },
  });
  const purposeWaste = await prisma.purpose.create({
    data: { id: "purpose-waste", name: "Waste Management" },
  });
  const purposeOrg = await prisma.purpose.create({
    data: { id: "purpose-org", name: "Organization" },
  });

  // 5. PRODUCTS CATALOG
  const products = [
    // --- DUSTBINS (Aristo & Supreme) ---
    {
      name: "120L Wheelie Bin (Green)",
      price: 2800,
      description:
        "<h2>Aristo 120 Liter Waste Bin</h2><p>Robust 2-wheeled waste bin made from high-density polyethylene (HDPE). UV resistant and suitable for outdoor use. Ideal for municipal and industrial waste collection.</p><ul><li>Capacity: 120 Liters</li><li>Dimensions: 480 x 550 x 930 mm</li><li>Color: Green</li></ul>",
      categoryId: catDustbins.id,
      brandId: brandAristo.id,
      purposeId: purposeWaste.id,
      image: "/images/products/dustbin-120l-green.png",
    },
    {
      name: "240L Wheelie Bin (Blue)",
      price: 4500,
      description:
        "<h2>Supreme 240 Liter Large Waste Bin</h2><p>Heavy-duty dustbin with solid rubber tires for smooth mobility. Reinforced lid and hinges for extra durability.</p><ul><li>Capacity: 240 Liters</li><li>Dimensions: 580 x 730 x 1070 mm</li><li>Color: Blue</li></ul>",
      categoryId: catDustbins.id,
      brandId: brandSupreme.id,
      purposeId: purposeWaste.id,
      image: "/images/products/dustbin-120l-green.png", // Reusing distinct image style for now
    },
    {
      name: "60L Pedal Bin",
      price: 1650,
      description:
        "<h2>Hygienic Pedal Operated Bin 60L</h2><p>Hands-free operation, perfect for kitchens, hospitals, and food processing areas. Smooth operating pedal mechanism.</p><ul><li>Capacity: 60 Liters</li><li>Material: Virgin Plastic</li></ul>",
      categoryId: catDustbins.id,
      brandId: brandAristo.id,
      purposeId: purposeWaste.id,
      image: "/images/products/dustbin-pedal-60l.png",
    },
    {
      name: "Swing Lid Bin 60L",
      price: 1200,
      description:
        "<h2>60L Swing Top Dustbin</h2><p>Classic swing lid design keeps waste out of sight and traps odors. Easy to clean surface.</p>",
      categoryId: catDustbins.id,
      brandId: brandAristo.id,
      purposeId: purposeWaste.id,
      image: "/images/products/dustbin-pedal-60l.png",
    },
    {
      name: "Dome Lid Bin 80L",
      price: 1900,
      description:
        "<h2>80L Round Bin with Dome Lid</h2><p>Push-top dome lid design. Ideal for public spaces and malls.</p>",
      categoryId: catDustbins.id,
      brandId: brandAristo.id,
      purposeId: purposeWaste.id,
      image: "/images/products/dustbin-120l-green.png",
    },

    // --- CRATES (Supreme & Alkon) ---
    {
      name: "Jumbo Crate 600x400x325 (Blue)",
      price: 950,
      description:
        "<h2>Supreme Jumbo Crate Solid</h2><p>Large volume industrial crate for heavy components. Reinforced corners and base for stacking strength.</p><ul><li>Outer Dims: 600 x 400 x 325 mm</li><li>Capacity: 65 Liters</li></ul>",
      categoryId: catCrates.id,
      brandId: brandSupreme.id,
      purposeId: purposeStorage.id,
      image: "/images/products/crate-jumbo-blue.png",
    },
    {
      name: "Super Jumbo Crate 650x450",
      price: 1250,
      description:
        "<h2>Extra Large Industrial Crate</h2><p>Ideal for textile and automotive industries. High impact resistance.</p><ul><li>Outer Dims: 650 x 450 x 315 mm</li></ul>",
      categoryId: catCrates.id,
      brandId: brandSupreme.id,
      purposeId: purposeStorage.id,
      image: "/images/products/crate-jumbo-blue.png",
    },
    {
      name: "Perforated Veg Crate (Red)",
      price: 550,
      description:
        "<h2>Ventilated Agriculture Crate</h2><p>Mesh sides and bottom for airflow. Perfect for harvesting and transport of fruits and vegetables.</p><ul><li>Dims: 542 x 360 x 290 mm</li><li>Weight: 1.5 kg</li></ul>",
      categoryId: catCrates.id,
      brandId: brandSupreme.id,
      purposeId: purposeLogistics.id,
      image: "/images/products/crate-mesh-red.png",
    },
    {
      name: "Supreme Dairy Crate",
      price: 600,
      description:
        "<h2>Milk Pouch Crate</h2><p>Specially designed for milk pouches and dairy products. Smooth interiors prevent pouch damage.</p>",
      categoryId: catCrates.id,
      brandId: brandSupreme.id,
      purposeId: purposeLogistics.id,
      image: "/images/products/crate-mesh-red.png",
    },
    {
      name: "Conductive Crate ESD",
      price: 1400,
      description:
        "<h2>ESD Safe Black Crate</h2><p>For safe storage and transport of sensitive electronic components (PCB). Surface resistivity 10^4 - 10^6 Ohm.</p>",
      categoryId: catCrates.id,
      brandId: brandAlkon.id,
      purposeId: purposeStorage.id,
      image: "/images/products/pallet-hdpe-black.png", // Using dark texture image
    },
    {
      name: "Bottle Crate (20 Slot)",
      price: 800,
      description:
        "<h2>Plastic Crate for Bottles</h2><p>Partitioned crate for safe transport of 1L or 750ml bottles.</p>",
      categoryId: catCrates.id,
      brandId: brandSupreme.id,
      purposeId: purposeLogistics.id,
      image: "/images/products/crate-jumbo-blue.png",
    },

    // --- PALLETS (Supreme) ---
    {
      name: "Heavy Duty Euro Pallet",
      price: 4200,
      description:
        "<h2>1200x1000 Heavy Duty HDPE Pallet</h2><p>Steel reinforced option available. Suitable for high rack loads and robust industrial use.</p><ul><li>Static Load: 4000 kg</li><li>Dynamic Load: 1000 kg</li></ul>",
      categoryId: catPallets.id,
      brandId: brandSupreme.id,
      purposeId: purposeLogistics.id,
      image: "/images/products/pallet-hdpe-black.png",
    },
    {
      name: "Nestable Export Pallet",
      price: 1800,
      description:
        "<h2>Lightweight One-Way Pallet</h2><p>Space saving design when empty. Economical solution for export shipments.</p><ul><li>Dims: 1200 x 800 x 140 mm</li></ul>",
      categoryId: catPallets.id,
      brandId: brandSupreme.id,
      purposeId: purposeLogistics.id,
      image: "/images/products/pallet-hdpe-black.png",
    },
    {
      name: "Roto Moulded Clean Pallet",
      price: 5500,
      description:
        "<h2>Hygienic Pharma Pallet</h2><p>Completely closed surface, easy to wash. Ideal for pharmaceutical and food industries.</p>",
      categoryId: catPallets.id,
      brandId: brandSupreme.id,
      purposeId: purposeStorage.id,
      image: "/images/products/pallet-hdpe-black.png",
    },

    // --- FPO BINS (Alkon) ---
    {
      name: "Alkon Bull Bin 55",
      price: 650,
      description:
        "<h2>Large FPO Storage Bin</h2><p>The largest in the Bull Bin series. Strong rear lip for panel mounting.</p><ul><li>Dims: 510 x 310 x 200 mm</li></ul>",
      categoryId: catFPObins.id,
      brandId: brandAlkon.id,
      purposeId: purposeOrg.id,
      image: "/images/products/bin-fpo-blue.png",
    },
    {
      name: "Alkon Bull Bin 45",
      price: 450,
      description:
        "<h2>Medium Industrial Bin</h2><p>FPO bin for hardware and tools organization.</p><ul><li>Dims: 400 x 250 x 150 mm</li></ul>",
      categoryId: catFPObins.id,
      brandId: brandAlkon.id,
      purposeId: purposeOrg.id,
      image: "/images/products/bin-fpo-blue.png",
    },
    {
      name: "Alkon Bull Bin 35",
      price: 350,
      description:
        "<h2>Small Parts Bin</h2><p>Stackable bin for screws, nuts, and bolts.</p><ul><li>Dims: 300 x 200 x 130 mm</li></ul>",
      categoryId: catFPObins.id,
      brandId: brandAlkon.id,
      purposeId: purposeOrg.id,
      image: "/images/products/bin-fpo-blue.png",
    },
    {
      name: "Alkon Bull Bin 25",
      price: 220,
      description:
        "<h2>Assembly Line Bin</h2><p>Compact bin with card holder slot.</p><ul><li>Dims: 200 x 150 x 100 mm</li></ul>",
      categoryId: catFPObins.id,
      brandId: brandAlkon.id,
      purposeId: purposeOrg.id,
      image: "/images/products/bin-fpo-blue.png",
    },
    {
      name: "Supra Bin 1",
      price: 80,
      description:
        "<h2>Micro Component Bin</h2><p>Smallest size for tiny electronics or mechanical parts.</p>",
      categoryId: catFPObins.id,
      brandId: brandAlkon.id,
      purposeId: purposeOrg.id,
      image: "/images/products/bin-fpo-blue.png",
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

  /* 
     NOTE: This seed script automatically populates Brands (Aristo, Supreme, Alkon) 
     and Purposes (Storage, Logistics, Waste Management, Organization) which are 
     REQUIRED for the Product Filters to function correctly. 
     Do not remove these relations.
  */

  for (const p of products) {
    const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const pid = `prod-${slug}-${Math.floor(Math.random() * 1000)}`;

    const product = await prisma.product.create({
      data: {
        id: pid,
        name: p.name,
        description: p.description,
        price: p.price,
        categoryId: p.categoryId,
        brandId: p.brandId,
        purposeId: p.purposeId,
        status: "PUBLISHED",
        images: {
          create: [
            {
              url: p.image,
              publicId: `local-${Math.floor(Math.random() * 10000)}`,
            },
            {
              url: p.image,
              publicId: `local-${Math.floor(Math.random() * 10001)}`,
            }, // Adding 2nd image for gallery
          ],
        },
      },
    });
    console.log(`Created product: ${product.name}`);
  }

  console.log("Seeding finished.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
