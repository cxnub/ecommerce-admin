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

export const SignUpPanel = ({
  setActiveTab,
}: {
  setActiveTab: (value: string) => void;
}) => {
  const { login } = useAuth();

  return (
    <Tabs.Panel value="signup">
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        Sign up for a free account to get started!
      </Title>

      <TextInput
        label="Email address"
        placeholder="hello@gmail.com"
        size="md"
      />
      <TextInput
        label="Username"
        placeholder="BobTheBuilder"
        mt="md"
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
        Signup
      </Button>

      <Text ta="center" mt="md">
        Already have an account?{" "}
        <Anchor<"a">
          href="#"
          fw={700}
          onClick={(event) => {
            event.preventDefault();

            // Navigate to the login modal
            setActiveTab("login");
          }}
        >
          <Text span variant="gradient" mt="md" fw={700}>
            login
          </Text>
        </Anchor>
      </Text>
    </Tabs.Panel>
  );
};
