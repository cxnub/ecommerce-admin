import {
  Button,
  NativeSelect,
  TextInput,
  Text,
  Image,
  Stack,
  Card,
  Textarea,
  LoadingOverlay,
  Flex,
  Group,
  Switch,
  Tooltip,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { ProductEntity } from "../../../../../shared/domain/entities/Product.entity";
import { createProduct } from "../../../../../shared/data/api/Product.api";
import { statusType } from "../../../../../shared/domain/enums/Product.enum";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../../../../config/routes";
import { notifications } from "@mantine/notifications";
import CustomOverlayLoader from "../../../../../shared/presentation/components/loader/CustomOverlayLoader";
import { IconInfoCircle } from "@tabler/icons-react";

enum SubmitType {
  Publish = "publish",
  Draft = "draft",
}

type CreateProductFormProps = {
  product: ProductEntity;
  confidence: number;
  cancelFunction: () => void;
};

type FormData = {
  name: string;
  description: string;
  price: number;
  categoryId: number;
};

const categories: { [key: number]: string } = {
  1: "Bracelet",
  2: "Earring",
  3: "Hat",
  4: "Necklace",
  5: "Sunglasses",
  6: "Wallet",
  7: "Wristwatch",
};

export default function CreateProductForm({
  product,
  confidence,
  cancelFunction,
}: CreateProductFormProps) {
  const navigate = useNavigate();
  const [submitType, setSubmitType] = useState<SubmitType | null>(null);

  const predictedCategory = categories[product.categoryId!];

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: product.name!,
      description: product.description!,
      price: 0,
      categoryId: product.categoryId!,
      toggleStatus: false,
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

  const handleSubmit = async (values: FormData) => {
    const newProduct = new ProductEntity({
      ...values,
      imageUrl: product.imageUrl!,
      statusId:
        submitType === SubmitType.Publish
          ? form.values.toggleStatus
            ? statusType.ACTIVE
            : statusType.INACTIVE
          : statusType.PENDING_REVIEW,
      createdAt: new Date().toString(),
      updatedAt: new Date().toString(),
    });

    return await createProduct(newProduct);
  };

  const submitMutation = useMutation({
    mutationKey: ["createProduct"],
    mutationFn: handleSubmit,
    onSuccess: () => {
      navigate(routeNames.HomeScreen);
      notifications.show({
        title: `Product ${
          submitType == SubmitType.Publish ? "Published" : "Saved"
        } Successfully`,
        message:
          submitType === SubmitType.Publish
            ? "Your product has been published!"
            : "Your product has been saved as draft",
        color: "teal",
      });
    },

    onError: () => {
      notifications.show({
        title: "Error creating product",
        message: "Failed to create product, please try again.",
        color: "red",
      });
    },
  });

  return (
    <Card mih={500} maw={{ base: "80%", xl: "40%" }}>
      <Flex justify="center" align="center">
        <Image
          src={product.imageUrl}
          alt="Product Image"
          maw="50%"
          fit="cover"
        />
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
                      ? "Publishing product..."
                      : "Saving product as draft..."
                  }
                />
              ),
            }}
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
            autosize={true}
            maxRows={5}
            minRows={3}
            label="Description (optional)"
            placeholder="Enter product description"
          />
          <TextInput
            {...form.getInputProps("price")}
            key={form.key("price")}
            type="number"
            step="0.01"
            label="Price"
            placeholder="Enter product price"
            required
          />
          <NativeSelect
            {...form.getInputProps("category")}
            key={form.key("category")}
            defaultValue={product.categoryId}
            label={
              <Group pt={8}>
                <Text>Category </Text>
                <Tooltip
                  label={`Predicted category: ${predictedCategory}, confidence: ${confidence.toPrecision(4)}%`}
                >
                  <IconInfoCircle size={20} />
                </Tooltip>
              </Group>
            }
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
          <Group mt={16}>
            <Switch
              {...form.getInputProps("statusId")}
              key={form.key("statusId")}
              label="Set product as active"
              color="blue"
            />
            <Tooltip label="Set a status to your product. The status will only apply if you publish the product.">
              <IconInfoCircle size={20} />
            </Tooltip>
          </Group>

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
    </Card>
  );
}
