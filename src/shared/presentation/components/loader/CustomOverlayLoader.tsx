import { Loader, Stack, Text } from "@mantine/core";

type CustomOverlayLoader = {
  text: string;
};

export default function CustomOverlayLoader({ text }: CustomOverlayLoader) {
  return (
    <Stack justify="center" align="center">
      <Loader color="blue" />
      <Text fw={500}>{text}</Text>
    </Stack>
  );
}
