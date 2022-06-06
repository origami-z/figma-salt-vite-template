import React, { useEffect, useRef, useState } from "react";
import { PostToFigmaMessage, PostToUIMessage } from "../shared-src";
import "./App.css";
import Logo from "./Logo";
import logoPng from "./logo.png";
import logoSvg from "./logo.svg?raw";

function App() {
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
    <main>
      <header>
        <img src={logoPng} />
        &nbsp;
        <img src={`data:image/svg+xml;utf8,${logoSvg}`} />
        &nbsp;
        <Logo />
        <h2>Rectangle Creator</h2>
      </header>
      <section>
        <input id="input" type="number" min="0" ref={inputRef} />
        <label htmlFor="input">Rectangle Count</label>
      </section>
      <footer>
        <button className="brand" onClick={onCreate}>
          Create{buttonCreateResultSuffix}
        </button>
        <button onClick={onCancel}>Cancel</button>
      </footer>
    </main>
  );
}

export default App;
