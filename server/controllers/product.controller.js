import { StatusCodes } from "http-status-codes";
import Product from "../models/product.model.js";
import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import sharp from "sharp";

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

    res.json({ featuredProducts });
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
