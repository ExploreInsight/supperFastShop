import { StatusCodes } from "http-status-codes";
import Product from "../models/product.model.js";

// One cart line per product + size.
export const getCartProducts = async (req, res) => {
  try {
    const userCart = req.user.cartItems;
    const productIds = userCart.map((item) => item.product);
    const products = await Product.find({ _id: { $in: productIds } });

    const finalCartItems = userCart
      .map((item) => {
        const product = products.find((p) => p._id.toString() === item.product.toString());
        if (!product) return null;
        return { ...product.toJSON(), quantity: item.quantity, size: item.size || "" };
      })
      .filter(Boolean);

    res.json(finalCartItems);
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const addToCart = async (req, res) => {
  try {
    const { productId, size = "" } = req.body;
    const user = req.user; // Authenticated user from middleware

    if (!productId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Product ID is required" });
    }

    // Check if product already exists in cart
    const existingItem = user.cartItems.find(
      (item) => item.product.toString() === productId && (item.size || "") === size
    );

    if (existingItem) {
      // If exists, increment quantity
      existingItem.quantity += 1;
    } else {
      // If not exists, push new item
      user.cartItems.push({ product: productId, quantity: 1, size });
    }

    await user.save(); // Save the updated user with new cartItems

    res.status(StatusCodes.OK).json({
      message: "Product added to cart",
      cartItems: user.cartItems,
    });
  } catch (error) {
    console.error("Error in addToCart:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

// export const removeAllFromCart = async (req, res) => {
//   try {
//     const { productId } = req.body;
//     const user = req.user;

//     if (!productId) {
//       user.cartItems = [];
//     }
//     user.cartItems = user.cartItems.filter((item) => item.id !== productId);

//     await user.save();

//     res.json(user.cartItems);
//   } catch (error) {
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ message: "Internal Server Error" });
//   }
// };

export const removeAllFromCart = async (req, res) => {
  try {
    const { productId, size = "" } = req.body;
    const user = req.user;

    if (!productId) {
      // Clear entire cart
      user.cartItems = [];
    } else {
      // Remove one product + size line
      user.cartItems = user.cartItems.filter(
        (item) => !(item.product.toString() === productId && (item.size || "") === size)
      );
    }
    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Internal Server Error" });
  }
};

//   try {
//     const { id: productId } = req.params;
//     const { quantity } = req.body;
//     const user = req.user;
//     const existingItem = user.cartItems.find((item) => item._id === productId);
//     console.log(existingItem, "existingItem" );   
//     if (!existingItem) {
//       res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" });
//     }

//     // if user makes quanttiy 0 then he does not need it in cart so checking that case
//     if (quantity === 0) {
//       user.cartItems = user.cartItems.filter((item) => item.id !== productId);
//       await user.save();
//       return res.json(user.cartItems);
//     }
//     existingItem.cartItems = quantity;
//     await user.save();
//     res.json(user.cartItems);
//   } catch (error) {
//     res
//       .status(StatusCodes.INTERNAL_SERVER_ERROR)
//       .json({ message: "Internal Server Error" });
//   }
// };
export const updateQuantity = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const { quantity, size = "" } = req.body;
    const user = req.user;
    const sameLine = (item) => item.product.toString() === productId && (item.size || "") === size;

    const existingItem = user.cartItems.find(sameLine);

    if (!existingItem) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" });
    }

    if (quantity === 0) {
      user.cartItems = user.cartItems.filter((item) => !sameLine(item));
    } else {
      existingItem.quantity = quantity;
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};

