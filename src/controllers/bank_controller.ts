import { Request, Response } from "express";
import Bank from "../models/bank_model";

export const createBank = async (req: Request, res: Response): Promise<void> => {
    try {
        const bank = new Bank(req.body);
        await bank.save();
        res.status(201).json(bank);
    } catch (error) {
        res.status(500).json({message: "Error Creating Bank", error});
        return
    }
}

export const getBanks = async (req: Request, res: Response): Promise<void> => {
    try {
        const banks = await Bank.find().sort({ createdAt: -1 });
        res.status(200).json(banks);
    } catch (error) {
        res.status(500).json({message: "Error Fetching Banks", error});
        return
    }
}

export const getBankById = async (req: Request, res: Response): Promise<void> => {
    try {
        const bank = await Bank.findById(req.params.id);
        if (!bank) {
            res.status(404).json({message: "Bank Not Found"});
            return
        }
        res.status(200).json(bank);
    } catch (error) {
        res.status(500).json({message: "Error Fetching Bank", error});
        return
    }
}

export const updateBank = async (req: Request, res: Response): Promise<void> => {
    try {
        const bank = await Bank.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true });
        if (!bank) {
            res.status(404).json({message: "Bank Not Found"});
            return
        }
        res.status(200).json(bank);
    } catch (error) { 
        res.status(500).json({message: "Error Updating Bank", error});
        return
    }
}

export const deleteBank = async (req: Request, res: Response): Promise<void> => {
    try {
        const bank = await Bank.findByIdAndDelete(req.params.id);
        if (!bank) {
            res.status(404).json({message: "Bank Not Found"});
            return
        }
        res.status(200).json({message: "Bank Deleted Successfully"});
    } catch (error) {
        res.status(500).json({message: "Error Deleting Bank", error});
        return
    }
}

