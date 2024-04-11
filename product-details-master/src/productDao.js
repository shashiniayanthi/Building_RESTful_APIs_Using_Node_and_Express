
//import fs module
const { json } = require('express');
const fs = require('fs');

//The getProducts function take done as callback
//It will read the product.json file

const getProducts = function(done){
    fs.readFile('src/products.json', (err, fileContent) => {
      if(err){
        console.log(err)
        return done ("Encountered Error while getting Prodcut details.")
      }

      let productData = JSON.parse(fileContent);
      return done(undefined,productData)

    })

//parse the filecontent and save it in another varible say productdata
//return the callback with first parameter as undefined and second parameter as productdata
       
}


//The function getProductById will take two parameters first the id and second the callback
//It will read the product.json file
const getProductById = function(id,done){
    //write all the logical steps
    //return the callback with first parameter as undefined and second parameter as productDetails
    fs.readFile('src/products.json', (err, fileContent) => {
      if(err){
        console.log(err)
        return done ("Encountered Error while getting Prodcut details.")
      }
      let productData = JSON.parse(fileContent);
      const fetchedProdcut = productData.find(product => product.id === parseInt(id))
      if(fetchedProdcut === undefined){
        return done("No Prodcut found for Requested product ID")
      }

      return done(undefined,fetchedProdcut)  
    });
}


//The saveProductDetails method will take productDetails and done as callback
//It will read the product.json file
const saveProductDetails = function (ProductDetails, done) {
  //write all the logical steps
  //parse the filecontent and save it in another varible say productdata
  //push the productDetails in the productData
  fs.readFile('src/products.json', (err, fileContent) => {
    if(err){
      console.log(err)
      return done ("Encountered Error while getting Prodcut details.")
    }

    let productData = JSON.parse(fileContent); 
    let index = productData.findIndex(prodcut => prodcut.id === ProductDetails.id)
    if (index === -1){
      if(ProductDetails.id === undefined){
        if (productData.length === 0) {
          ProductDetails.id = 1
        }else{

          let maxId = productData[0].id; // Initialize maxId with the first ID

          for (let i = 1; i < productData.length; i++) {
              if (productData[i].id > maxId) {
                  maxId = productData[i].id; // Update maxId if current ID is greater
              }
          }
          ProductDetails.id = maxId + 1 
        }
      }
      productData.push(ProductDetails);

      fs.writeFile('src/products.json', JSON.stringify(productData),(err, updatedContent) =>{
        if (err) {
          return done("Encountered error while updating prodcut details.")
        }
        return done(undefined,ProductDetails)
      })
    } else{
      return done("Already a prodcut exsits on the given id.")
    }
    //Write the productData into the file 
    //return the callback with undefined and ProductDetails

  });  
     
  }

  const updateProductDetails = function (id, updatedProductData, done) {
    fs.readFile('src/products.json', (err, fileContent) => {
      if(err){
        console.log(err)
        return done ("Encountered Error while getting Prodcut details.")
      }
      let productData = JSON.parse(fileContent);
      let index = productData.findIndex(prodcut => prodcut.id === parseInt(id))

      if (index === -1){
        return done("No Prodcct found for requested prodcut id !!")
      }

      productData[index] = { ...productData[index], ...updatedProductData};
      fs.writeFile('src/products.json', JSON.stringify(productData),(err, updatedContent) =>{
        if (err) {
          return done("Encountered error while updating prodcut details.")
        }
        return done(undefined,"Successfully Updated prodcut Details.")
      })
    });
  }

  //The method deleteProductById will take productId and done as parameters
  //It will read the product.json file

  const deleteProductById = function(productId, done){
    //Write all the logical steps
     //return the callback with first parameter as undefined and second parameter as productDetails
     fs.readFile('src/products.json', (err, fileContent) => {
      if(err){
        console.log(err)
        return done ("Encountered Error while getting Prodcut details.")
      }
      let productData = JSON.parse(fileContent);
      let index = productData.findIndex(prodcut => prodcut.id === parseInt(productId))
      if (index === -1){
        return done("No Prodcut found for Requested product ID")
      }
      productData.splice(index,1)
      console.log("productData",productData)
      fs.writeFile('src/products.json', JSON.stringify(productData),(err, updatedContent) =>{
        if (err) {
          return done("Encountered error while updating prodcut details.")
        }
        return done(undefined,"Successfully Deleted the product.")
      })  
    });
  }


module.exports ={
    getProducts,
    getProductById,
    saveProductDetails,
    updateProductDetails,
    deleteProductById
}