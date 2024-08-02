import { Button, Group, Modal, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { ProductEntity } from "../../../../../../shared/domain/entities/Product.entity";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProduct } from "../../../../../../shared/data/api/Product.api";

export default function DeleteProductButton({
  product,
}: {
  product: ProductEntity;
}) {
  const [opened, setOpened] = useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: async (productId: number) => {
      setOpened(false);
      await deleteProduct(productId);
      return productId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      notifications.show({
        title: "Success",
        message: "Product deleted successfully",
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        title: "Error",
        message: "Failed to delete product",
        color: "red",
      });
    },
  });

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title={
          <Text>
            Are you sure you want to delete <br /> <b>{product.name}</b>?
          </Text>
        }
      >
        <Text>
          Once you delete the product, it will be removed from the database
          permanently.
        </Text>
        <Group mt={16} justify="flex-end">
          <Button onClick={() => setOpened(false)}>Cancel</Button>
          <Button color="red" onClick={() => deleteMutation.mutate(product.id!)}>
            Delete
          </Button>
        </Group>
      </Modal>

      <Button variant="subtle" onClick={() => setOpened(true)}>
        <IconTrash />
      </Button>
    </>
  );
}
