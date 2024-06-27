import { Box, Button, Collapse, Divider, Group, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconAdjustmentsHorizontal } from "@tabler/icons-react";

export default function Filters() {
    const [opened, { toggle }] = useDisclosure(false);

     return (
    <Box w="100%">
      <Group justify="flex-end" mb={5} w="100%">
        <Button onClick={toggle} variant="subtle">
            <IconAdjustmentsHorizontal />
            <Text ml={5}>Filters</Text>
        </Button>
      </Group>

      <Collapse in={opened} w="100%">
        <Text>content</Text>
        <Divider my={8} />
      </Collapse>
    </Box>
  );
}