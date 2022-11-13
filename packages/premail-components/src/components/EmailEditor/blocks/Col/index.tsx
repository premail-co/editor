import React from "react";
import { useNode, Node } from "@craftjs/core";
import { Col } from "../../components/Col/index";
import { Row1Col, Row2Col, Row4Col } from "../Row";
import { IEmailStylable } from "../../types/index";

// const placeholderStyle2 = {
//   color: "rgb(38 106 167)",
//   height: "100px",
//   verticalAlign: "middle",
//   textAlign: "center" as "center",
//   borderWidth: "1px",
//   borderStyle: "dashed",
//   backgroundColor: "#d7ebfc",
//   userSelect: "none",
// };

const PlaceHolder = () => {
  return (
    <span
      style={{
        color: "#707070",
        height: "100px",
        verticalAlign: "middle",
        textAlign: "center" as "center",
        borderWidth: "1px",
        borderStyle: "dashed",
        backgroundColor: "#f8f8f8",
        userSelect: "none",
        display: "inline-block",
        width: "100%",
        lineHeight: "100px",
      }}
    >
      Insert content blocks here
    </span>
  );
};

const emptyStyle = {};

const canMoveIn = (nodes: Node[]) => {
  const result = nodes.every(
    (node) =>
      node.data.type != Row1Col &&
      node.data.type != Row2Col &&
      node.data.type != Row4Col
  );
  console.log(`can move in COL ${result}`);

  return result;
};

interface IColBlockProps extends React.PropsWithChildren<{}>, IEmailStylable {
  hoverActive?: () => void;
  hoverInactive?: () => void;
  onSelected?: () => void;
  first?: boolean;
  last?: boolean;
  paddingLeft?: string;
}
interface IUseColBlockRefArgs {
  hoverActive: (() => void) | undefined;
  hoverInactive: (() => void) | undefined;
  onSelected: (() => void) | undefined;
}

const useColBlockRef = (args: IUseColBlockRefArgs) => {
  const node = useNode((node) => ({
    hovered: node.events.hovered,
    selected: node.events.selected,
  }));

  const ref = React.useRef<HTMLTableCellElement | null>(null);
  React.useEffect(() => {
    if (!ref.current) return;
    node.connectors.connect(ref.current);
  }, []);

  React.useEffect(() => {
    if (node.hovered) {
      args.hoverActive && args.hoverActive();
    } else {
      args.hoverInactive && args.hoverInactive();
    }
  }, [node.hovered, args.hoverActive, args.hoverInactive]);

  React.useEffect(() => {
    if (node.selected && args.onSelected) {
      args.onSelected();
    }
  }, [args.onSelected, node.selected]);
  return ref;
};

const ColSpan1 = (props: IColBlockProps) => {
  const ref = useColBlockRef({
    hoverActive: props.hoverActive,
    hoverInactive: props.hoverActive,
    onSelected: props.onSelected,
  });

  return (
    <Col ref={ref} colSpan={"one"} first={props.first} last={props.last}>
      {!props.children ? <PlaceHolder /> : props.children}
    </Col>
  );
};
ColSpan1.craft = { rules: { canMoveIn } };

const ColSpan2 = (props: IColBlockProps) => {
  const ref = useColBlockRef({
    hoverActive: props.hoverActive,
    hoverInactive: props.hoverActive,
    onSelected: props.onSelected,
  });

  return (
    <Col ref={ref} colSpan={"two"} first={props.first} last={props.last}>
      {!props.children ? <PlaceHolder /> : props.children}
    </Col>
  );
};
ColSpan2.craft = { rules: { canMoveIn } };

const ColSpan3 = (props: IColBlockProps) => {
  const ref = useColBlockRef({
    hoverActive: props.hoverActive,
    hoverInactive: props.hoverActive,
    onSelected: props.onSelected,
  });

  return (
    <Col ref={ref} colSpan={"three"} first={props.first} last={props.last}>
      {!props.children ? <PlaceHolder /> : props.children}
    </Col>
  );
};
ColSpan3.craft = { rules: { canMoveIn } };

const ColSpan4 = (props: IColBlockProps) => {
  const ref = useColBlockRef({
    hoverActive: props.hoverActive,
    hoverInactive: props.hoverInactive,
    onSelected: props.onSelected,
  });
  console.log("ColSpan4");
  console.log(props);

  return (
    <Col ref={ref} colSpan={"four"} style={props.style}>
      {!props.children ? <PlaceHolder /> : props.children}
    </Col>
  );
};
ColSpan4.craft = { rules: { canMoveIn } };

export { ColSpan1, ColSpan2, ColSpan3, ColSpan4 };
