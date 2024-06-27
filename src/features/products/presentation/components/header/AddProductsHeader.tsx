import { AppShell, Burger, Button, Flex, Title, Tooltip } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { routeNames } from "../../../../../config/routes";
import { useNavigate } from "react-router-dom";

type AddProductHeaderProps = {
  title: string;
};

export default function AddProductHeader({ title }: AddProductHeaderProps) {
  const navigate = useNavigate();

  return (
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
          {title}
        </Title>
        <Burger hiddenFrom="lg" size="sm" />
      </Flex>
    </AppShell.Header>
  );
}
