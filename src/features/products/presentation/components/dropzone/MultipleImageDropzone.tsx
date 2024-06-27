import { Dropzone, MIME_TYPES } from "@mantine/dropzone";
import classes from "./ImageDropzone.module.css";
import {
  Group,
  rem,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconDownload, IconX, IconCloudUpload } from "@tabler/icons-react";
import { useRef } from "react";
import CustomOverlayLoader from "../../../../../shared/presentation/components/loader/CustomOverlayLoader";

type ImageDropzoneProps = {
  loading: boolean;
  onDrop: (files: File[]) => void;
};

export default function MultipleImageDropzone({ loading, onDrop }: ImageDropzoneProps) {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={onDrop}
        className={classes.dropzone}
        radius="md"
        accept={[MIME_TYPES.png, MIME_TYPES.jpeg, ".zip"]}
        maxSize={30 * 1024 ** 2}
        loading={loading}
        loaderProps={{children: <CustomOverlayLoader text="Analyzing product images..." />}}
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
            <Dropzone.Idle>Upload Product Images</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drag&apos;n&apos;drop multiple product images and we'll take
            care of the rest!
            <br />
            Your product images must be less than 30mb in size.
          </Text>
        </div>
      </Dropzone>
    </div>
  );
}
