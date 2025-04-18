import { StatusCodes } from "http-status-codes";
import Product from "../models/product.model.js";

// Two ways to get the cart product 
// 1. Using populate method to get the product 

// export const getCartProducts = async (req, res) => {
//   try {
//     const usersCartItems = req.user.populate("cartItems.product");

//     const cartItems = await usersCartItems.map((item)=>{
//       const product = item.product.toObject();
//       return {
//         ...product,
//         quantity: item.quantity,
//       }
//     })
//     res.json(cartItems)
//   } catch (error) {
//     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
//   }
// }

// 2. Using find method to get the product {'For now i would be using this method cause this is new to me or whatever'}
export const getCartProducts = async (req, res) => {
  try {
    //  Get the user's cart
    const userCart = req.user.cartItems; 

    //  Get all product IDs from the cart
    const productIds = userCart.map((item) => item.product);

    //  Find all products from the DB that match those IDs
    const products = await Product.find({ _id: { $in: productIds } });

    // Combine each product with its quantity from the user's cart
    const finalCartItems = products.map((product) => {
      // Find the matching item in the user's cart
      const cartItem = userCart.find(
        (item) => item.product.toString() === product._id.toString()
      );

      
      return {
       ...product.toJSON(),
       quantity: cartItem.quantity
      };
    });

    //  Send the final cart to the frontend
    res.json(finalCartItems);
  } catch (error) {
    console.error("Error getting cart:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};


export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user; // Authenticated user from middleware

    if (!productId) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Product ID is required" });
    }

    // Check if product already exists in cart
    const existingItem = user.cartItems.find((item) =>
      item.product.toString() === productId
    );

    if (existingItem) {
      // If exists, increment quantity
      existingItem.quantity += 1;
    } else {
      // If not exists, push new item
      user.cartItems.push({ product: productId, quantity: 1 });
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
    const { productId } = req.body;
    const user = req.user;

    if (!productId) {
      // Clear entire cart
      user.cartItems = [];
    } else {
      // Remove specific product
      user.cartItems = user.cartItems.filter(
        (item) => item.product.toString() !== productId
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
    const { quantity } = req.body;
    const user = req.user;

    const existingItem = user.cartItems.find((item) => item.product.toString() === productId);

    if (!existingItem) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: "Product not found" });
    }

    if (quantity === 0) {
      user.cartItems = user.cartItems.filter((item) => item.product.toString() !== productId);
    } else {
      existingItem.quantity = quantity;
    }

    await user.save();
    res.json(user.cartItems);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal Server Error" });
  }
};

