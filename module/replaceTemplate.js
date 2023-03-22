module.exports = (temp, product) => {
  let output = temp.replace(/{PRODUCT_NAME}/g, product.productName);
  output = output.replace(/{IMAGE}/g, product.image);
  output = output.replace(/{FROM}/g, product.from);
  output = output.replace(/{NUTRIENTS}/g, product.nutrients);
  output = output.replace(/{QUANTITY}/g, product.quantity);
  output = output.replace(/{PRODUCT_ID}/g, product.id);
  output = output.replace(/{PRICE}/g, product.price);

  if (!product.organic) {
    output = output.replace(/{IS_ORGANIC}/g, "not-organic");
  }
  output = output.replace(/{DESCRIPTION}/g, product.description);
  return output;
};
