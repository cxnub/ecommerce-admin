import { Button, Modal, Title } from "@mantine/core";
import { useState } from "react";
import { ProductEntity } from "../../../../../../shared/domain/entities/Product.entity";
import EditProductForm from "./EditProductForm";

export default function EditProductButton({
  product,
}: {
  product: ProductEntity;
}) {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        closeOnClickOutside={false}
        closeOnEscape={false}
        withCloseButton={false}
        onClose={() => setOpened(false)}
        title={<Title order={3}>Edit Product</Title>}
      >
        <EditProductForm
          product={product}
          cancelFunction={() => setOpened(false)}
          setOpened={setOpened}
        />
      </Modal>
      <Button flex={1} variant="subtle" onClick={() => setOpened(true)}>
        EDIT
      </Button>
    </>
  );
}
