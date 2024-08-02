import { AppShell, Flex } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useState } from "react";

import { useMutation } from "@tanstack/react-query";

import { analyzeProductImage } from "../../../../shared/data/api/Product.api";
import { ProductEntity } from "../../../../shared/domain/entities/Product.entity";
import SingleImageDropzone from "../components/dropzone/SingleImageDropzone";
import CreateProductForm from "../components/forms/CreateProductForm";
import AddProductHeader from "../components/header/AddProductsHeader";

export default function AddSingleProductScreen() {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductEntity | null>(null);
  const [confidence, setConfidence] = useState(0);

  const handleImageUpload = async (file: File) => {
    setLoading(true);
    return await analyzeProductImage(file);
  };

  const analyzeProductImageMutation = useMutation({
    mutationFn: handleImageUpload,
    onSuccess: (data) => {
      const [product, confidence] = data;
      setProduct(product);
      setConfidence(confidence);
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      notifications.show({
        title: "An Error Occurred, Please Try Again.",
        message: error.message,
        color: "red",
      });
    },
  });

  return (
    <>
      <AddProductHeader title="Add Single Product" />
      <AppShell.Main>
        <Flex justify="center" align="center" style={{ aspectRatio: 2 }}>
          {product == null ? (
            <SingleImageDropzone
              loading={loading}
              onDrop={(files) => {
                analyzeProductImageMutation.mutate(files[0]);
              }}
            />
          ) : (
            <CreateProductForm
              product={product}
              confidence={confidence}
              cancelFunction={() => setProduct(null)}
            />
          )}
        </Flex>
      </AppShell.Main>
    </>
  );
}
