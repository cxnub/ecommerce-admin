import { ProductEntity } from "../../domain/entities/Product.entity";
import MockProductData from "../MockProductData.json";


type GetProductsReturnType = {
  products: ProductEntity[];
  maxPages: number;
};

/**
 * Get the products for the current page.
 * @param currentPage The current page.
 * @param productsPerPage The number of products per page.
 * @returns The products for the current page.
 */
async function getProducts({
  currentPage = 1,
  productsPerPage = 12,
}: {
  currentPage?: number;
  productsPerPage?: number;
}): Promise<GetProductsReturnType> {
  // calculate the start and end index of the products
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  // get the products for the current page
  const products = MockProductData.slice(startIndex, endIndex);

  // get the max number of pages
  const maxPages = Math.ceil(MockProductData.length / productsPerPage);

  // simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // return the products
  return Promise.resolve(
    {
      products: products.map((product) => new ProductEntity(product)),
      maxPages,
    }
  );
}

/**
 * Update a product.
 * @param productId The product ID.
 * @returns The product.
 */
function updateProduct(product: ProductEntity): Promise<ProductEntity> {
  product.updatedAt = new Date();
  return Promise.resolve(product);
}

/**
 * Analyze product image.
 * @param image The image to analyze.
 * @returns The predicted product details.
 */
 function analyzeProductImage(image: File): Promise<ProductEntity> {
  return new Promise((resolve) => {
    // simulate a delay
    setTimeout(() => {
      // create a new product entity
      const product = new ProductEntity({
        name: "New Product",
        category: "Earring",
        categoryId: 1,
        price: 0,
        imageUrl: URL.createObjectURL(image)
      });

      // resolve the promise with the product
      resolve(product);
    }, 1000);
  });
 }


/**
 * Create a new product.
 * @param product The product to create.
 * @returns The created product.
 */
function createProduct(product: ProductEntity): Promise<ProductEntity> {
  product.id = MockProductData.length + 1;
  product.createdAt = new Date();
  product.updatedAt = new Date();
  return Promise.resolve(product);
}

/**
 * Delete a product.
 * @param product The product to delete.
 */
function deleteProduct(): Promise<void> {
  return Promise.resolve();
}

export { getProducts, updateProduct, analyzeProductImage, createProduct, deleteProduct};
