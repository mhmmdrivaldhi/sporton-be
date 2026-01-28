import { Request, Response } from "express";
import Product from "../models/product_model";

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productData = req.body;
        if (req.file) {
            productData.imageUrl = req.file.path;
        }

        const product = new Product(productData)
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({message: "Error Creating Product", error})
        return
    }
};

export const getProducts = async (req: Request, res: Response): Promise<void> => {
    try {
        const products = await Product.find().populate("category").sort({createdAt: - 1})
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message: "Error Fetching Products", error})
        return
    }
}

export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = await Product.findById(req.params.id).populate("category");
        if (!productId) {
            res.status(404).json({message: "Product Not Found"})
            return
        }

        res.status(200).json(productId);
    } catch (error) {
        res.status(500).json({meessage: "Error Fetching Product", error})
        return
    }
}

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productData = req.body;
        if (req.file) {
            productData.imageUrl = req.file.path;
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            productData,
            {new: true}
        );

        if (!product) {
            res.status(404).json({message: "Product Not Found"})
            return
        }

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message: "Error Updating Product", error})
        return
    }
}

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            res.status(404).json({message: "Product Not Found"})
            return
        }

        res.status(200).json({message: "Product Deleted Successfully"});
    } catch (error) {
        res.status(500).json({message: "Error Deleting Product", error})
        return
    }
}