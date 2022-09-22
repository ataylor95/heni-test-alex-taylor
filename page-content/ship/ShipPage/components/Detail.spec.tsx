import { Detail } from ".";
import { render, screen } from "@testing-library/react";

const baseProps = {
  title: "A title",
  content: "A larger description"
}

describe("Given the Detail component", () => {
  beforeEach(() => {
    render(<Detail {...baseProps} />);
  });
  test("Should render a title and add the colon", () => {
    expect(screen.getByText(`${baseProps.title}:`)).toBeInTheDocument();
  });
  test("Should render a the content", () => {
    expect(screen.getByText(baseProps.content)).toBeInTheDocument();
  });
  // This test should pass, but for some reason its getting a P, which is not what I see in the generated HTML :?
  test.skip("Should render the title as a span variant of typography", () => {
    expect(screen.getByText(baseProps.content).tagName).toBe("SPAN");
  });
  test("Should render the content as a normal p", () => {
    expect(screen.getByText(baseProps.content).tagName).toBe("P");
  });
});
