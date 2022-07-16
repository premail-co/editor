import React from "react";
import reactElementToJSXString from "react-element-to-jsx-string";
import { Typography } from ".";
import { Surface } from "../Surface/Surface";
// This default export determines where you story goes in the story list
export default {
  title: "Typography",
  component: Typography,
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

export const Overview = () => {
  return (
    <div style={{ maxWidth: 900, margin: "auto", padding: "0px 5px" }}>
      <Typography variant={"h1"} renderElement="h1">
        Typography
      </Typography>

      <Typography variant="p1" renderElement="p">
        Typograhy is a set of styles and appearance of headers, paragraphs and
        general text content. The Typography component can render several
        typography variants using the <InlineCode>variant</InlineCode> prop and
        can define the final rendered element by the{" "}
        <InlineCode>renderElement</InlineCode> prop.
      </Typography>

      <Typography variant={"h2"} renderElement="h2">
        Usage
      </Typography>
      <Typography variant="p1" renderElement="p">
        To begin using the <InlineCode>Typography</InlineCode> component, import
        the following:
      </Typography>
      <CodeBlock>{`import { Typography } from "@premail/components";`}</CodeBlock>
      <Typography variant={"h2"} renderElement="h2">
        Variants
      </Typography>
      <Typography variant="p1" renderElement="p">
        The following variants are defined in{" "}
        <InlineCode>@premail/components</InlineCode> Typography:{" "}
        <InlineCode>h1</InlineCode>, <InlineCode>h2</InlineCode>,{" "}
        <InlineCode>h3</InlineCode>, <InlineCode>h4</InlineCode>,{" "}
        <InlineCode>h5</InlineCode>, <InlineCode>h6</InlineCode>,{" "}
        <InlineCode>p1</InlineCode>, <InlineCode>p2</InlineCode> and{" "}
        <InlineCode>p3</InlineCode>
      </Typography>
      <Surface
        border
        style={{
          padding: "40px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant={"h1"} disableMargins>
          Header H1
        </Typography>
        <Typography variant={"h2"} disableMargins>
          Header H2
        </Typography>
        <Typography variant={"h3"} disableMargins>
          Header H3
        </Typography>
        <Typography variant={"h4"} disableMargins>
          Header H4
        </Typography>
        <Typography variant={"h5"} disableMargins>
          Header H5
        </Typography>
        <Typography variant={"h6"} disableMargins>
          Header H6
        </Typography>
        <Typography variant={"p1"} disableMargins>
          Text p1
        </Typography>
        <Typography variant={"p2"} disableMargins>
          Text p2
        </Typography>
        <Typography variant={"p3"} disableMargins>
          Text p3
        </Typography>
      </Surface>
      <CodeBlock>
        {`<Surface
  border
  style={{
    padding: "40px",
    display: "flex",
    flexDirection: "column",
  }}
>
  <Typography variant={"h1"} disableMargins> Header H1 </Typography>
  <Typography variant={"h2"} disableMargins> Header H2 </Typography>
  <Typography variant={"h3"} disableMargins> Header H3 </Typography>
  <Typography variant={"h4"} disableMargins> Header H4 </Typography>
  <Typography variant={"h5"} disableMargins> Header H5 </Typography>
  <Typography variant={"h6"} disableMargins> Header H6 </Typography>
  <Typography variant={"p1"} disableMargins> Text p1 </Typography>
  <Typography variant={"p2"} disableMargins> Text p2 </Typography>
  <Typography variant={"p3"} disableMargins> Text p3 </Typography>
</Surface>`}
      </CodeBlock>

      <Typography variant={"h2"} renderElement="h2">
        Decoration props
      </Typography>
      <Typography variant="p1" renderElement="p">
        For each variant, typography can be decorated using the{" "}
        <InlineCode>bold</InlineCode>, <InlineCode>italic</InlineCode>,{" "}
        <InlineCode>link</InlineCode> and <InlineCode>strikethrough</InlineCode>{" "}
        props.
      </Typography>

      <Surface
        border
        style={{
          padding: "40px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant={"p1"} bold>
          The quick brown fox jumps over the lazy dog.
        </Typography>
        <Typography variant={"p1"} italic>
          The quick brown fox jumps over the lazy dog.
        </Typography>
        <Typography variant={"p1"} link>
          The quick brown fox jumps over the lazy dog.
        </Typography>
        <Typography variant={"p1"} strikethrough>
          The quick brown fox jumps over the lazy dog.
        </Typography>
      </Surface>
      <CodeBlock>
        {`<Surface
  border
  style={{
    padding: "40px",
    display: "flex",
    flexDirection: "column",
  }}
>
  <Typography variant={"p1"} bold>
    The quick brown fox jumps over the lazy dog.
  </Typography>
  <Typography variant={"p1"} italic>
    The quick brown fox jumps over the lazy dog.
  </Typography>
  <Typography variant={"p1"} link>
    The quick brown fox jumps over the lazy dog.
  </Typography>
  <Typography variant={"p1"} strikethrough>
    The quick brown fox jumps over the lazy dog.
  </Typography>
</Surface>`}
      </CodeBlock>
      <Typography variant={"h2"} renderElement="h2">
        Render Elements
      </Typography>
      <Typography variant="p1" renderElement="p">
        The <InlineCode>Typography</InlineCode> component can also render its
        set of styles in a custom element determined by the{" "}
        <InlineCode>renderElement</InlineCode> prop. This allows to decouple the
        design set of typography styles from the final rendered tag which can be
        useful to keep your html content{" "}
        <a href="https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html">
          semantic
        </a>
        .
      </Typography>
      <Surface
        border
        style={{
          padding: "40px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography variant={"p1"} renderElement="p" disableMargins>
          I render in a p tag.
        </Typography>
        <Typography variant={"p1"} renderElement="span" disableMargins>
          I render in a span tag.
        </Typography>

        <Typography variant={"p1"} renderElement="h1" disableMargins>
          I render in an h1 tag.
        </Typography>

        <Typography variant={"p1"} renderElement="h2" disableMargins>
          I render in an h2 tag.
        </Typography>

        <Typography variant={"p1"} renderElement="h3" disableMargins>
          I render in an h3 tag.
        </Typography>

        <Typography variant={"p1"} renderElement="h5" disableMargins>
          I render in an h5 tag.
        </Typography>

        <Typography variant={"p1"} renderElement="h5" disableMargins>
          I render in an h5 tag.
        </Typography>

        <Typography variant={"p1"} renderElement="h6" disableMargins>
          I render in an h6 tag.
        </Typography>
      </Surface>
      <CodeBlock>
        {`<Surface
  border
  style={{
    padding: "40px",
    display: "flex",
    flexDirection: "column",
  }}
>
  <Typography variant={"p1"} renderElement="p" disableMargins>
    I render in a p tag.
  </Typography>
  <Typography variant={"p1"} renderElement="span" disableMargins>
    I render in a span tag.
  </Typography>

  <Typography variant={"p1"} renderElement="h1" disableMargins>
    I render in an h1 tag.
  </Typography>

  <Typography variant={"p1"} renderElement="h2" disableMargins>
    I render in an h2 tag.
  </Typography>

  <Typography variant={"p1"} renderElement="h3" disableMargins>
    I render in an h3 tag.
  </Typography>

  <Typography variant={"p1"} renderElement="h5" disableMargins>
    I render in an h5 tag.
  </Typography>

  <Typography variant={"p1"} renderElement="h5" disableMargins>
    I render in an h5 tag.
  </Typography>

  <Typography variant={"p1"} renderElement="h6" disableMargins>
    I render in an h6 tag.
  </Typography>
</Surface>`}
      </CodeBlock>
    </div>
  );
};
