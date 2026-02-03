import { Router } from "express";
import { authenticate } from "../middleware/auth_middleware";
import { createTransaction, getTransactions, getTransactionsById, updateTransaction } from "../controllers/transaction_controller";
import { upload } from "../middleware/upload_middleware";

const router = Router();

router.post("/checkout", upload.single("image"), createTransaction);
router.get("/", authenticate, getTransactions);
router.get("/:id", getTransactionsById);
router.put("/:id", authenticate, updateTransaction);

export default router;