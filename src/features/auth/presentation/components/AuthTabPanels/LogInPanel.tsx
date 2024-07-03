import {
  Tabs,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Anchor,
} from "@mantine/core";
import classes from "./AuthTabPanels.module.scss";
import { useAuth } from "../../../../../hooks/useAuth";

export const LogInPanel = ({
  setActiveTab,
}: {
  setActiveTab: (value: string) => void;
}) => {
  const { login } = useAuth();

  return (
    <Tabs.Panel value="login">
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        Welcome back to Ecommerce Admin!
      </Title>

      <TextInput
        label="Email address"
        placeholder="hello@gmail.com"
        size="md"
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        mt="md"
        size="md"
      />
      <Button
        variant="gradient"
        fullWidth
        mt="xl"
        size="md"
        onClick={() => login("token")}
      >
        Login
      </Button>

      <Text ta="center" mt="md">
        Don&apos;t have an account?{" "}
        <Anchor<"a">
          href="#"
          fw={700}
          onClick={(event) => {
            event.preventDefault();

            // Navigate to the signup modal
            setActiveTab("signup");
          }}
        >
          <Text span variant="gradient" mt="md" fw={700}>
            signup
          </Text>
        </Anchor>
      </Text>
    </Tabs.Panel>
  );
};
