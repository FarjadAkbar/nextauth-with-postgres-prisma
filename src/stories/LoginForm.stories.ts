import type { Meta, StoryObj } from "@storybook/react";
import { within, userEvent } from "@storybook/testing-library";

import { LoginForm } from "./LoginForm";

const meta = {
  title: "Login Form",
  component: LoginForm,
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/react/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onEmptyClick: false,
    onPasswordDontMatch: false,
    onError: false,
    onSuccess: false,
  },
};

export const Validated: Story = {
  args: {
    onEmptyClick: true,
    onPasswordDontMatch: false,
    onError: false,
    onSuccess: false,
  },
};

export const Error: Story = {
  args: {
    onEmptyClick: false,
    onPasswordDontMatch: false,
    onFullClick: true,
    onError: true,
    message: "Something went wrong, please try again!",
  },
};

export const Success: Story = {
  args: {
    onEmptyClick: false,
    onPasswordDontMatch: false,
    onFullClick: true,
    onError: true,
    message: "Successfully logged in!",
  },
};
