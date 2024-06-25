import {
  AppShell,
  Burger,
  Button,
  Flex,
  Group,
  Title,
  Text,
  Tooltip,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone, MIME_TYPES } from "@mantine/dropzone";

import {
  IconArrowLeft,
  IconCloudUpload,
  IconDownload,
  IconX,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../../../config/routes";
import { useRef, useState } from "react";

import classes from "./Dropzone.module.css";
import { useMutation } from "@tanstack/react-query";
import { analyzeProductImage } from "../../../../shared/data/api/Product.api";
import { notifications } from "@mantine/notifications";

export default function AddSingleProductScreen() {
  const navigate = useNavigate();

  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (file: File) => {
    setLoading(true);
    return await analyzeProductImage(file);
  }

  const analyzeProductImageMutation = useMutation({
    mutationFn: handleImageUpload,
    onSuccess: (data) => {
      setLoading(false);
    },
    onError: (error) => {
      setLoading(false);
      notifications.show({
        title: "Error",
        message: error.message,
        color: "red",
      });
    },
  });

  return (
    <>
      <AppShell.Header withBorder={false}>
        <Flex justify="start" align="center" className="h-full">
          <Tooltip label="back to products">
            <Button
              variant="subtle"
              mx={10}
              onClick={() => navigate(routeNames.HomeScreen)}
            >
              <IconArrowLeft />
            </Button>
          </Tooltip>
          <Title order={2} mx={10}>
            Add Single Product
          </Title>
          <Burger hiddenFrom="lg" size="sm" />
        </Flex>
      </AppShell.Header>
      <AppShell.Main>
        <Flex justify="center" align="center" mih="100%">
          <div className={classes.wrapper}>
            <Dropzone
              openRef={openRef}
              onDrop={(files) => {analyzeProductImageMutation.mutate(files[0])}}
              className={classes.dropzone}
              radius="md"
              accept={[MIME_TYPES.png, MIME_TYPES.jpeg]}
              maxSize={30 * 1024 ** 2}
              loading={loading}
            >
              <div style={{ pointerEvents: "none" }}>
                <Group justify="center">
                  <Dropzone.Accept>
                    <IconDownload
                      style={{ width: rem(50), height: rem(50) }}
                      color={theme.colors.blue[6]}
                      stroke={1.5}
                    />
                  </Dropzone.Accept>
                  <Dropzone.Reject>
                    <IconX
                      style={{ width: rem(50), height: rem(50) }}
                      color={theme.colors.red[6]}
                      stroke={1.5}
                    />
                  </Dropzone.Reject>
                  <Dropzone.Idle>
                    <IconCloudUpload
                      style={{ width: rem(50), height: rem(50) }}
                      stroke={1.5}
                    />
                  </Dropzone.Idle>
                </Group>

                <Text ta="center" fw={700} fz="lg" mt="xl">
                  <Dropzone.Accept>Drop files here</Dropzone.Accept>
                  <Dropzone.Reject>Image file less than 30mb</Dropzone.Reject>
                  <Dropzone.Idle>Upload Product Image</Dropzone.Idle>
                </Text>
                <Text ta="center" fz="sm" mt="xs" c="dimmed">
                  Drag&apos;n&apos;drop an image of your new product and we'll
                  take care of the rest!
                  <br />
                  Your product image must be less than 30mb in size.
                </Text>
              </div>
            </Dropzone>
          </div>
        </Flex>
      </AppShell.Main>
    </>
  );
}
