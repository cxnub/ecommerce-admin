import {
  AppShell,
  Button,
  Flex,
  Progress,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import {
  analyzeProductImage,
  createProduct,
} from "../../../../shared/data/api/Product.api";

import JSZip from "jszip";

import { notifications } from "@mantine/notifications";
import AddProductHeader from "../components/header/AddProductsHeader";
import MultipleImageDropzone from "../components/dropzone/MultipleImageDropzone";
import { statusType } from "../../../../shared/domain/enums/product.enum";
import ImageCard from "../components/imageCard/ImageCard";
import { ProductEntity } from "../../../../shared/domain/entities/Product.entity";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../../../config/routes";
import classes from "./AddMultipleProduct.module.scss";

export default function AddMultipleProduct() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [processedProducts, setProcessedProducts] = useState<ProductEntity[]>(
    []
  );

  const handleImageUpload = (files: File[]) => {
    for (const file of files) {
      console.log("File detected: ", file.name);
      if (file.name.endsWith(".png") || file.name.endsWith(".jpg")) {
        setImageFiles((prevImages) => [...prevImages, file]);
        continue;
      }

      console.log("Zip file detected");
      // Create a new instance of JSZip
      const zip = new JSZip();

      // Load the zip file
      zip.loadAsync(file).then((unzipped) => {
        // Get the image files
        unzipped.forEach((_, file) => {
          // Check if the file is an image
          if (file.name.endsWith(".png") || file.name.endsWith(".jpg")) {
            // convert the file to a blob
            file.async("blob").then((blob) => {
              // Create a new file
              const imageFile = new File([blob], file.name, {
                type: blob.type,
              });

              // Add the file to the imageFiles
              setImageFiles((prevImages) => [...prevImages, imageFile]);
            });
          }
        });
      });
    }
  };

  const analyzeProductImages = async (
    files: File[]
  ): Promise<ProductEntity[]> => {
    setLoading(true);
    const products: ProductEntity[] = [];

    for (const file of files) {
      // Analyze the product image
      const analyzedProductData = await analyzeProductImage(file).then(
        (product) => {
          // Set the product status to pending review
          product.statusId = statusType.PENDING_REVIEW;

          // Set the product creation and update date
          product.createdAt = product.updatedAt = new Date();

          return product;
        }
      );

      // Create the product
      await createProduct(analyzedProductData).then(async (product) => {
        // Set the product
        products.push(product);
        setProcessedProducts((prevProducts) => [...prevProducts, product]);

        // remove the image from the imageFiles
        setImageFiles((prevImages) =>
          prevImages.filter((image) => image !== file)
        );
      });
    }

    return Promise.resolve(products);
  };

  const analyzeProductsImageMutation = useMutation({
    mutationFn: analyzeProductImages,
    onSuccess: (products) => {
      setLoading(false);
      notifications.show({
        title: "Products Created Successfully",
        message: (
          <>
            <Text>{products.length} product(s) have been saved as draft.</Text>
            <Text
              c="blue"
              component="button"
              onClick={() => navigate(routeNames.HomeScreen)}
            >
              Review and publish
            </Text>
          </>
        ),
        color: "green",
      });
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
      <AddProductHeader title="Add Multiple Products" />
      <AppShell.Main>
        <Flex justify="center" align="center" style={{ aspectRatio: 2 }}>
          <Stack w="100%" justify="center" align="center">
            <MultipleImageDropzone
              loading={loading}
              onDrop={handleImageUpload}
            />
            <Button
              onClick={() => {
                // reset processed products
                setProcessedProducts([]);

                // start the mutation
                analyzeProductsImageMutation.mutate(imageFiles);
              }}
              className={classes.createButton}
              disabled={loading || imageFiles.length === 0}
              variant="gradient"
              gradient={{ from: "blue", to: "cyan", deg: 45 }}
            >
              Create Products
            </Button>
            {loading && (
              <Progress
                display={loading ? "block" : "none"}
                value={
                  (processedProducts.length /
                    (processedProducts.length + imageFiles.length)) *
                  100
                }
                color="blue"
                radius="xl"
                size="lg"
                style={{ width: "90%" }}
              />
            )}
            <Text>
              {loading
                ? processedProducts.length +
                  " product(s) created out of " +
                  (imageFiles.length + processedProducts.length).toString()
                : imageFiles.length + " image(s) selected"}
            </Text>
            <SimpleGrid
              cols={{ base: 1, xs: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
              w="90%"
            >
              {imageFiles.map((image, index) => (
                <ImageCard
                  key={index}
                  image={image}
                  showXButton={!loading}
                  onXClick={() => {
                    setImageFiles(imageFiles.filter((_, i) => i !== index));
                  }}
                />
              ))}
            </SimpleGrid>
          </Stack>
        </Flex>
      </AppShell.Main>
    </>
  );
}
