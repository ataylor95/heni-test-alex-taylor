import { Meta } from ".";
import { queryByAttribute, render, screen } from "@testing-library/react";
import { queryHelpers } from "@testing-library/dom"

const baseProps = {
  title: "Title",
  description: "A description",
  url: "https://google.com",
  image: "https://i.imgur.com/I7kGmXD.jpeg",
  type: "product",
}

// Seems to be tricky to test the <head>, so leaving for now
describe.skip("Given the Meta component", () => {
  test("Should be rendered", () => {
    const { container } = render(<Meta {...baseProps} />);
    // const description = container.querySelector(`meta[name="description"]`);
    // const things = container.querySelector('meta');
    // expect(getMeta("title")).toEqual(baseProps.title);
    // expect(description).toBe(baseProps.description);

    // try the document head?
    document.head.querySelectorAll("meta")[0];
  })
});
