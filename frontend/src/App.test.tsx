import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders app properly", () => {
  render(<App />);
  const title = screen.getByText(/free online image viewer/i);
  expect(title).toBeInTheDocument();
});
