import { Router } from "express";
import { createBank, getBanks, getBankById, updateBank, deleteBank } from "../controllers/bank_controller";
import { authenticate } from "../middleware/auth_middleware";

const router = Router();

router.post("/", authenticate, createBank);
router.get("/", getBanks);
router.get("/:id", getBankById);
router.put("/:id", authenticate, updateBank);
router.delete("/:id", authenticate, deleteBank);

export default router;