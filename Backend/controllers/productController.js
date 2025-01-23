import {v2 as cloudinary} from 'cloudinary';
import productModel from '../models/productModel.js';

//function for add product 
const addProduct = async (req, res) => {
  try {
    
    const {name, description, price, category, bestseller } = req.body

    const image1 = req.files.image1 && req.files.image1[0]
    const image2 = req.files.image2 && req.files.image2[0]
    const image3 = req.files.image3 && req.files.image3[0]
    const image4 = req.files.image4 && req.files.image4[0]
    console.log("typeof(image1)",typeof(image1));

    const images = [image1, image2, image3, image4].filter((item)=> item !== undefined) 

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path,{resource_type:'auto'});
        return result.secure_url

      })
    )
    
    const productData = {
      name,
      description,
      price: Number(price),
      category,
      bestseller: bestseller === 'true' ? true : false,
      image: imagesUrl,
      date : Date.now()
    }

    console.log(productData);
    const product = new productModel(productData);
    await product.save();

    res.json({success:true,message:"Product added"})

  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message})
    
  }

}

//function for list product 
const listProduct = async (req, res) => {

  try {

    const products = await productModel.find({});
    res.json({success:true,products});
    
  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message})
    
  }

}

//function for removing product 
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id)
    res.json({success:true,message:"Product removed"})
  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message})
    
  }

}

//function for add product 
const singleProduct = async (req, res) => {
  try {
    const {productId} = req.body
    const product = await productModel.findById(productId)
    res.json({success:true,product})
  } catch (error) {
    console.log(error);
    res.json({success: false, message: error.message})
    
  }

}

export {addProduct, listProduct, removeProduct, singleProduct};