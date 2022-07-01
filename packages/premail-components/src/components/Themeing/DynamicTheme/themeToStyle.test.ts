import { themeingClassName } from "./constants";
import { themeToStyles } from "./themeToStyles";

describe("themetoStyles test", () => {
  it("Should render a css empty ruleset,, when no values are provided in the theme", () => {
    const result = themeToStyles({ name: "test", values: {} });
    expect(result).toMatchInlineSnapshot(`
      ".__PREMAIL__DYNAMIC__THEME__{
                /** Theme: test **/
              
            }"
    `);
  });

  it("Should render a css ruleset with css variables,, when no values are provided in the theme", () => {
    const result = themeToStyles({
      name: "test",
      values: {
        "--premail-black": "#1c2025",
        "--premail-white": "#ffffff",
        "--premail-green-0": "#adcca9",
        "--premail-green-1": "#8cac87",
        "--premail-green-2": "#63895f",
        "--premail-green-3": "#4e704a",
        "--premail-green-4": "#3c543a",
        "--premail-green-5": "#2e3c29",
        "--premail-green-6": "#283324",
      },
    });
    expect(result).toMatchInlineSnapshot(`
      ".__PREMAIL__DYNAMIC__THEME__{
                /** Theme: test **/
              
       --premail-black: #1c2025;
       --premail-white: #ffffff;
       --premail-green-0: #adcca9;
       --premail-green-1: #8cac87;
       --premail-green-2: #63895f;
       --premail-green-3: #4e704a;
       --premail-green-4: #3c543a;
       --premail-green-5: #2e3c29;
       --premail-green-6: #283324;
            }"
    `);
  });

  it("Should render the themeingClassName as selector", () => {
    const result = themeToStyles({
      name: "test",
      values: {
        "--premail-black": "#1c2025",
        "--premail-white": "#ffffff",
        "--premail-green-0": "#adcca9",
        "--premail-green-1": "#8cac87",
        "--premail-green-2": "#63895f",
        "--premail-green-3": "#4e704a",
        "--premail-green-4": "#3c543a",
        "--premail-green-5": "#2e3c29",
        "--premail-green-6": "#283324",
      },
    });

    expect(result).toStrictEqual(expect.stringContaining(themeingClassName));
  });

  it("Should render the theme name", () => {
    const themeName = "myTheme";
    const result = themeToStyles({
      name: themeName,
      values: {
        "--premail-black": "#1c2025",
        "--premail-white": "#ffffff",
        "--premail-green-0": "#adcca9",
        "--premail-green-1": "#8cac87",
        "--premail-green-2": "#63895f",
        "--premail-green-3": "#4e704a",
        "--premail-green-4": "#3c543a",
        "--premail-green-5": "#2e3c29",
        "--premail-green-6": "#283324",
      },
    });

    expect(result).toStrictEqual(expect.stringContaining(themeName));
  });
});
