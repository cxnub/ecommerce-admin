import { ProductEntity } from "../../domain/entities/Product.entity";
import ProductFilters from "./productFilters";
import { Buffer } from "buffer";
import api from "../../../config/api";

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
  const response = await api.post("/products", {
    page: currentPage,
    limit: productsPerPage,
    statusIds: filters.statusFilter ? [filters.statusFilter] : null,
  });

  if (response.status !== 200) {
    throw new Error("Failed to fetch products");
  }

  return {
    products: response.data.products.map(
      (product: object) => new ProductEntity(product)
    ),
    maxPages: response.data.pagination.totalPages,
    filters,
  };
}

/**
 * Update a product.
 * @param productId The product ID.
 */
async function updateProduct(product: ProductEntity, blob: Blob | null = null) {
  let base64image = null;
  let imageExtension = null;

  // handle image
  if (blob) {
    imageExtension = blob.type.split("/")[1];
    base64image = await blobToBase64(blob);
    base64image = base64image.split("base64,")[1];
  }

  const response = await api.put(`/products/${product.id}`, {
    name: product.name,
    description: product.description,
    price: product.price,
    categoryId: product.categoryId,
    statusId: product.statusId,
    imageUrl: product.imageUrl,
    imageBytes: base64image ? base64image : null,
    imageExtension: base64image ? imageExtension : null,
  });

  if (response.status !== 200) {
    throw new Error("Failed to update product");
  }
}

/**
 * Analyzes a product image and returns the predicted product details.
 *
 * @param {File} image - The image file to analyze.
 * @param {boolean} create - Whether to create the product after analysis.
 * @return {Promise<ProductEntity>} A promise that resolves to the predicted product.
 * @throws {Error} If the image analysis fails or the API response is invalid.
 */
async function analyzeProductImage(image: File, create: boolean=false): Promise<[ProductEntity, number]> {
  // convert image to base64
  const base64image = await image.arrayBuffer().then((buffer) => {
    return Buffer.from(buffer).toString("base64");
  });

  // call the analyze product image api
  // and return the predicted product details
  const results = await api.post("/products/analyze", {
    imageBytes: base64image,
    imageExtension: image.name.split(".").pop(),
    create: create,
  });

  if (results.status !== 200) {
    throw new Error("Failed to analyze product image");
  }

  const data = await results.data;

  if (!data) {
    throw new Error("Failed to analyze product image");
  }

  return [new ProductEntity(data.product), data.confidence];
}

/**
 * Create a new product.
 * @param product The product to create.
 * @throws {Error} If the request fails.
 */
async function createProduct(product: ProductEntity): Promise<void> {
  const response = await api.post("/products/add", product.toObject());

  if (response.status !== 201) {
    throw new Error("Failed to create product");
  }
}

/**
 * Delete a product.
 * @param productId The id of the product to delete.
 */
async function deleteProduct(productId: number): Promise<void> {
  const response = await api.delete(`/products/${productId}`);
  if (response.status !== 200) {
    throw new Error("Failed to delete product");
  }

  return Promise.resolve();
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result?.toString() || "");
    reader.readAsDataURL(blob);
  });
}

export {
  getProducts,
  updateProduct,
  analyzeProductImage,
  createProduct,
  deleteProduct,
};
