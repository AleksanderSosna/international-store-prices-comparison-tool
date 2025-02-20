import { Prices } from "./Prices/Prices";
import { Settings } from "./Settings/Settings";
import { Routes, Route } from "react-router-dom";
import { Availabilities } from "./Availabilities/Availabilities";
import { StoresSelection } from "./Settings/StoresSelection/StoresSelection";

function IkeaModule() {
    return (
        <div id="ikea-module">
            <Routes>
                <Route path="/" element={<Prices />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/stores-selection" element={<StoresSelection />} />
                <Route path="/availabilities" element={<Availabilities />} />
            </Routes>
        </div>
    );
}

export { IkeaModule };
