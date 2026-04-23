const getProducts = (req, res) => {
    res.json([
        {id: 1, name: 'Sample Product', price: 100}
    ]);
}; 

const createProduct = (req, res) => {
    res.json({
        message: 'Product created (dummy)'
    });
};

module.exports = {
    getProducts, 
    createProduct,
}