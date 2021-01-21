import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Proizvod nije pronađen");
  }
});

// @desc Delete a product
// @route DELETE /api/products/:id
// @access Private/Admin 
const deleteProduct = asyncHandler(async(req, res)=>{
  const product = await Product.findById(req.params.id)
  if(product){
    await product.remove()
    res.json({ message: 'Proizvod je izbrisan.' })
  }else{
    res.status(404)
    throw new Error('Proizvod nije pronađen.')
  }
})

// @desc Create a product
// @route POST /api/products
// @access Private/Admin 
const createProduct = asyncHandler(async(req, res)=>{
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description'
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
})

// @desc Update a product
// @route PUT /api/products/:id
// @access Private/Admin 
const updateProduct = asyncHandler(async(req, res)=>{
  const product = await Product.findById(req.params.id)
  const { name, price, description, image, brand, category, countInStock } = req.body
  if(product){
    product.name= name
    product.price= price
    product.image= image
    product.brand= brand
    product.category= category
    product.countInStock= countInStock
    product.description= description

    const updatedProduct = product.save()

    res.json(updatedProduct)

  }else {
    res.status(404)
    throw new Error('Proizvod nije pronađen.')
  }
})

// @desc Create new review
// @route POST /api/products/:id/reviews
// @access Private 
const createProductReview = asyncHandler(async(req, res)=>{
  const product = await Product.findById(req.params.id)
  const { rating, comment } = req.body
  
  if(product){
    
    const alrearyReviewed = product.review.find( r => r.user.toString() === req.user._id.toString())

    if(alrearyReviewed){
      res.status(400)
      throw new Error('Proizvod je već dobio recenziju.')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id
    }

    product.reviews.push(review)
    
    product.numReviews = product.reviews.length
    
    product.rating = product.reviews.reduce((acc,item)=> item.rating + acc,0) / product.reviews.length

    await product.save()
    res.status(201).json({ message: 'Recenzija dodana' })

  }else {
    res.status(404)
    throw new Error('Proizvod nije pronađen.')
  }
})

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview };
