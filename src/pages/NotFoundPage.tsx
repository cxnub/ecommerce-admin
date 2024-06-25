import {
  Title,
  Text,
  Button,
  Container,
  Group,
  AppShell,
  Flex,
} from "@mantine/core";
import classes from "./NotFoundPage.module.css";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../config/routes";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <AppShell.Main>
      <Flex justify="center" align="center" flex={1} h="100vh">
        <Container className={classes.root}>
          <div className={classes.label}>404</div>
          <Title className={classes.title}>
            You have found a secret place.
          </Title>
          <Text
            c="dimmed"
            size="lg"
            ta="center"
            className={classes.description}
          >
            Unfortunately, this is only a 404 page. You may have mistyped the
            address, or the page has been moved to another URL.
          </Text>
          <Group justify="center">
            <Button variant="subtle" size="md" onClick={() => navigate(routeNames.HomeScreen)}>
              Take me back to home page
            </Button>
          </Group>
        </Container>
      </Flex>
    </AppShell.Main>
  );
}
