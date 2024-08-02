import {
  Tabs,
  Title,
  Text,
  TextInput,
  PasswordInput,
  Button,
  Anchor,
  LoadingOverlay,
} from "@mantine/core";
import classes from "./AuthTabPanels.module.scss";
import { useAuth } from "../../../../../hooks/useAuth";
import { useForm } from "@mantine/form";
import { useMutation } from "@tanstack/react-query";
import {
  AuthError,
  loginData,
} from "../../../../../shared/presentation/components/auth/AuthProvider";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export const LogInPanel = ({
  setActiveTab,
}: {
  setActiveTab: (value: string) => void;
}) => {
  const { login } = useAuth();
  const [visible, { toggle: toggleOverlay }] = useDisclosure(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => {
        if (value.length < 6) {
          return "Password must be at least 6 characters long";
        }
      },
    },
  });

  const loginMutation = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: loginData) => {
      setErrorMessage(null);
      return login(data);
    },

    onMutate: toggleOverlay,
    onSuccess: toggleOverlay,
    onError: (error) => {
      toggleOverlay();

      if (error instanceof AuthError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("Something went wrong, please try again later.");
      }
    },
  });

  return (
    <Tabs.Panel value="login">
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        Welcome back to Ecommerce Admin!
      </Title>

      <form onSubmit={form.onSubmit((data) => loginMutation.mutate(data))}>
        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          key={form.key("email")}
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          key={form.key("password")}
          {...form.getInputProps("password")}
        />
        <Button
          variant="gradient"
          fullWidth
          mt="xl"
          size="md"
          type="submit"
          disabled={visible}
        >
          <LoadingOverlay visible={visible} loaderProps={{ size: "sm" }} />
          Login
        </Button>
        <Text c="red" pt="sm" ps="sm">
          {errorMessage}
        </Text>
      </form>

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
