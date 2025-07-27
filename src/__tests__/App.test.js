// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import '@testing-library/jest-dom';

// import App from "../App";

// // Pepperoni checkbox
// test("checkbox is initially unchecked", () => {
//   render(<App />);

//   const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

//   expect(addPepperoni).not.toBeChecked();
// });

// test("checkbox appears as checked when user clicks it", () => {
//   render(<App />);

//   const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

//   userEvent.click(addPepperoni);
//   expect(addPepperoni).toBeChecked();
// });

// test("checkbox appears as unchecked when user clicks a second time", () => {
//   render(<App />);

//   const addPepperoni = screen.getByRole("checkbox", { name: /add pepperoni/i });

//   userEvent.click(addPepperoni);

//   expect(addPepperoni).toBeChecked();

//   userEvent.click(addPepperoni);

//   expect(addPepperoni).not.toBeChecked();
// });

// Size select element

// "Your Selection" text

// "Contact Info" text box

// Submit Order button
// src/__tests__/App.test.js
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import "@testing-library/jest-dom";

// Topping checkbox tests
test("pizza checkbox is initially unchecked", () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
  expect(checkbox).not.toBeChecked();
});

test("toppings list initially contains only cheese", () => {
  render(<App />);
  expect(screen.getByText(/small cheese/i)).toBeInTheDocument();
});

test("checkbox becomes checked when user clicks it", async () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
  await userEvent.click(checkbox);
  expect(checkbox).toBeChecked();
});

test("topping appears in selection when checkbox is clicked", async () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
  await userEvent.click(checkbox);
  expect(screen.getByText(/small pepperoni/i)).toBeInTheDocument();
});

// Size select dropdown tests
test("size select element initially displays 'Small'", () => {
  render(<App />);
  const select = screen.getByLabelText(/select size/i);
  expect(select).toHaveDisplayValue("Small");
});

test("select Size dropdown displays the user's selected value", async () => {
  render(<App />);
  const select = screen.getByLabelText(/select size/i);
  await userEvent.selectOptions(select, "medium");
  expect(select).toHaveDisplayValue("Medium");
  await userEvent.selectOptions(select, "large");
  expect(select).toHaveDisplayValue("Large");
});

test("'Your Selection' message initially displays 'small cheese'", () => {
  render(<App />);
  expect(screen.getByText(/small cheese/i)).toBeInTheDocument();
});

test("selecting options updates the 'Your selection' message", async () => {
  render(<App />);
  const checkbox = screen.getByRole("checkbox", { name: /add pepperoni/i });
  const select = screen.getByLabelText(/select size/i);

  await userEvent.click(checkbox);
  expect(screen.getByText(/small pepperoni/i)).toBeInTheDocument();

  await userEvent.selectOptions(select, "large");
  expect(screen.getByText(/large pepperoni/i)).toBeInTheDocument();
});

// Email input tests
test("'Contact Info' text box initially displays a placeholder value of 'email address'", () => {
  render(<App />);
  expect(screen.getByPlaceholderText(/email address/i)).toBeInTheDocument();
});

test("the page shows information the user types into the contact form field", async () => {
  render(<App />);
  const input = screen.getByLabelText(/enter your email address/i);
  await userEvent.type(input, "pizzafan@email.com");
  expect(input).toHaveValue("pizzafan@email.com");
});

// Submit button and confirmation
test("form contains a 'Submit Order' button", () => {
  render(<App />);
  expect(screen.getByRole("button", { name: /submit order/i })).toBeInTheDocument();
});

test("clicking the Place Order button displays a thank you message", async () => {
  render(<App />);
  const button = screen.getByRole("button", { name: /submit order/i });
  await userEvent.click(button);
  expect(screen.getByText(/thanks for your order!/i)).toBeInTheDocument();
});
