import React from "react";
import { Button } from "./Button";
import { Typography, TypographyVariant_ENUM } from "../Typography";
import {
  Chevron,
  Undo,
  Redo,
  Link,
  Unlink,
  Move,
  Bold,
  Italic,
  Underline,
  FontColor,
  TextHighlightColor,
} from "@premail/icons";
import { Card } from "../Card/Card";
import { ButtonGroup } from "./ButtonGroup";

// This default export determines where you story goes in the story list
export default {
  title: "Button",
  component: Button,
};

const CodeBlock = (props: React.PropsWithChildren<{}>) => {
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
      <h1>
        <Typography variant={TypographyVariant_ENUM.h1}>Button</Typography>
      </h1>

      <p>
        <Typography variant={TypographyVariant_ENUM.p}>
          Buttons are interactive elements activated with mouse, keyboard,
          finger, voice commands or assistive technologies.{" "}
          <InlineCode>@premail/components</InlineCode>
          buttons come in 5 variants: &nbsp;
          <InlineCode>primary</InlineCode>
          ,&nbsp;
          <InlineCode>secondary</InlineCode>
          ,&nbsp;
          <InlineCode>outlined</InlineCode>
          ,&nbsp;
          <InlineCode>danger</InlineCode>
          &nbsp; and &nbsp;
          <InlineCode>warning</InlineCode>
        </Typography>
      </p>

      <h2>
        <Typography variant={TypographyVariant_ENUM.h3}>Usage</Typography>
      </h2>

      <p>
        <Typography variant={TypographyVariant_ENUM.p}>
          To begin using the <InlineCode>Button</InlineCode> and &nbsp;
          <InlineCode>ButtonGroup</InlineCode>&nbsp; components import the
          following:
        </Typography>
      </p>
      <CodeBlock>{`import { Button, ButtonGroup } from "@premail/components";`}</CodeBlock>

      <h2>
        <Typography variant={TypographyVariant_ENUM.h3}>
          Basic button
        </Typography>
      </h2>
      <p>
        <Typography variant={TypographyVariant_ENUM.p}>
          We can make basic buttons with in all variant types
        </Typography>
      </p>

      <Card
        border
        style={{
          padding: "40px",
          display: "flex",
          justifyContent: "start",
          gap: 6,
          overflowX: "auto",
        }}
      >
        <Button variant="primary">Primary </Button>
        <Button variant="secondary">Secondary </Button>
        <Button variant="outlined">Outlined </Button>
        <Button variant="warning">Warning </Button>
        <Button variant="danger">Danger </Button>
        <Button variant="plain">Plain </Button>
        <Button variant="primary" disabled>
          Disabled
        </Button>
      </Card>

      <CodeBlock>
        {`<Card
  style={{
    padding: "40px",
    display: "flex",
    justifyContent: "space-between",
    gap: 6,
    overflowX: "auto",
  }}
>
  <Button variant="primary">Primary button</Button>
  <Button variant="secondary">Secondary button</Button>
  <Button variant="outlined">Outlined button</Button>
  <Button variant="warning">Warning button</Button>
  <Button variant="danger">Danger button</Button>
</Card>`}
      </CodeBlock>
      <h2>
        <Typography variant={TypographyVariant_ENUM.h3}>
          Icon Buttons
        </Typography>
      </h2>
      <p>
        <Typography variant={TypographyVariant_ENUM.p}>
          Buttons can also represent their behaviour with an icon or enhance the
          message with visual cue.
        </Typography>
      </p>
      <Card
        border
        style={{
          padding: "40px",
          display: "flex",
          justifyContent: "start",
          gap: 6,
          overflowX: "auto",
        }}
      >
        <Button variant="primary" icon={Chevron} iconPosition="begin">
          Drop down
        </Button>
        <Button variant="secondary" icon={Undo} iconPosition="begin">
          undo
        </Button>
        <Button variant="secondary" icon={Redo} iconPosition="end">
          redo
        </Button>
        <Button variant="outlined" icon={Link} />
        <Button variant="danger" icon={Unlink} />
        <Button variant="warning" icon={Move} />
      </Card>
      <CodeBlock>
        {`<Card
  style={{
    padding: "40px",
    display: "flex",
    justifyContent: "space-between",
    gap: 6,
    overflowX: "auto",
  }}
>
  <Button variant="primary" icon={Chevron} iconPosition="begin">
    Drop down
  </Button>
  <Button variant="secondary" icon={Undo} iconPosition="begin">
    undo
  </Button>
  <Button variant="secondary" icon={Redo} iconPosition="end">
    redo
  </Button>
  <Button variant="outlined" icon={Link} />
  <Button variant="danger" icon={Unlink} />
  <Button variant="warning" icon={Move} />
</Card>`}
      </CodeBlock>
      <h2>
        <Typography variant={TypographyVariant_ENUM.h3}>
          Button group
        </Typography>
      </h2>

      <p>
        <Typography variant={TypographyVariant_ENUM.p}>
          Button groups can bring together buttons with related behaviour, like
          buttons in a text editor toolbar. The{" "}
          <InlineCode>ButtonGroup</InlineCode> component will render an inline
          block that groups buttons and applies a border to the end of each
          inline child, optionally it allow for an{" "}
          <InlineCode>outlined</InlineCode> prop that adds an outline to the
          group of buttons.
        </Typography>
      </p>
      <Card
        border
        style={{
          padding: "40px",
          display: "flex",
          justifyContent: "start",
          gap: 6,
          overflowX: "auto",
        }}
      >
        <ButtonGroup>
          <Button variant="primary">btn 1</Button>
          <Button variant="primary">btn 2</Button>
          <Button variant="primary">btn 3</Button>
        </ButtonGroup>

        <ButtonGroup outline>
          <Button variant="plain">btn 1</Button>
          <Button variant="plain">btn 2</Button>
          <Button variant="plain">btn 3</Button>
        </ButtonGroup>

        <ButtonGroup outline>
          <Button variant="secondary" icon={Bold} />
          <Button variant="secondary" icon={Italic} />
          <Button variant="secondary" icon={Underline} />
          <Button variant="secondary" icon={TextHighlightColor} />
          <Button variant="secondary" icon={FontColor} />
        </ButtonGroup>
      </Card>
      <CodeBlock>{`<Card
  style={{
    padding: "40px",
    display: "flex",
    justifyContent: "start",
    gap: 6,
    overflowX: "auto",
  }}
>
  <ButtonGroup>
    <Button variant="primary">btn 1</Button>
    <Button variant="primary">btn 2</Button>
    <Button variant="primary">btn 3</Button>
  </ButtonGroup>

  <ButtonGroup outline>
    <Button variant="plain">btn 1</Button>
    <Button variant="plain">btn 2</Button>
    <Button variant="plain">btn 3</Button>
  </ButtonGroup>

  <ButtonGroup outline>
    <Button variant="secondary" icon={Bold} />
    <Button variant="secondary" icon={Italic} />
    <Button variant="secondary" icon={Underline} />
    <Button variant="secondary" icon={TextHighlightColor} />
    <Button variant="secondary" icon={FontColor} />
  </ButtonGroup>
</Card>`}</CodeBlock>
      <h2>
        <Typography variant={TypographyVariant_ENUM.h3}>
          Button sizes
        </Typography>
      </h2>

      <p>
        <Typography variant={TypographyVariant_ENUM.p}>
          Buttons can be rendered at different sizes with the{" "}
          <InlineCode>size</InlineCode> prop, it can take the values:
          <InlineCode>small</InlineCode>, <InlineCode>medium</InlineCode>,{" "}
          <InlineCode>large</InlineCode>. If no option is set the it defaults to{" "}
          <InlineCode>medium</InlineCode>.
        </Typography>
      </p>
      <Card
        border
        style={{
          padding: "40px",
          display: "flex",
          justifyContent: "start",
          overflowX: "auto",
        }}
      >
        <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
          <Button
            variant="primary"
            size="small"
            style={{ verticalAlign: "middle" }}
          >
            small size
          </Button>

          <Button
            variant="primary"
            size="medium"
            style={{ verticalAlign: "middle" }}
          >
            medium size
          </Button>

          <Button
            variant="primary"
            size="large"
            style={{ verticalAlign: "middle" }}
          >
            large size
          </Button>
        </div>
      </Card>

      <CodeBlock>{`<Card
  style={{
    padding: "40px",
    display: "flex",
    justifyContent: "start",
    overflowX: "auto",
  }}
>
  <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
    <Button
      variant="primary"
      size="small"
      style={{ verticalAlign: "middle" }}
    >
      small size
    </Button>

    <Button
      variant="primary"
      size="medium"
      style={{ verticalAlign: "middle" }}
    >
      medium size
    </Button>

    <Button
      variant="primary"
      size="large"
      style={{ verticalAlign: "middle" }}
    >
      large size
    </Button>
  </div>
</Card>`}</CodeBlock>
      <br />
    </div>
  );
};
