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
import { AuthError, registerData } from "../../../../../shared/presentation/components/auth/AuthProvider";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "@mantine/form";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";

export const SignUpPanel = ({
  setActiveTab,
}: {
  setActiveTab: (value: string) => void;
}) => {
  const { register } = useAuth();
  const [visible, { toggle: toggleOverlay }] = useDisclosure(false);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const signupForm = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      username: "",
      password: "",
    },

    validate: {
      email: (value) => (/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value) ? null : "Invalid email"),
      password: (value) => {
        if (value.length < 6) {
          return "Password must be at least 6 characters long";
        }

        if (value.length > 20) {
          return "Password must be at most 20 characters long";
        }

        if (
          !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,20}$/.test(
            value
          )
        ) {
          return "Password must contain at least one special character and one number";
        }
      },

      username: (value) => {
        if (value.length < 5) {
          return "Username must be at least 5 characters long";
        }

        if (value.length > 20) {
          return "Username must be at most 20 characters long";
        }

        if (!/^[a-zA-Z0-9]+$/.test(value)) {
          return "Username must contain only letters and numbers";
        }
      },
    },
  });

  const registerMutation = useMutation({
    mutationKey: ["register"],
    mutationFn: (data: registerData) => {
      return register(data);
    },

    onMutate: toggleOverlay,
    onSuccess: toggleOverlay,
    onError: (error) => {
      toggleOverlay();

      if (error instanceof AuthError) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An error occurred, please try again.");
      }
    },
  });

  return (
    <Tabs.Panel value="signup">
      <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
        Sign up for a free account to get started!
      </Title>

      <form
        onSubmit={signupForm.onSubmit((data) => registerMutation.mutate(data))}
      >
        <TextInput
          label="Email address"
          placeholder="hello@gmail.com"
          size="md"
          autoComplete="email"
          key={signupForm.key("email")}
          {...signupForm.getInputProps("email")}
        />
        <TextInput
          label="Username"
          placeholder="BobTheBuilder"
          mt="md"
          size="md"
          autoComplete="username"
          key={signupForm.key("username")}
          {...signupForm.getInputProps("username")}
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          key={signupForm.key("password")}
          autoComplete="new-password"
          {...signupForm.getInputProps("password")}
        />
        <Button
          variant="gradient"
          fullWidth
          mt="xl"
          size="md"
          type="submit"
          disabled={visible}
          pos="relative"
        >
          <LoadingOverlay visible={visible} loaderProps={{size: "sm"}} />
          Signup
        </Button>
        <Text c="red" pt="sm" ps="sm">
          {errorMessage}
        </Text>
      </form>

      <Text ta="center" mt="md">
        Already have an account?{" "}
        <Anchor<"a">
          href="#"
          fw={700}
          onClick={(event) => {
            event.preventDefault();

            if (!visible) {
              // Navigate to the login modal
              setActiveTab("login");
            }
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
