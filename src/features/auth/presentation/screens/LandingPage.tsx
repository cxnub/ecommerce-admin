import {
  Title,
  Text,
  Button,
  Container,
  SimpleGrid,
  Center,
  useMantineColorScheme,
  useComputedColorScheme,
} from "@mantine/core";
import classes from "./LandingPage.module.scss";
import { useDisclosure } from "@mantine/hooks";
import LoginModal from "../components/AuthModal/AuthModal";
import {
  IconCloudUpload,
  IconEdit,
  IconMoon,
  IconSun,
  IconUpload,
} from "@tabler/icons-react";
import { StepsCard } from "../components/StepsCard/StepsCard";

export function LandingPage() {
  const [authOpened, { open, close }] = useDisclosure(false);

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");

  const toggleColorScheme = () => {
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <LoginModal opened={authOpened} onClose={close} />
      <Button
        variant="subtle"
        size="lg"
        onClick={toggleColorScheme}
        className={classes.themeButton}
      >
        {computedColorScheme === "dark" ? (
          <IconMoon color="#F5F3CE" />
        ) : (
          <IconSun color="#F28C38" />
        )}
      </Button>
      <Container mih="100%" className={classes.wrapper} size={1400}>
        <div className={classes.inner}>
          <Title className={classes.title}>
            <Text component="span" className={classes.highlight} inherit>
              AI-Powered
            </Text>{" "}
            Product Management
            <br />
            for seamless Ecommerce
          </Title>

          <Container p={0} size={600}>
            <Text size="lg" className={classes.description}>
              Experience the next level of ecommerce management with our
              AI-driven platform, designed to streamline operations and boost
              productivity.
            </Text>
          </Container>

          <div className={classes.controls}>
            <Button
              variant="gradient"
              className={classes.control}
              size="lg"
              onClick={open}
            >
              Get Started
            </Button>
          </div>
          <Center pt="xl">
            <Title order={2}>Publish your product in 3 easy steps</Title>
          </Center>
          <SimpleGrid cols={{ sm: 3 }} pt="lg" px={48}>
            <StepsCard
              stepNumber={1}
              stepTitle="Upload Image"
              IconComponent={IconUpload}
            />
            <StepsCard
              stepNumber={2}
              stepTitle="Edit Details"
              IconComponent={IconEdit}
            />
            <StepsCard
              stepNumber={3}
              stepTitle="Publish"
              IconComponent={IconCloudUpload}
            />
          </SimpleGrid>
        </div>
      </Container>
      <footer>
        <Container size={1400} p="lg">
          <Text ta="center" size="sm">
            © 2024 Koh Cheng Xi. All rights reserved.
          </Text>
        </Container>
      </footer>
    </>
  );
}
