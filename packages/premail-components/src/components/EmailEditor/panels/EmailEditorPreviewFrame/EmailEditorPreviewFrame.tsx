import React from "react";
import ReactDOM from "react-dom";
import { template } from "./constants/foundationTemplate";

const useIFrameRef: () => [
  React.MutableRefObject<HTMLIFrameElement | null | undefined>,
  (curr: HTMLIFrameElement | null) => void
] = () => {
  const ref = React.useRef<HTMLIFrameElement | null>(null);
  const setRef = React.useCallback((curr: HTMLIFrameElement | null) => {
    ref.current = curr;
  }, []);
  return [ref, setRef];
};

interface IEmailPreviewFrameProps extends React.PropsWithChildren<{}> {
  id?: string;
}

const EmailPreviewFrame = (props: IEmailPreviewFrameProps) => {
  const [ref, setRef] = useIFrameRef();
  const [contentNode, setContentNode] = React.useState<Element | null>(null);

  React.useLayoutEffect(() => {
    // useLayoutEffect guarantees that current is not null, since it runs after dom mutaitons but before paint
    const contentDocument = (ref.current as HTMLIFrameElement).contentDocument;

    if (contentDocument == null) {
      return;
    }
    contentDocument.open();
    contentDocument.write(template);
    contentDocument.close();

    setContentNode(contentDocument.body);
  }, []);

  const iframeContent = React.useMemo(() => {
    if (!contentNode) {
      return null;
    }
    return ReactDOM.createPortal(props.children, contentNode);
  }, [contentNode, props.children]);

  return (
    <iframe
      marginWidth={0}
      marginHeight={0}
      width={"100%"}
      height={"100%"}
      frameBorder={"none"}
      style={{ border: "none", maxWidth: "100%" }}
      ref={setRef}
      id={props.id}
    >
      {iframeContent}
    </iframe>
  );
};

export { EmailPreviewFrame };
export type { IEmailPreviewFrameProps };
