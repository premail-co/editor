import React from "react";
import { Typography } from "../Typography/index";

import { Surface } from "./Surface";
import reactElementToJSXString from "react-element-to-jsx-string";

// This default export determines where you story goes in the story list
export default {
  title: "Surface",
  component: Surface,
};

const CodeBlock = (
  props: React.PropsWithChildren<{ style?: React.CSSProperties }>
) => {
  return (
    <div
      style={{
        padding: "40px",
        whiteSpace: "nowrap",
        backgroundColor: "var(--premail-gray-0)",
      }}
    >
      <pre
        style={{
          whiteSpace: "pre-wrap",
          wordBreak: "break-all",
          backgroundColor: "var(--premail-gray-0)",
          margin: "none",
        }}
      >
        <code style={{ color: "var(--premail-black)", whiteSpace: "pre-wrap" }}>
          {props.children}
        </code>
      </pre>
    </div>
  );
};

const InlineCode = (props: React.PropsWithChildren<{}>) => {
  return (
    <code
      style={{
        color: "var(--premail-black)",
        whiteSpace: "pre-wrap",
        backgroundColor: "var(--premail-gray-0)",
      }}
    >
      {props.children}
    </code>
  );
};

const parseElevation = (stringVal?: string) => {
  switch (stringVal) {
    case "elevation-1":
    case "elevation-2":
    case "elevation-3":
    case "elevation-4":
    case "elevation-5":
    case "elevation-6":
    case "elevation-7":
    case "elevation-8":
    case "elevation-9":
    case "elevation-10":
      return stringVal;
    default:
      return undefined;
  }
};

export const Overview = () => {
  const [elevation, setElevation] = React.useState("no-elevation");
  const [disableBorderBlockStart, setDisableBorderBlockStart] =
    React.useState(false);
  const [disableBorderBlockEnd, setDisableBorderBlockEnd] =
    React.useState(false);
  const [disableBorderInlineStart, setDisableBorderInlineStart] =
    React.useState(false);
  const [disableBorderInlineEnd, setDisableBorderInlineEnd] =
    React.useState(false);
  const [hasBorder, setBorder] = React.useState(true);

  const renderBorder =
    hasBorder &&
    (disableBorderBlockStart ||
      disableBorderBlockEnd ||
      disableBorderInlineStart ||
      disableBorderInlineEnd)
      ? {
          ...(disableBorderBlockStart ? { disableBorderBlockStart } : {}),
          ...(disableBorderBlockEnd ? { disableBorderBlockEnd } : {}),
          ...(disableBorderInlineStart ? { disableBorderInlineStart } : {}),
          ...(disableBorderInlineEnd ? { disableBorderInlineEnd } : {}),
        }
      : hasBorder;
  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: "0px 5px" }}>
      <h1>
        <Typography variant={"h1"}>Surface</Typography>
      </h1>

      <p>
        <Typography variant={"p1"}>
          Surfaces are content containers that structure web pages.{" "}
          <InlineCode>@premail/components</InlineCode> surfaces are implemented
          as block elements with padding, an optional border configurable by{" "}
          <InlineCode>border</InlineCode> prop and optional elevation
          configurable by the <InlineCode>elevation</InlineCode> prop.
        </Typography>
      </p>
      <h2>
        <Typography variant={"h3"}>Usage</Typography>
      </h2>

      <p>
        <Typography variant={"p1"}>
          To begin using the <InlineCode>Surface</InlineCode> component import
          the following:
        </Typography>
      </p>
      <CodeBlock>{`import { Surface } from "@premail/components";`}</CodeBlock>

      <h2>
        <Typography variant={"h3"}>Surfaces</Typography>
      </h2>
      <p>
        <Typography variant={"p1"}>
          We can render surfaces in different elevations and border styles.
        </Typography>
      </p>
      <Surface
        border
        style={{
          padding: "40px",
          display: "flex",
          justifyContent: "center",
          flexFlow: "wrap-reverse",
          gap: 20,
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            minWidth: "200px",
            maxWidth: "50%",
            flex: 1,
            alignItems: "center",
            height: "200px",
            border: "1px dashed gray",
          }}
        >
          <Surface elevation={parseElevation(elevation)} border={renderBorder}>
            <Typography variant={"h6"} style={{ margin: 20 }}>
              Surface demo
            </Typography>
          </Surface>
        </div>

        <div
          style={{
            fontFamily: "Open Sans",
            minWidth: "200px",
            maxWidth: "50%",
            flex: "0 0 100%",
          }}
        >
          <Typography variant={"h6"}>Surface Playground</Typography>
          <br />
          <br />
          <Typography variant={"p1"}>Set Elevation value:</Typography>
          <br />
          <br />

          <select
            value={elevation}
            onChange={(e) => {
              setElevation(e.target.value);
            }}
            style={{ padding: 5 }}
          >
            <option value={"no elevation"}>no elevation</option>
            <option value={"elevation-1"}>elevation 1</option>
            <option value={"elevation-2"}>elevation 2</option>
            <option value={"elevation-3"}>elevation 3</option>
            <option value={"elevation-4"}>elevation 4</option>
            <option value={"elevation-5"}>elevation 5</option>
            <option value={"elevation-6"}>elevation 6</option>
            <option value={"elevation-7"}>elevation 7</option>
            <option value={"elevation-8"}>elevation 8</option>
            <option value={"elevation-9"}>elevation 9</option>
            <option value={"elevation-10"}>elevation 10</option>
          </select>
          <br />
          <br />
          <Typography variant={"p1"}>Set Borders:</Typography>
          <br />
          <br />
          <input
            type="radio"
            id="borders"
            name="borders"
            value="true"
            checked={hasBorder == true}
            onChange={() => {
              setBorder(true);
            }}
          />
          <label htmlFor={"borders"}> with borders</label>
          <input
            type="radio"
            id="borders"
            name="borders"
            value="false"
            checked={hasBorder == false}
            onChange={() => {
              setBorder(false);
            }}
          />
          <label htmlFor={"borders"}> without borders</label>
          <br />

          <input
            type="checkbox"
            id="disable-block-start"
            name="borders"
            disabled={hasBorder == false}
            checked={disableBorderBlockStart}
            onChange={() => {
              setDisableBorderBlockStart(!disableBorderBlockStart);
            }}
          />
          <label htmlFor={"disable-block-start"}>
            disable border block start
          </label>

          <br />

          <input
            type="checkbox"
            id="disable-block-end"
            name="borders"
            disabled={hasBorder == false}
            checked={disableBorderBlockEnd}
            onChange={() => {
              setDisableBorderBlockEnd(!disableBorderBlockEnd);
            }}
          />
          <label htmlFor={"disable-block-end"}>disable border block end</label>

          <br />

          <input
            type="checkbox"
            id="disable-inline-start"
            name="borders"
            disabled={hasBorder == false}
            checked={disableBorderInlineStart}
            onChange={() => {
              setDisableBorderInlineStart(!disableBorderInlineStart);
            }}
          />
          <label htmlFor={"disable-inline-start"}>
            disable border inline start
          </label>

          <br />

          <input
            type="checkbox"
            id="disable-inline-end"
            name="borders"
            disabled={hasBorder == false}
            checked={disableBorderInlineEnd}
            onChange={() => {
              setDisableBorderInlineEnd(!disableBorderInlineEnd);
            }}
          />
          <label htmlFor={"disable-inline-end"}>
            disable border inline end
          </label>
        </div>
      </Surface>
      <CodeBlock style={{ marginTop: 30 }}>
        {reactElementToJSXString(
          <Surface
            {...(parseElevation(elevation)
              ? { elevation: parseElevation(elevation) }
              : {})}
            border={renderBorder}
          >
            <Typography variant={"h6"} style={{ margin: 20 }}>
              Surface demo
            </Typography>
          </Surface>
        )}
      </CodeBlock>
    </div>
  );
};
