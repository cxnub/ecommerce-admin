import { Text, Button, Container, Group, Flex } from "@mantine/core";
import classes from "./NotFoundPage.module.scss";
import { useNavigate } from "react-router-dom";
import { routeNames } from "../../config/routes";

export default function AnonymousNotFoundPage() {
  const navigate = useNavigate();

  return (
    <Flex justify="center" align="center" flex={1} style={{ aspectRatio: 2 }}>
      <Container className={classes.root}>
        <div className={classes.label}>Hey there, traveller!</div>
        <Text
          className={classes.title}
          variant="gradient"
          gradient={{ from: "cyan", to: "grape", deg: 45 }}
        >
          You have found a secret place.
        </Text>
        <Text c="dimmed" size="lg" ta="center" className={classes.description}>
          Unfortunately, this is only a 404 page. You may have mistyped the
          address, or the page has been moved to another URL.
        </Text>
        <Group justify="center">
          <Button
            variant="subtle"
            size="md"
            onClick={() => navigate(routeNames.LandingScreen)}
          >
            Take me back to landing page
          </Button>
        </Group>
      </Container>
    </Flex>
  );
}
