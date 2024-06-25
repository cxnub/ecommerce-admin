import { Badge, Card, Skeleton, Stack } from "@mantine/core";
export default function SkeletonCard() {
  return (
    <Card
      shadow="sm"
      radius="md"
      h={350}
      w="100%"
      maw={250}
    >
      <Card.Section h="50%">
        <Skeleton height="100%" />
        <Badge pos="absolute" top={10} right={10} w="30%">
          <Skeleton height="100%" />
        </Badge>
      </Card.Section>

      <Stack gap="0" flex={1} justify="flex-end" h="50%">
        <Skeleton
          height="12%"
          w="40%"
          style={{
            borderRadius:
              "var(--mantine-radius-sm) var(--mantine-radius-sm) 0px 0px",
          }}
        />
        <Skeleton
          height="36%"
          style={{
            borderRadius:
              "0px var(--mantine-radius-sm) var(--mantine-radius-sm) 0px",
          }}
        />
        <Skeleton
          height="12%"
          w="20%"
          style={{
            borderRadius:
              "0px 0px var(--mantine-radius-sm) var(--mantine-radius-sm)",
          }}
        />
      </Stack>
    </Card>
  );
}
