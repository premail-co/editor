import React from "react";
import { TabRootWrapper } from "../TabRootWrapper/index";
import { useInjectable } from "@premail/state";
import { ToolBarStoreDefinition } from "../../../../stores/ToolbarStore/ToolbarStore";
import { Node, useEditor, useEditorStore } from "@craftjs/core";
import { Input } from "../../../../../Input/Input";
import { TabTitleText } from "../TabTitleText/index";
import styles from "./AttributeEditingTab.module.scss";
import { TabGroupWrapper } from "../TabGroupWrapper/index";

const ExportButton = () => {
  const { query } = useEditor();

  return (
    <button
      onClick={() => {
        const json = query.serialize();
        console.log(JSON.parse(json));
      }}
    >
      export
    </button>
  );
};

const AttributeEditingTab = () => {
  const editor = useEditor();
  const [selected, setSelected] = React.useState<Node | null>(null);

  const [val, setVal] = React.useState(0);
  const [descendantNode] = editor.query.node(selected?.id ?? "").descendants();

  React.useEffect(() => {
    const unsub = editor.store.subscribe(
      (state) => ({
        selected: state?.events?.selected,
      }),
      (collected) => {
        const val = collected.selected.values().next().value;
        setSelected(editor.query.node(val).get() ?? null);
      }
    );
    return () => {
      unsub();
    };
  }, []);

  React.useEffect(() => {
    editor.actions.setProp(descendantNode ?? "", (props) => {
      console.log(props);
      props.style.paddingLeft = `${val}px`;
    });
  }, [val, descendantNode]);

  if (!selected) {
    return null;
  }

  console.log(selected.data.name);

  if (selected.data.name == "Row1Col") {
    return (
      <TabRootWrapper>
        <TabGroupWrapper>
          <TabTitleText>Edit attributes</TabTitleText>
          <Input
            id="padding-left"
            override={styles.padding}
            type="number"
            value={val}
            onChange={(e) => {
              const parsedValue = isNaN(parseInt(e.target.value))
                ? 0
                : parseInt(e.target.value);
              setVal(parsedValue);
            }}
          />
          <ExportButton />
        </TabGroupWrapper>
      </TabRootWrapper>
    );
  }

  return (
    <TabRootWrapper>
      <TabGroupWrapper>
        <TabTitleText>Edit attributes</TabTitleText>
        {/* 
        <Input
          id="padding-left"
          override={styles.padding}
          type="number"
          value={descendantNode.data.props["style"]["paddingLeft"]}
          onChange={(e) => {
            const parsedValue = isNaN(parseInt(e.target.value))
              ? 0
              : parseInt(e.target.value);
            editor.actions.setProp(descendant[0], (props) => {
              props["style"].paddingLeft = parsedValue;
            });
          }}
        /> */}
        <ExportButton />
      </TabGroupWrapper>
    </TabRootWrapper>
  );
};

export { AttributeEditingTab };
