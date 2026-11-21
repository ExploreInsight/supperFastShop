import { StatusCodes } from "http-status-codes";
import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import sharp from "sharp";
import mongoose from "mongoose";

// "S, M, L" -> ["S","M","L"]
const parseList = (value) =>
  (value ?? "")
    .toString()
    .split(",")
    .map((v) => v.trim().toUpperCase())
    .filter(Boolean);

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    if (!products) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No Product Found" });
    }
    res.json({ products });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

export const getFeaturedProducts = async (req, res) => {
  try {
    let featuredProducts = await redis.get("featured_products");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts)); // parse this data as redis stores it in string
    }
    //if not in the redis , fetch from the mongodb
    featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (!featuredProducts) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No featured Products" });
    }
    //store the productts in the redis for the future quick access
    await redis.set("featured_products", JSON.stringify(featuredProducts));

    res.json(featuredProducts);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

export const createProduct = async (req, res) => {
  try {
    // const { name, description, price, image, category } = req.body;

    const { name, description, price, category } = req.body;
    const sizes = parseList(req.body.sizes);
    const soldOutSizes = parseList(req.body.soldOutSizes);
    let cloudinaryResponse = null;

    if (req.file) {
      try {
        // compress the image using sharp
        const compressedImageBuffer = await sharp(req.file.buffer)
          .resize(800)
          .jpeg({ quality: 80 }) // convert to jpeg with 70% quality
          .toBuffer();

        cloudinaryResponse = await new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { folder: "Products" },

            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            }
          );
          uploadStream.end(compressedImageBuffer);
        });
      } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "Failed to upload image",
        });
      }
    }
    if (!cloudinaryResponse?.secure_url) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Image is required",
      });
    }

    // if (image) {
    //   try {
    //     cloudinaryResponse = await cloudinary.uploader.upload(image, {
    //       folder: "Products",
    //     });
    //   } catch (uploadError) {
    //     console.error("Cloudinary Upload Error:", uploadError);
    //     return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    //       message: "Failed to upload image"
    //     });
    //   }
    // }

    const product = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse.secure_url,
      category,
      ...(sizes.length ? { sizes } : {}),
      soldOutSizes,
    });
    res
      .status(StatusCodes.CREATED)
      .json({ product, message: "Product Created Successfully" });
  } catch (error) {
    console.error("Error creating product:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found" });
    }

    if (product.image) {
      const publicId = product.image.split("/").pop().split(".")[0];
      try {
        await cloudinary.uploader.destroy(`products/${publicId}`);
        console.log("Image Deleted from cloudinary");
      } catch (error) {
        console.log("Error deleting image from cloudinary", error);
      }
    }

    await Product.findByIdAndDelete(req.params.productId);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

// Todo : complete the function
export const getRecommendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          name: 1,
          description: 1,
          image: 1,
          price: 1,
        },
      },
    ]);
    res.json(products);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

export const getProductByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const products = await Product.find({ category });
    if (!products) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product Not found under this category" });
    }
    res.json({ products });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Product not found" });
    }
    product.isFeatured = !product.isFeatured;
    const updatedProduct = await product.save();
    await updateFeaturedProductsCache();
    res.json(updatedProduct);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

async function updateFeaturedProductsCache() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    console.log("Featured Products", featuredProducts);
    const redisStore = await redis.set(
      "featured_products",
      JSON.stringify(featuredProducts)
    );
    console.log("Redis Store", redisStore);
  } catch (error) {
    console.log("Error in update cache function", error);
  }
}


// GET /api/product/search?q=&category=&sort=&minPrice=&maxPrice=&page=&limit=
export const searchProducts = async (req, res) => {
  try {
    const { q = "", category, size, sort = "new", minPrice, maxPrice } = req.query;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = Math.min(48, Math.max(1, parseInt(req.query.limit) || 24));

    const filter = {};
    const term = q.toString().trim().slice(0, 60);
    if (term) {
      const safe = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      filter.$or = [
        { name: { $regex: safe, $options: "i" } },
        { description: { $regex: safe, $options: "i" } },
        { category: { $regex: safe, $options: "i" } },
      ];
    }
    if (category) filter.category = category;
    if (size) {
      // in the size run and not sold out
      filter.sizes = size.toString().toUpperCase();
      filter.soldOutSizes = { $ne: size.toString().toUpperCase() };
    }
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sorts = {
      new: { createdAt: -1 },
      "price-asc": { price: 1 },
      "price-desc": { price: -1 },
      rating: { ratingAverage: -1, ratingCount: -1 },
    };

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sorts[sort] || sorts.new)
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments(filter),
    ]);

    res.json({ products, total, page, pages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};

// GET /api/product/:id  (+ up to 4 related products from the same category)
export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid product id" });
    }
    const product = await Product.findById(id).lean();
    if (!product) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" });
    }
    const related = await Product.find({ category: product.category, _id: { $ne: product._id } })
      .limit(4)
      .lean();
    res.json({ product, related });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};
