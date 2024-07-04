import { Pagination, SimpleGrid, Stack, Text } from "@mantine/core";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ProductCard from "../ProductCard/ProductCard";
import ScrollToTopButton from "../ScrollToTopButton";
import StatusFilter from "../filters/StatusFilter";

import { ProductEntity } from "../../../../../shared/domain/entities/product.entity";
import ProductFilters from "../../../../../shared/data/api/productFilters";
import { getProducts } from "../../../../../shared/data/api/product.api";

import classes from "./ProductView.module.css";

export default function ProductView() {
  // current page state
  const [currentPage, setCurrentPage] = useState(1);

  // filter state
  const [statusFilter, setStatusFilter] = useState<number>(0);

  // reset the current page when the status filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [statusFilter]);

  // query products
  const { data, status } = useQuery({
    queryKey: ["products", currentPage, statusFilter],
    queryFn: () =>
      getProducts({
        currentPage: currentPage,
        filters: new ProductFilters(statusFilter),
      }),
  });

  // handle error
  if (status === "error") {
    return <div>Error</div>;
  }

  // handle pending and success states
  if (status === "success" || status === "pending") {
    const products = data?.products as ProductEntity[];
    const maxPages = data?.maxPages as number;

    return (
      <Stack justify="center" align="center">
        <StatusFilter
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />
        {
          // show no products found message
          products && products.length === 0 && (
            <div>
              <Text ta="center" className={classes.noProductsFoundText}>
                Oops! No products found.
                <br />
              </Text>
              <Text ta="center">Try changing the filters.</Text>
            </div>
          )
        }
        <SimpleGrid
          cols={{ base: 1, xs: 2, sm: 2, md: 3, lg: 4 }}
          pt={20}
          miw="85%"
          maw="95%"
        >
          {products
            ? products.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })
            : Array.from({ length: 12 }).map((_, index) => {
                return <ProductCard key={index} />;
              })}
        </SimpleGrid>
        <Pagination
          total={maxPages}
          value={currentPage}
          onChange={(page) => {
            setCurrentPage(page);

            // scroll to the top of the page
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
        <ScrollToTopButton />
      </Stack>
    );
  }
}
