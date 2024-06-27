import { Button, Group, Modal, Text } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { ProductEntity } from "../../../../../../shared/domain/entities/product.entity";
import { notifications } from "@mantine/notifications";

export default function DeleteProductButton({
  product,
}: {
  product: ProductEntity;
}) {
  const [opened, setOpened] = useState(false);

  const handleDelete = async () => {
    setOpened(false);
    notifications.show({
      title: "Product Deleted Successfully",
      message: (
        <>
          <Text>
            <b>{product.name}</b> has been deleted from the database.
          </Text>
          <Text c="blue" component="button">Undo</Text>
        </>
      ),
      color: "green",
      onClose: () => {
        console.log("Delete product here");
      },
      autoClose: 3000,
    });
  };

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
          <Button>Cancel</Button>
          <Button color="red" onClick={handleDelete}>
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
