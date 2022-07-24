import React from "react";
import styles from "./ContentBlockTab.module.scss";
import {
  Header,
  Text,
  Picture,
  Button,
  Spacer,
  Divider,
  Menu,
  Social,
  Video,
  Chevron,
} from "@premail/icons";
import { Surface } from "../../../../../Surface/index";
import { Typography } from "../../../../../Typography/Typography";
import { TabWrapper } from "../TabWrapper/index";
import { TabTitleText } from "../TabTitleText/index";

const Row = (props: React.PropsWithChildren<{}>) => {
  return <div className={styles.row}>{props.children}</div>;
};

const Item = (props: React.PropsWithChildren<{}>) => {
  return (
    <Surface border override={styles.item}>
      {props.children}
    </Surface>
  );
};

const ContentBlockTab = () => {
  return (
    <TabWrapper>
      <TabTitleText>Blocks</TabTitleText>
      <Row>
        <Item>
          <Header className={styles.itemIcon} />
          <Typography
            variant={"p2"}
            renderElement="span"
            override={styles.itemText}
            disableMargins
          >
            Header
          </Typography>
        </Item>
        <Item>
          <Text className={styles.itemIcon} />
          <Typography
            variant={"p2"}
            renderElement="span"
            override={styles.itemText}
            disableMargins
          >
            Text
          </Typography>
        </Item>
        <Item>
          <Picture className={styles.itemIcon} />
          <Typography
            variant={"p2"}
            renderElement="span"
            override={styles.itemText}
            disableMargins
          >
            Image
          </Typography>
        </Item>
      </Row>
      <Row>
        <Item>
          <Button className={styles.itemIcon} />
          <Typography
            variant={"p2"}
            renderElement="span"
            override={styles.itemText}
            disableMargins
          >
            Button
          </Typography>
        </Item>
        <Item>
          <Spacer className={styles.itemIcon} />
          <Typography
            variant={"p2"}
            renderElement="span"
            override={styles.itemText}
            disableMargins
          >
            Spacer
          </Typography>
        </Item>
        <Item>
          <Divider className={styles.itemIcon} />
          <Typography
            variant={"p2"}
            renderElement="span"
            override={styles.itemText}
            disableMargins
          >
            Divider
          </Typography>
        </Item>
      </Row>
      <Row>
        <Item>
          <Menu className={styles.itemIcon} />
          <Typography
            variant={"p2"}
            renderElement="span"
            override={styles.itemText}
            disableMargins
          >
            Menu
          </Typography>
        </Item>
        <Item>
          <Social className={styles.itemIcon} />
          <Typography
            variant={"p2"}
            renderElement="span"
            override={styles.itemText}
            disableMargins
          >
            Social
          </Typography>
        </Item>
        <Item>
          <Video className={styles.itemIcon} />
          <Typography
            variant={"p2"}
            renderElement="span"
            override={styles.itemText}
            disableMargins
          >
            Video
          </Typography>
        </Item>
      </Row>

      <Row>
        <Item>
          <Chevron className={styles.itemIcon} />
          <Typography
            variant={"p2"}
            renderElement="span"
            override={styles.itemText}
            disableMargins
          >
            Accordion
          </Typography>
        </Item>
      </Row>
    </TabWrapper>
  );
};

export { ContentBlockTab };
