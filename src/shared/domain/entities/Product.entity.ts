interface ProductData {
  id? : number;
  name? : string;
  description? : string;
  categoryId? : number;
  statusId? : number;
  category? : string;
  status? : string;
  price? : number;
  imageUrl? : string;
  createdAt? : string;
  updatedAt? : string;
}

interface ProductStatusData {
  id: number;
  status: string;
}

interface ProductCategoryData {
  id: number;
  name: string;
}

class ProductEntity {
  id? : number;
  name? : string;
  description? : string;
  categoryId? : number;
  statusId? : number;
  category? : string;
  status? : string;
  price? : number;
  imageUrl? : string;
  createdAt? : Date;
  updatedAt? : Date;

    constructor(private data: ProductData) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description;
    this.categoryId = data.categoryId;
    this.statusId = data.statusId;
    this.category = data.category;
    this.status = data.status;
    this.price = data.price;
    this.imageUrl = data.imageUrl;
    this.createdAt = new Date(data.createdAt!);
    this.updatedAt = new Date(data.updatedAt!);
  }

  toObject(): ProductData {
    return this.data;
  }

  isEmpty(): boolean {
    return !this.id;
  }
}

export type { ProductData, ProductStatusData, ProductCategoryData};
export { ProductEntity };
