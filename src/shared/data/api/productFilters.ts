class ProductFilters {
  statusFilter: number | null;

  constructor(statusFilter? : number) {
    this.statusFilter = null;

    if (statusFilter) {
      this.statusFilter = statusFilter === 0 ? null : statusFilter; 
    }
  }
}

export default ProductFilters;
