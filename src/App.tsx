import "@mantine/core/styles.css";
import "./App.css";

import { Link, Route, Switch } from "wouter";
import { MantineProvider } from "@mantine/core";

import Index from "./pages/Index";
import DOMColor from "./pages/DOMColor";
import ClickTest from "./pages/ClickTest";
import ColorCompare from "./pages/ColorCompare";
import ColorPlate from "./pages/ColorPlate";
import ImageAnnotate from "./pages/ImageAnnotate";
import ImageAnnotateKonva from "./pages/ImageAnnotateKonva";

function App() {
  return (
    <MantineProvider>
      <div className="h-screen">
        {/* <div className="nav flex flex-row justify-center items-center gap-4">
        <Link href="/">Home</Link>
        <Link href="/imageannotate">ImageAnnotate</Link>
        <Link href="/imageannotatekonva">ImageAnnotateKonva</Link>
      </div> */}

        <Switch>
          <Route path="/" component={Index} />
          <Route path="/imageannotate" component={ImageAnnotate} />
          <Route path="/imageannotatekonva" component={ImageAnnotateKonva} />
          <Route path="/clicktest" component={ClickTest} />
          <Route path="/colorcompare" component={ColorCompare} />
          <Route path="/colorplate" component={ColorPlate} />
          <Route path="/domcolor" component={DOMColor} />
          {/* <Route path="/svgcolor" component={SVGColor} /> */}
          {/* <Route path="/canvascolor" component={CanvasColor} /> */}
          <Route path="/users/:name">
            {(params) => <>Hello, {params.name}!</>}
          </Route>

          <Route>404: No such page!</Route>
        </Switch>
      </div>
    </MantineProvider>
  );
}

export default App;
