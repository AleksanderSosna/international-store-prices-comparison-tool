import React from "react";
import ReactDOM from "react-dom/client";
import { IkeaModule } from "./IkeaModule/IkeaModule";
import { HashRouter as Router } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
    <React.StrictMode>
        <Router>
            <IkeaModule />
        </Router>
    </React.StrictMode>
);
