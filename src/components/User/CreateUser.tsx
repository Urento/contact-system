import React, { useState } from "react";
import {
  Container,
  Card,
  Center,
  TextInput,
  Button,
  Alert,
} from "@mantine/core";
import { useForm } from "@mantine/hooks";
import { useMutation, graphql } from "relay-hooks";
import { CreateUserMutation } from "./__generated__/CreateUserMutation.graphql";
import Router from "next/router";

export function CreateUser() {
  const [registered, setRegistered] = useState(false);
  const [hasError, setHasError] = useState({
    hasError: false,
    error: "",
  });

  const form = useForm({
    initialValues: {
      email: "",
      password: "",
      username: "",
    },

    validationRules: {
      username: (value) => value.length <= 18,
    },
  });

  const [createUser, { loading, error }] =
    useMutation<CreateUserMutation>(graphql`
      mutation CreateUserMutation(
        $email: String!
        $password: String!
        $username: String!
      ) {
        createUser(email: $email, password: $password, username: $username) {
          user {
            email
            id
            username
            password
          }
        }
      }
    `);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const email = form.values.email;
    const password = form.values.password;
    const username = form.values.username;

    if (email === "" || password === "" || username === "") return;

    if (!/^\S+@\S+$/.test(email)) return;

    createUser({
      variables: {
        email: email,
        username: username,
        password: password,
      },
      onCompleted() {
        setHasError({
          hasError: false,
          error: "",
        });
        setRegistered(true);
        form.errors.email = false;
        form.errors.password = false;
        form.errors.username = false;
        form.reset();
      },
      onError(error: Error) {
        setRegistered(false);
        setHasError({
          hasError: true,
          error: email + " is already in use",
        });
      },
    });
  }

  return (
    <Container size="xs">
      <Card shadow="md" mt="xl">
        {hasError.error && (
          <Alert title="Error while creating your account!" color="red">
            {hasError.error}
          </Alert>
        )}
        {!loading && !error && registered && (
          <Alert title="Successfully registered" color="green">
            Your Account was successfully registered!
            <br />
            <br />
            <Button onClick={() => Router.push("/")}>Back to Login</Button>
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <TextInput
            required
            label="Email"
            error={form.errors.email || (error && "Please specify valid email")}
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
          />
          <TextInput
            required
            label="Username"
            error={
              form.errors.username || (error && "Please specify valid Username")
            }
            value={form.values.username}
            onChange={(event) =>
              form.setFieldValue("username", event.currentTarget.value)
            }
          />

          <TextInput
            required
            label="Password"
            error={
              form.errors.password || (error && "Please specify valid password")
            }
            value={form.values.password}
            type="password"
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
          />
          <br />

          <Center>
            <Button type="submit" loading={loading}>
              Register
            </Button>
          </Center>
        </form>
      </Card>
    </Container>
  );
}
