import { Router } from "express";
import {createCategory, getCategories, getCategoryById, updateCategory, deleteCategory} from "../controllers/category_controller";
import { upload } from "../middleware/upload_middleware";
import { authenticate } from "../middleware/auth_middleware";

const router = Router();

router.post("/", authenticate, upload.single("image"), createCategory);
router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.put("/:id", authenticate, upload.single("image"), updateCategory);
router.delete("/:id", authenticate, deleteCategory);

export default router;