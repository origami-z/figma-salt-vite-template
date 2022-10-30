import {
  Button,
  FlexLayout,
  FormField,
  Input,
  StackLayout,
  ToolkitProvider,
} from "@jpmorganchase/uitk-core";
import React, { useEffect, useRef, useState } from "react";
import { PostToFigmaMessage, PostToUIMessage } from "../shared-src";
import { useFigmaPluginTheme } from "./components/useFigmaPluginTheme";
import Logo from "./Logo";
import logoPng from "./logo.png";
import logoSvg from "./logo.svg?raw";

import "./App.css";

function App() {
  const [theme] = useFigmaPluginTheme();
  const inputRef = useRef<HTMLInputElement>(null);
  const [success, setSuccess] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    window.onmessage = async (event: {
      data: {
        pluginMessage: PostToUIMessage;
      };
    }) => {
      if (event.data.pluginMessage) {
        const { pluginMessage } = event.data;
        switch (pluginMessage.type) {
          case "created-nodes-result": {
            setSuccess(pluginMessage.success);
            break;
          }
          default:
        }
      }
    };
  }, []);

  const onCreate = () => {
    const count = Number(inputRef.current?.value || 0);
    parent.postMessage(
      {
        pluginMessage: {
          type: "create-rectangles",
          count,
        } as PostToFigmaMessage,
      },
      "*"
    );
  };

  const onCancel = () => {
    parent.postMessage(
      { pluginMessage: { type: "cancel" } as PostToFigmaMessage },
      "*"
    );
  };

  const buttonCreateResultSuffix =
    success !== undefined ? (success ? " ✅" : " ❌") : null;

  return (
    <ToolkitProvider theme={theme}>
      <StackLayout className="appRoot" align="center">
        <header>
          <img src={logoPng} />
          &nbsp;
          <img src={`data:image/svg+xml;utf8,${logoSvg}`} />
          &nbsp;
          <Logo />
          <h2>Rectangle Creator</h2>
        </header>
        <FormField label="Rectangle Count" fullWidth={false}>
          <Input
            id="input"
            type="number"
            inputProps={{ min: 0 }}
            ref={inputRef}
          />
        </FormField>
        <FlexLayout align="center">
          <Button className="brand" onClick={onCreate}>
            Create{buttonCreateResultSuffix}
          </Button>
          <Button onClick={onCancel}>Cancel</Button>
        </FlexLayout>
      </StackLayout>
    </ToolkitProvider>
  );
}

export default App;
