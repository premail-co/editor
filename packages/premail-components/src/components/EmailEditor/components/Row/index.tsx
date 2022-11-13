import React from "react";
import { IEmailStylable } from "../../types/index";

interface IRowProps extends React.PropsWithChildren<{}>, IEmailStylable {}

const Row = React.forwardRef<HTMLTableElement, IRowProps>(
  (props: React.PropsWithChildren<IRowProps>, ref) => {
    return (
      <table ref={ref} className="row" style={props.style}>
        <tbody>
          <tr>{props.children}</tr>
        </tbody>
      </table>
    );
  }
);

export { Row };
export type { IRowProps };
