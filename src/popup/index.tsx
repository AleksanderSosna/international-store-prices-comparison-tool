import React from "react";
import ReactDOM from "react-dom";
import { IkeaModule } from "./IkeaModule/IkeaModule";
import { HashRouter as Router } from "react-router-dom";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <IkeaModule />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
