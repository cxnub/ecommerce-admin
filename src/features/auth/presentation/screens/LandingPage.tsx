import { Title, Text, Button, Container } from "@mantine/core";
import { Dots } from "./Dots";
import classes from "./LandingPage.module.scss";
import { useDisclosure } from "@mantine/hooks";
import LoginModal from "../components/AuthModal";

export function LandingPage() {
  const [authOpened, { open, close }] = useDisclosure(false);

  return (
    <>
    <LoginModal opened={authOpened} onClose={close} />
      <Container mih="100%" className={classes.wrapper} size={1400}>
        <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
        <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
        <Dots className={classes.dots} style={{ right: 0, top: 60 }} />
          <div className={classes.inner}>
            <Title className={classes.title}>
              <Text component="span" className={classes.highlight} inherit>
                AI-Powered
              </Text>{" "}
              Product Management<br />for seamless Ecommerce
            </Title>

            <Container p={0} size={600}>
              <Text size="lg" c="dimmed" className={classes.description}>
                Streamline product creation with AI. Upload product images, and
                our app auto-generates the name, description, and category for
                you. Simplify your eCommerce workflow effortlessly.
              </Text>
            </Container>

            <div className={classes.controls}>
              <Button variant="gradient" className={classes.control} size="lg" onClick={open}>
                Get Started
              </Button>
            </div>
          </div>
      </Container>
    </>
  );
}
