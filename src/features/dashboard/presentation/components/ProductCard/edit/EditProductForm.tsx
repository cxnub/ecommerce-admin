import {
  Button,
  NativeSelect,
  TextInput,
  Image,
  Stack,
  Textarea,
  Text,
  LoadingOverlay,
  Flex,
  Overlay,
  Center,
  FileInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { notifications } from "@mantine/notifications";
import { useMutation } from "@tanstack/react-query";
import { useRef, useState } from "react";
import { updateProduct } from "../../../../../../shared/data/api/product.api";
import { ProductEntity } from "../../../../../../shared/domain/entities/product.entity";
import { statusType } from "../../../../../../shared/domain/enums/product.enum";
import CustomOverlayLoader from "../../../../../../shared/presentation/components/loader/CustomOverlayLoader";

import classes from "./EditProductForm.module.scss";

enum SubmitType {
  Publish = "publish",
  Draft = "draft",
}

type EditProductFormProps = {
  product: ProductEntity;
  cancelFunction: () => void;
  setOpened: (value: boolean) => void;
};

type FormData = {
  imageUrl: string;
  name: string;
  description: string;
  price: number;
  categoryId: number;
};

export default function EditProductForm({
  product,
  cancelFunction,
  setOpened,
}: EditProductFormProps) {
  const [submitType, setSubmitType] = useState<SubmitType | null>(null);
  const imageInputRef = useRef<HTMLButtonElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      imageUrl: product.imageUrl!,
      name: product.name!,
      description: product.description!,
      price: product.price!,
      categoryId: product.categoryId!,
    },
    validate: {
      name: (value) => {
        if (value.length < 3) {
          return "Name must be at least 3 characters long";
        }
      },
      description: (value) => {
        if (value.length > 1000) {
          return "Description cant exceed 1000 characters";
        }
      },
      price: (value) => {
        if (value < 0) {
          return "Price must be greater than or equal to 0";
        }
      },
    },
  });

  const handleSubmit = (values: FormData) => {
    const newProduct = new ProductEntity({
      ...values,
      statusId:
        submitType === SubmitType.Publish
          ? statusType.ACTIVE
          : statusType.PENDING_REVIEW,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    });

    console.log(newProduct);

    return updateProduct(newProduct);
  };

  const submitMutation = useMutation({
    mutationFn: handleSubmit,
    onSuccess: () => {
      setOpened(false);
      notifications.show({
        title: `Product ${
          submitType == SubmitType.Publish ? "Updated" : "Saved"
        } Successfully`,
        message:
          submitType === SubmitType.Publish
            ? "Your product has been updated!"
            : "Your product has been saved as draft",
        color: "teal",
      });
    },
  });

  return (
    <>
      <Flex
        className={classes.image}
        justify="center"
        align="center"
        pos="relative"
      >
        <Image
          ref={imageRef}
          src={form.values.imageUrl}
          fallbackSrc="	https://placehold.co/600x400?text=Error"
          alt="Product Image"
          maw="50%"
          fit="cover"
        />
        <Overlay
          className={classes.imageOverlay}
          component="button"
          blur={1}
          onClick={() => imageInputRef.current?.click()}
        >
          <Center h="100%">
            <Text>Edit Image</Text>
          </Center>
        </Overlay>
      </Flex>
      <Stack justify="flex-end" flex={1} mt={16} h="70%">
        <form
          onSubmit={form.onSubmit((values) => submitMutation.mutate(values))}
        >
          <LoadingOverlay
            visible={submitMutation.isPending}
            loaderProps={{
              children: (
                <CustomOverlayLoader
                  text={
                    submitType === SubmitType.Publish
                      ? "Updating product..."
                      : "Saving product as draft..."
                  }
                />
              ),
            }}
          />
          <FileInput
            {...form.getInputProps("imageUrl")}
            unstyled
            hidden
            onChange={(file) => {
              if (file) {
                // update image preview
                form.setFieldValue('imageUrl', URL.createObjectURL(file));

                // update image src
                imageRef!.current!.src = URL.createObjectURL(file);
              }
            }}
            key={form.key("imageUrl")}
            ref={imageInputRef}
            accept="image/png,image/jpeg"
          />
          <TextInput
            {...form.getInputProps("name")}
            key={form.key("name")}
            label="Name"
            placeholder="Enter product name"
            required
          />
          <Textarea
            {...form.getInputProps("description")}
            key={form.key("description")}
            resize="vertical"
            autosize={true}
            minRows={3}
            maxRows={5}
            maxLength={1000}
            label="Description (optional)"
            placeholder="Enter product description"
          />
          <TextInput
            {...form.getInputProps("price")}
            key={form.key("price")}
            type="number"
            label="Price"
            placeholder="Enter product price"
            required
          />
          <NativeSelect
            {...form.getInputProps("category")}
            key={form.key("category")}
            label="Category"
            data={[
              { value: "1", label: "Bracelet" },
              { value: "2", label: "Earring" },
              { value: "3", label: "Hat" },
              { value: "4", label: "Necklace" },
              { value: "5", label: "Sunglasses" },
              { value: "6", label: "Wallet" },
              { value: "7", label: "Wristwatch" },
            ]}
            required
          />
          <Button
            type="submit"
            onClick={() => setSubmitType(SubmitType.Publish)}
            variant="gradient"
            mt={16}
            mr={8}
          >
            Publish
          </Button>
          <Button
            type="submit"
            onClick={() => setSubmitType(SubmitType.Draft)}
            value={SubmitType.Draft}
            variant="outline"
            mt={16}
            mr={8}
          >
            Save as Draft
          </Button>
          <Button
            onClick={cancelFunction}
            value={SubmitType.Draft}
            variant="subtle"
            mt={16}
          >
            Cancel
          </Button>
        </form>
      </Stack>
    </>
  );
}
