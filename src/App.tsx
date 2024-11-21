import "@mantine/core/styles.css";
import "@mantine/spotlight/styles.css";
import "./App.css";

import { RecoilRoot } from "recoil";
import { Route, Switch, useLocation } from "wouter";
import { MantineProvider } from "@mantine/core";
import { Spotlight, SpotlightActionData } from "@mantine/spotlight";

import Index from "./pages/Index";
import DOMColor from "./pages/DOMColor";
import ClickTest from "./pages/ClickTest";
import ColorCompare from "./pages/ColorCompare";
import ColorPlate from "./pages/ColorPlate";
import ImageAnnotate from "./pages/ImageAnnotate";
import ImageAnnotateKonva from "./pages/ImageAnnotateKonva";
import SVGColor from "./pages/SVGColor";
import CanvasColor from "./pages/CANVASColor";

function App() {
  const [_, setLocation] = useLocation();

  const actions: SpotlightActionData[] = [
    {
      id: "home",
      label: "Home",
      description: "Get to home page",
      onClick: () => setLocation("/"),
    },
    {
      id: "imageannotate",
      label: "ImageAnnotate",
      description: "Get full information about current system status",
      onClick: () => setLocation("/imageannotate"),
    },
    {
      id: "imageannotatekonva",
      label: "ImageAnnotateKonva",
      description: "Visit documentation to lean more about all features",
      onClick: () => setLocation("/imageannotatekonva"),
    },
    {
      id: "clicktest",
      label: "ClickTest",
      description: "Visit documentation to lean more about all features",
      onClick: () => setLocation("/clicktest"),
    },
  ];

  return (
    <RecoilRoot>
      <MantineProvider>
        <div className="h-screen">
          <Switch>
            <Route path="/" component={Index} />
            <Route path="/imageannotate" component={ImageAnnotate} />
            <Route path="/imageannotatekonva" component={ImageAnnotateKonva} />
            <Route path="/clicktest" component={ClickTest} />
            <Route path="/colorcompare" component={ColorCompare} />
            <Route path="/colorplate" component={ColorPlate} />
            <Route path="/domcolor" component={DOMColor} />
            <Route path="/svgcolor" component={SVGColor} />
            <Route path="/canvascolor" component={CanvasColor} />

            <Route>404: No such page!</Route>
          </Switch>

          <Spotlight
            actions={actions}
            highlightQuery
            nothingFound="Nothing found..."
            searchProps={{ placeholder: "Jump to..." }}
          />
        </div>
      </MantineProvider>
    </RecoilRoot>
  );
}

export default App;
