import React, { useState } from "react";
import Link from "next/link";
import {
  Anchor,
  Container,
  Card,
  Center,
  TextInput,
  Button,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useMutation, graphql } from "relay-hooks";
import { LoginUserMutation } from "./__generated__/LoginUserMutation.graphql";

export function Login() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [hasError, setHasError] = useState({
    hasError: false,
    error: "",
  });

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validationRules: {
      email: (value) => /^\S+@\S+$/.test(value) === true,
    },
  });

  const [loginUser, { loading, error }] =
    useMutation<LoginUserMutation>(graphql`
      mutation LoginUserMutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
          token {
            token
            email
          }
        }
      }
    `);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const email = form.values.email;
    const password = form.values.password;

    if (email === "" || password === "") return;

    loginUser({
      variables: {
        email: email,
        password: password,
      },
      onCompleted() {
        setHasError({
          hasError: false,
          error: "",
        });
        setLoggedIn(true);
        form.errors.email = false;
        form.errors.password = false;
        form.reset();
      },
      onError(_error: Error) {
        setLoggedIn(false);
        setHasError({
          hasError: true,
          error: "Please try again",
        });
      },
    });
  };

  return (
    <Container size="xs">
      <Card shadow="md" mt="xl">
        {hasError.hasError && (
          <Alert title="Error while logging in" color="red">
            {hasError.error}
          </Alert>
        )}
        {loggedIn && (
          <Alert title="Successfully logged in!" color="green">
            You have successfully logged in!
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextInput
            required
            label="Email"
            error={form.errors.email && "Please specify valid email"}
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
          />
          <TextInput
            required
            label="Password"
            error={form.errors.password && "Please specify valid password"}
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
          />
          <br />
          <Center>
            <Button type="submit" loading={loading}>
              Login
            </Button>
          </Center>
        </form>

        <Center>
          <Link href="/posts" passHref>
            <Anchor mt="lg" size="xl">
              View Posts
            </Anchor>
          </Link>
        </Center>
        <Center>
          <Link href="/register" passHref>
            <Anchor mt="lg" size="xl">
              Register
            </Anchor>
          </Link>
        </Center>
      </Card>
    </Container>
  );
}
