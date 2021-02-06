import { Loading } from ".";
import { render } from "@testing-library/react";

describe("src/components/loading/index.tsx", () => {
  test("Render Loading component", () => {
    const renderedLoading = render(<Loading />);
    expect(renderedLoading.container).toMatchSnapshot();
  });
});
