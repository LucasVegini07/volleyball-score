import { fireEvent, render } from "@testing-library/react";
import App from "./App";

describe("Tests for Todo component", () => {
  it("Input should be rendered on screen", () => {
    const { getByTestId } = render(<App />);
    const countvalue = getByTestId("countvalue");
    const decrementButton = getByTestId("decrementButton");
    const increment = getByTestId("increment");

    fireEvent.click(increment);
    expect(countvalue.textContent).toBe("1");
    fireEvent.click(decrementButton);
    expect(countvalue.textContent).toBe("0");

  });
});
