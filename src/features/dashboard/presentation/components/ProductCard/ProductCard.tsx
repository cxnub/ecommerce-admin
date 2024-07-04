import { Card, Image, Text, Badge, Stack, Group, Divider } from "@mantine/core";
import classes from "./ProductCard.module.css";
import { ProductEntity } from "../../../../../shared/domain/entities/Product.entity";
import SkeletonCard from "./SkeletonCard";
import DeleteProductButton from "./delete/DeleteProductButton";
import EditProductButton from "./edit/EditProductButton";

// type ProductCardProps = {};

export default function ProductCard({ product }: { product?: ProductEntity }) {
  const statusColor = () => {
    switch (product!.status) {
      case "Active":
        return "green.8";
      case "Inactive":
        return "gray.7";
      case "Pending":
        return "blue.5";
    }
  };

  // return skeleton if product is not available
  if (!product) {
    return <SkeletonCard />;
  }

  return (
    <Card
      shadow="sm"
      radius="md"
      h={350}
      w="100%"
      maw={250}
      className={classes.productCard}
    >
      <Card.Section pos="relative" h="50%">
        <Image
          src={product.imageUrl}
          alt="Product Image"
          fallbackSrc="https://placehold.co/600x400?text=Error"
          mah="100%"
        />
        <Badge
          color={statusColor()}
          pos="absolute"
          top={10}
          right={10}
          miw="30%"
          className={classes.statusBadge}
        >
          {product.status}
        </Badge>
      </Card.Section>

      <Stack gap="0" flex={1} justify="flex-end" h="50%">
        <Group justify="space-between">
          <Text size="xl" truncate>
            {product.name}
          </Text>
        </Group>
        <Text c="dimmed" lineClamp={3}>
          {product.description}
        </Text>
        <Text c="dimmed">${product.price?.toFixed(2)}</Text>
        <Group
          justify="space-evenly"
          className={classes.productCardButtonGroup}
        >
          <EditProductButton product={product} />
          <Divider orientation="vertical" />
          <DeleteProductButton product={product} />
        </Group>
      </Stack>
    </Card>
  );
}
