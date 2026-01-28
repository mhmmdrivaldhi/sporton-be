import { Router } from "express";
import {createProduct, getProducts, getProductById, updateProduct, deleteProduct} from "../controllers/product_controller";
import { upload } from "../middleware/upload_middleware";
import { authenticate } from "../middleware/auth_middleware";

const router = Router();

router.post("/", authenticate, upload.single("image"), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", authenticate, upload.single("image"), updateProduct);
router.delete("/:id", authenticate, deleteProduct);

export default router;