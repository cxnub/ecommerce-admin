import { AppShell, Burger, Button, Flex, Group, Title } from "@mantine/core";
import ProductGridView from "../components/ProductView/ProductView";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../../../config/routes";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <AppShell.Header withBorder={false}>
        <Flex justify="space-between" align="center" className="h-full">
          <Title order={2} mx={10}>
            Products Management
          </Title>
          <Group visibleFrom="lg">
            <Button
              variant="subtle"
              onClick={() => navigate(routeNames.AddSingleProductScreen)}
            >
              ADD SINGLE PRODUCT
            </Button>
            <Button
              mr={16}
              variant="subtle"
              onClick={() => navigate(routeNames.AddMultipleProductsScreen)}
            >
              ADD MULTIPLE PRODUCTS
            </Button>
          </Group>
          <Burger hiddenFrom="lg" size="sm" />
        </Flex>
      </AppShell.Header>
      <AppShell.Main>
        <ProductGridView />
      </AppShell.Main>
    </>
  );
}
