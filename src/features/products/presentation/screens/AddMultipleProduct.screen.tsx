import {
    AppShell,
    Burger,
    Button,
    Flex,
    Title,
    Tooltip,
  } from "@mantine/core";
  import { IconArrowLeft } from "@tabler/icons-react";
  import { useNavigate } from "react-router-dom";
  import { routeNames } from "../../../../config/routes";
  
  export default function AddMultipleProductsScreen() {
    const navigate = useNavigate();
  
    return (
      <>
        <AppShell.Header withBorder={false}>
          <Flex justify="start" align="center" className="h-full">
            <Tooltip label="back to products" >
              <Button variant="subtle" mx={10} onClick={() => navigate(routeNames.HomeScreen)}>
                <IconArrowLeft />
              </Button>
            </Tooltip>
            <Title order={2} mx={10}>
              Add Multiple Products
            </Title>
            <Burger hiddenFrom="lg" size="sm" />
          </Flex>
        </AppShell.Header>
      </>
    );
  }
  