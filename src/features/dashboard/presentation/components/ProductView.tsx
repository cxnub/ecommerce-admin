import { Pagination, SimpleGrid, Stack } from "@mantine/core";
import ProductCard from "./ProductCard/ProductCard";
import { getProducts } from "../../../../shared/data/api/Product.api";
import { useState } from "react";
import { ProductEntity } from "../../../../shared/domain/entities/Product.entity";
import { useQuery } from "@tanstack/react-query";
import ScrollToTopButton from "./ScrollToTopButton";

export default function ProductView() {
  const [currentPage, setCurrentPage] = useState(1);

  // query products
  const { data, status } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => getProducts({ currentPage: currentPage }),
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
        <SimpleGrid
          cols={{ base: 1, xs: 2, sm: 2, md: 3, lg: 4, xl: 5 }}
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
