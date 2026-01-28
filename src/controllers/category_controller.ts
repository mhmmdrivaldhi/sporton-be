import { Request, Response } from "express";
import Category from "../models/category_model";

export const createCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryData = req.body;
        if (req.file) {
            categoryData.imageUrl = req.file.path;
        }

        const category = new Category(categoryData);
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({message: "Error Creating Category", error});
        return
    }
};

export const getCategories = async (req: Request, res: Response): Promise<void>  => {
    try {
        const categories = await Category.find().sort({createdAt: - 1});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({message: "Error Fetching Categories", error})
        return
    }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryId = await Category.findById(req.params.id);
        if (!categoryId) {
            res.status(404).json({message: "Category Not Found"})
            return
        } 
        res.status(200).json(categoryId);
    } catch (error) {
        res.status(500).json({message: "Error Fetching Category", error})
        return
    }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const categoryData = req.body;
        if (req.file) {
            categoryData.imageUrl = req.file.path;
        }

        const category = await Category.findByIdAndUpdate(
            req.params.id,
            categoryData,
            {new: true}
        );

        if (!category) {
            res.status(404).json({message: "Category Not Found"})
            return
        }

        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({message: "Error Updating Category", error})
        return
    }
};

export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id)

        if (!category) {
            res.status(404).json({message: "Category Not Found"})
            return
        }

        res.status(200).json({message: "Category Deleted Successfully"})
    } catch (error) {
        res.status(500).json({message: "Error Deleting Category", error})
        return
    }
}

