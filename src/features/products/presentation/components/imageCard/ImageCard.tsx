import { ActionIcon, Card, Flex, Image, Modal } from "@mantine/core";
import { useState } from "react";

import classes from "./ImageCard.module.css";
import { IconX } from "@tabler/icons-react";

type ImageCardProps = {
  image: File;
  onXClick: () => void;
  showXButton?: boolean;
};

export default function ImageCard({
  image,
  onXClick,
  showXButton,
}: ImageCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={classes.wrapper}>
      <Modal
        opened={open}
        onClose={() => {
          setOpen(false);
        }}
        size="lg"
      >
        <Flex justify="center" align="center" h="100%">
          <Image
            src={URL.createObjectURL(image)}
            alt="product"
            fit="cover"
            w="100%"
            h="100%"
          />
        </Flex>
      </Modal>
      <Card onClick={() => setOpen(true)} h={300}>
        <Flex justify="center" align="center" flex={1} h="100%">
          <Image
            src={URL.createObjectURL(image)}
            alt="product"
            fit="contain"
            h="100%"
            w="100%"
          />
        </Flex>
      </Card>
      {showXButton && (
        <ActionIcon
          style={{ top: "-10px", right: "-10px" }}
          radius="lg"
          color="red.7"
          size="sm"
          pos="absolute"
          onClick={onXClick}
        >
          <Flex justify="center" align="center" w="100%" h="100%">
            <IconX />
          </Flex>
        </ActionIcon>
      )}
    </div>
  );
}
