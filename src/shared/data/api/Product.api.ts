import { ProductEntity } from "../../domain/entities/Product.entity";
import MockProductData from "../MockProductData.json";
import ProductFilters from "./productFilters";

type GetProductsReturnType = {
  products: ProductEntity[];
  maxPages: number;
  filters?: ProductFilters;
};

/**
 * Get the products for the current page.
 * @param currentPage The current page.
 * @param productsPerPage The number of products per page.
 * @param filters The filters to apply.
 * @returns The products for the current page.
 */
async function getProducts({
  currentPage = 1,
  productsPerPage = 12,
  filters = new ProductFilters(),
}: {
  currentPage?: number;
  productsPerPage?: number;
  filters?: ProductFilters;
}): Promise<GetProductsReturnType> {
  // set max pages
  let maxPages = 1;

  // calculate the start and end index of the products
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;

  // get all the products
  let products = MockProductData;

  // filter the products if a status filter is applied
  if (filters.statusFilter) {
    products = MockProductData.filter((product) => {
      return product.statusId === filters.statusFilter;
    });

    // set the max number of pages
    maxPages = Math.ceil(products.length / productsPerPage);
  } else {
    // set the max number of pages
    maxPages = Math.ceil(MockProductData.length / productsPerPage);
  }

  // get the products for the current page
  products = products.slice(startIndex, endIndex);

  // simulate a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // return the products
  return Promise.resolve({
    products: products.map((product) => new ProductEntity(product)),
    maxPages,
    filters,
  });
}

/**
 * Update a product.
 * @param productId The product ID.
 * @returns The product.
 */
function updateProduct(product: ProductEntity): Promise<ProductEntity> {
  product.updatedAt = new Date();

  // simulate a delay
  return new Promise((resolve) =>
    setTimeout(() => {
      // resolve the promise with the updated product
      resolve(product);
    }, 1000)
  );
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
        category: "1",
        description: "New Product Description",
        categoryId: 1,
        price: 0,
        imageUrl: URL.createObjectURL(image),
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

  // simulate a delay
  return new Promise((resolve) => {
    setTimeout(() => {
      // resolve the promise with the created product
      resolve(product);
    }, 1000);
  });
}

/**
 * Delete a product.
 * @param product The product to delete.
 */
function deleteProduct(): Promise<void> {
  return Promise.resolve();
}

export {
  getProducts,
  updateProduct,
  analyzeProductImage,
  createProduct,
  deleteProduct,
};
