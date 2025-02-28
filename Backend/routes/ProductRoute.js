import express from 'express';
import productModel from '../models/productModel.js';
import upload from '../middleware/multer.js';

const productRouter = express.Router();

productRouter.post('/add', upload.fields([{ name: 'image1', maxCount: 1 }, { name: 'image2', maxCount: 1 }, { name: 'image3', maxCount: 1 }, { name: 'image4', maxCount: 1 }]), async (req, res) => {
  try {
    const { name, description, price, category, bestseller } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    const images = [image1, image2, image3, image4].filter((item) => item !== undefined);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'auto' });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      bestseller: bestseller === 'true' ? true : false,
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({ success: true, message: 'Product added' });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
});

productRouter.post('/list', async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

productRouter.post('/remove', async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.body.id);
    if (product) {
      res.json({ success: true, message: 'Product removed' });
    } else {
      res.json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

productRouter.post('/single', async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);
    if (product) {
      res.json({ success: true, product });
    } else {
      res.json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
});

productRouter.get('/search', async (req, res) => {
  const { query } = req.query;
  try {
    const results = await productModel.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
      ],
    });
    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching search results', error: error.message });
  }
});

export { productRouter };
