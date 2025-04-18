import expres from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import couponsRoutes from "./routes/coupon.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import path from 'path';

const createApp = () => {
  const app = expres();
 
  const __dirname = path.resolve();

  app.use(expres.json({limit:"10mb"}));
  app.use(cookieParser());

  app.use("/api/auth", authRoutes);
  app.use("/api/product", productRoutes);
  app.use("/api/cart", cartRoutes);
  app.use("/api/coupons", couponsRoutes);
  app.use("/api/payment", paymentRoutes);
  app.use("/api/analytics", analyticsRoutes);

  if(process.env.NODE_ENV === "production"){
    app.use(expres.static(path.join(__dirname, "/client/dist")));

    app.get("*",(req, res)=>{
      res.sendFile(path.resolve(__dirname,"client","dist", "index.html"));
    })
  }
  
  return app;
};

export default createApp;
