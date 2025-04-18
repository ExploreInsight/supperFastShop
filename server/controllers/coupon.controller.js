import { StatusCodes } from "http-status-codes"
import Coupon from "../models/coupon.model.js"


export const getCoupon = async ( req , res)=>{
try {
    const coupon = await Coupon.findOne({userId: req.user._id,isActive:true});
    res.json(coupon || null)
} catch (error) {
     res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Internal Server Error"})
}
}

export const validateCoupon = async (req , res)=> {
    try {
        const {code} = req.body;
        const coupon = await Coupon.findOne({code:code,userId:req.user._id,isActive:true});

        if(!coupon){
            return res.status(StatusCodes.NOT_FOUND).json({message:'Coupon not found'})
        }

        if(coupon.expirationDate < new Date()){
            coupon.isActive = false;
            await coupon.save();
            return res.status(StatusCodes.GONE).json({message:"Coupon Expired"})
        }
        res.status(StatusCodes.OK).json({
            message:"Coupon valid",
            code:coupon.code,
            discountPercentage: coupon.discountPercentage
        })
    } catch (error) {
        console.error("Error validating coupon:", error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"Internal Server Error"}) 
    }
}