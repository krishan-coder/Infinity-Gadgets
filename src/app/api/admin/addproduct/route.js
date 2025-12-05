import { NextResponse } from "next/server";
import Product from "@/models/Product";
import connectDB from "@/lib/config/dbconnection";
import cloudinary from "@/lib/config/cloudinary";
import { getToken } from "next-auth/jwt";
import streamifier from "streamifier";

export const config = {
  api: {
    bodyParser: false, // Important: allows FormData parsing
  },
};

export async function POST(request) {
  await connectDB();

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Auth check
  if (!token) {
    return NextResponse.json({ message: "No authorization token found" }, { status: 401 });
  }

  if (token.user.role !== "admin") {
    return NextResponse.json({ message: "Unauthorized: Only admins can add products" }, { status: 403 });
  }

  try {
    // Parse FormData
    const form = await request.formData();

    // Extract basic fields
    const productData = {
      id: form.get("id"),
      name: form.get("name"),
      description: form.get("description"),
      specifications: form.get("specifications") || "{}",
      rating: parseFloat(form.get("rating")) || 4.5,
      reviews: parseInt(form.get("reviews")) || 0,
      price: parseFloat(form.get("price")) || 0,
      originalPrice: parseFloat(form.get("originalPrice")) || 0,
      type: form.get("type"),
      category: form.get("category"),
      brand: form.get("brand"),
      instock: form.get("instock") === "true",
      stockCount: parseInt(form.get("stockCount")) || 0,
      featured: form.get("featured") === "true",
      discount: parseFloat(form.get("discount")) || 0,
      images: [],
      options: JSON.parse(form.get("options") || "{}"),
    };

    // Save product first (without images)
    const newProduct = new Product(productData);
    const savedProduct = await newProduct.save();
    
    // Handle multiple files
    const files = form.getAll("images"); // <input name="files" multiple />
const uploadedUrls = [];

for (let i = 0; i < files.length; i++) {
  const file = files[i];

  if (!(file instanceof File)) {
    console.warn("Skipping non-file item:", file);
    continue;
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  if (!buffer || buffer.length === 0) continue;

  // Upload to Cloudinary
  const url = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "products",
        public_id: `${savedProduct._id}_${i}`,
        resource_type: "image",
        overwrite: true,
      },
      (err, result) => {
        if (err) reject(err);
        else resolve(result.secure_url);
      }
    );
    streamifier.createReadStream(buffer).pipe(uploadStream);
  });

  uploadedUrls.push(url);
}

    
    // Save uploaded image URLs
    savedProduct.images = uploadedUrls;
    await savedProduct.save();

    return NextResponse.json(
      { success: true, message: "Product added successfully", product: savedProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { success: false, message: "Error adding product", error: error.message },
      { status: 400 }
    );
  }
}
