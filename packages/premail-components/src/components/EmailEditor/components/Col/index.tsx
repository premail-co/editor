import React from "react";
import { concatClassNames } from "../../../util/concatClassNames";
import { IEmailStylable } from "../../types/index";

const colSpan = {
  one: "large-3 small-12",
  two: "large-6 small-12",
  three: "large-8 small-12",
  four: "large-12 small-12",
};

const getColSpanClassname = (arg: keyof typeof colSpan): string => {
  switch (arg) {
    case "one":
      return "large-3 small-12";
    case "two":
      return "large-6 small-12";
    case "three":
      return "large-8 small-12";
    case "four":
      return "large-12 small-12";
    default:
      return "large-3 small-12";
  }
};
interface RowProps extends IEmailStylable, React.PropsWithChildren<{}> {
  colSpan: keyof typeof colSpan;
  first?: boolean;
  last?: boolean;
}

const Col = React.forwardRef<HTMLTableCellElement, RowProps>((props, ref) => {
  const widthFromColSpan = concatClassNames(
    getColSpanClassname(props.colSpan),
    "columns"
  );
  return (
    <th ref={ref} className={widthFromColSpan} style={props.style}>
      <table>
        <tr>{props.children}</tr>
      </table>
    </th>
  );
});

export { Col };
