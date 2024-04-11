// Import the necessary dependencies
const lodash = require("lodash");
const productsList = require("./products.json").products;


const getProducts = () => {
  // get all products
  return JSON.stringify(productsList);
}

const getProductsById = (productId, done) => {
  const product = productsList.find(ptd => ptd.id === parseInt(productId));
  if (!product) {
    const error = new Error("Requested product doesn't exist..!");
    return done(error.message, null);
  }
  done(null, JSON.stringify(product));
};


const saveProduct = (newProduct, done) => {
  const product = productsList.find(product => product.id === newProduct.id);
  if(!product){
    productsList.push(newProduct);
    return done(null, JSON.stringify(productsList));
  }else{
    const error = new Error("Product already exists..!");
    return done(error.message, null);
  }
  
};

const updateProduct = (productId, updateData, done) => {
  const newproductsListArray = [...productsList];
  const index = newproductsListArray.findIndex(product => product.id == productId);
  if (index !== -1) {
    newproductsListArray[index] = { ...newproductsListArray[index], ...updateData };
    done(null, JSON.stringify(newproductsListArray));
  }else{
    const error = new Error("Requested product doesn't exist..!");
    return done(error.message, null);
  }
}

const deleteProduct = (productId, done) => {
  const productIndex = productsList.findIndex(ptd => ptd.id === parseInt(productId));
  if (productIndex === -1) {
      const error = new Error("Requested product doesn't exist..!");
      return done(error.message, null);
  }else{
    productsList.splice(productIndex, 1);
    done(null, JSON.stringify(productsList));
  }
};


module.exports = {
  getProducts,
  getProductsById,
  saveProduct,
  updateProduct,
  deleteProduct
}