const baseUrl = process.env.REACT_APP_BASEURL;

const editProduct = async (product, modalToggle, getProducts) => {
  console.log(product);
  modalToggle();

  try {
    const response = await fetch(`${baseUrl}/editproduct`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });

    if (!response.ok) {
      throw new Error("Error al actualizar el producto");
    }

    const result = await response.json();
    console.log(result);
    await getProducts();
    modalToggle();
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
  }
};

export default editProduct;
