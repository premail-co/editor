import React from "react";
import { useNode, Node, useEditor } from "@craftjs/core";
import { Row1Col, Row2Col, Row4Col } from "../Row";

// const ContentCanvas = (props: React.PropsWithChildren<{}>) => {
//   const node = useNode();

//   return (
//     <td
//       ref={(ref) => {
//         ref && node.connectors.connect(ref);
//       }}
//       style={{
//         width: "100px",
//         height: "200px",
//       }}
//     >
//       {props.children}
//     </td>
//   );
// };

const ContentRootBlock = (props: React.PropsWithChildren<{}>) => {
  const node = useNode();
  const editor = useEditor();
  const tableRef = React.useRef<HTMLTableElement | null>(null);
  React.useLayoutEffect(() => {
    tableRef.current && node.connectors.connect(tableRef.current);
  }, [editor]);
  return (
    <table className="body" ref={tableRef}>
      <tr>
        <td className="float-center" align="center" valign="top">
          <table align="center" className="container" id="content-root">
            <tbody>
              <tr>
                <td
                  style={{
                    width: "100px",
                    height: "200px",
                  }}
                >
                  {props.children}
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </table>
  );
};

const canMoveInContentRoot = (nodes: Node[]) => {
  const result = nodes.every(
    (node) =>
      node.data.type == Row1Col ||
      node.data.type == Row2Col ||
      node.data.type == Row4Col
  );

  console.log(`Can Move in contentRoot ${result}`);

  return result;
};

ContentRootBlock.craft = {
  rules: { canMoveIn: canMoveInContentRoot },
};

export { ContentRootBlock };
