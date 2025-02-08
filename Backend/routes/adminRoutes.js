// backend/routes/adminRoutes.js
import express from 'express';
import { protect, authorize } from '../middleware/authMiddleware.js';
import { getUsers, deleteUser, getOrders, updateOrderStatus, addProduct, editProduct, deleteProduct, getProducts } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.get('/users', protect, authorize(['admin']), getUsers);
adminRouter.delete('/users/:id', protect, authorize(['admin']), deleteUser);
adminRouter.get('/orders', protect, authorize(['admin']), getOrders);
adminRouter.put('/orders/:id', protect, authorize(['admin']), updateOrderStatus);
adminRouter.post('/products', protect, authorize(['admin']), addProduct);
adminRouter.put('/products/:id', protect, authorize(['admin']), editProduct);
adminRouter.delete('/products/:id', protect, authorize(['admin']), deleteProduct);
adminRouter.get('/products', protect, authorize(['admin']), getProducts);

export { adminRouter };
