const Product = require('../models/Product');
const { sendSuccess, sendCreated, sendError } = require('../utils/response');

// Get all products with filters
const getProducts = async (req, res, next) => {
    try {
        const { category, color, size } = req.query;

        let filter = {};
        if (category) filter.category = category;
        if (color) filter.color = color;
        if (size) filter.size = size;

        const products = await Product.find(filter);
        sendSuccess(res, products);
    } catch (error) {
        next(error);
    }
};

// Get a single product by ID
const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }
        sendSuccess(res, product);
    } catch (error) {
        next(error);
    }
};

// Create a new product
const createProduct = async (req, res, next) => {
    try {
        const product = await Product.create(req.body);
        sendCreated(res, product);
    } catch (error) {
        next(error);
    }
};

// Update a product
const updateProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }
        sendSuccess(res, product);
    } catch (error) {
        next(error);
    }
};

// Delete a product
const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }
        sendSuccess(res, { message: 'Product deleted' });
    } catch (error) {
        next(error);
    }
};

// Search products
const searchProducts = async (req, res, next) => {
    try {
        const { query } = req.query;
        const products = await Product.find({
            name: new RegExp(query, 'i'),
        });
        sendSuccess(res, products);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
};
