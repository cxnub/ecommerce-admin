import {
  Card,
  Image,
  Text,
  Badge,
  Stack,
  Group,
  Divider,
  Button,
} from "@mantine/core";
import classes from "./ProductCard.module.css";
import { ProductEntity } from "../../../../../shared/domain/entities/Product.entity";
import SkeletonCard from "./SkeletonCard";
import DeleteProductButton from "./delete/DeleteProductButton";

// type ProductCardProps = {};

export default function ProductCard({ product }: { product?: ProductEntity }) {
  const statusColor = () => {
    switch (product!.status) {
      case "Active":
        return "var(--mantine-color-indigo-9";
      case "Inactive":
        return "var(--mantine-color-gray-9)";
      case "Pending":
        return "var(--mantine-color-blue-7)";
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
        <Image src={product.imageUrl} alt="Norway" mah="100%" />
        <Badge
          color={statusColor()}
          pos="absolute"
          top={10}
          right={10}
          w="30%"
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
        <Text c="dimmed">$430</Text>
        <Group
          justify="space-evenly"
          className={classes.productCardButtonGroup}
        >
          <Button flex={1} variant="subtle">
            EDIT
          </Button>
          <Divider orientation="vertical" />
          <DeleteProductButton product={product} />
        </Group>
      </Stack>
    </Card>
  );
}
