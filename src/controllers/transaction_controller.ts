import { Request, Response } from "express";
import Transaction from "../models/transaction_model";
import Product from "../models/product_model";

export const createTransaction = async (req: Request, res: Response): Promise<void> => {
  try {
    const transactionData = req.body;
    if (req.file) {
        transactionData.paymentProof = req.file.path;
    } else {
        res.status(400).json({ message: "Payment proof file is required." });
        return;
    }

    if (typeof transactionData.purchasedItems === 'string') {
        try {
            transactionData.purchasedItems = JSON.parse(transactionData.purchasedItems);
        } catch (error) {
            res.status(400).json({ message: "Invalid format for purchasedItems." });
            return;
        }
    }

    transactionData.status = "pending";

    const transaction = new Transaction(transactionData);
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({message: "Error creating transaction", error});
    return;
  }
}

export const getTransactions = async (req: Request, res: Response): Promise<void> => {
    try {
        const transactions = await Transaction.find().sort({ createdAt: -1 }).populate("purchasedItems.productId");
        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({message: "Error retrieving transactions", error});
        return;
    }
}

export const getTransactionsById = async (req: Request, res: Response): Promise<void> => {
    try {
        const transaction = await Transaction.findById(req.params.id).populate("purchasedItems.productId");
        if (!transaction) {
            res.status(404).json({ message: "Transaction not found" });
            return;
        }
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({message: "Error retrieving transaction", error});
        return;
    }
};

export const updateTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
        const { status } = req.body;
        const existingTransation = await Transaction.findById(req.params.id);
        if (!existingTransation) {
            res.status(404).json({ message: "Transaction not found" });
            return;
        }

        if (status == "paid" && existingTransation.status !== "paid") {
            for (const item of existingTransation.purchasedItems) {
                await Product.findByIdAndUpdate(item.productId, 
                { $inc: { stock: -item.qty }})
            }
        }

        const transaction = await Transaction.findByIdAndUpdate(
            req.params.id,
            { status },
            { new: true }
        );
        res.status(200).json(transaction);
    } catch (error) {
        res.status(500).json({message: "Error updating transaction status", error});
        return
    }
}