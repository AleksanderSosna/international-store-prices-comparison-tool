import { Link } from "react-router-dom";

const Settings = (props: any) => {
    return (
        <div id="settings">
            <div className="columns is-mobile is-variable is-1">
                <div className="column has-text-left is-one-quarter">
                    <Link to="/">
                        <button className="button is-link is-small">
                            <span className="icon-text">
                                <span className="material-icons"> arrow_back </span>
                            </span>
                        </button>
                    </Link>
                </div>
                <div className="column has-text-left is-two-quarters has-background-white-ter" style={{ borderRadius: "0.5rem" }}>
                    <h6 className="title is-6 has-text-centered">Settings</h6>
                </div>
                <div className="column has-text-left is-one-quarter"></div>
            </div>
            <div className="columns is-mobile">
                <div className="column">
                    <div className="p-2 has-background-white-ter">
                        <div className="field">
                            <label className="label">Countries</label>
                            <div className="control">
                                <div className="select is-multiple is-small">
                                    <select multiple size={2} disabled>
                                        <option value="Poland" selected>
                                            Poland
                                        </option>
                                        <option value="Czechia" selected>
                                            Czechia
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div style={{ borderTop: "0.1rem solid rgb(219, 219, 219" }}>
                            <span>Default stores:</span>
                            <Link to="/stores-selection">
                                <button className="button is-link is-small">
                                    <span className="icon-text">
                                        <span className="material-icons"> storefront </span>
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <div className="p-2 has-background-white-ter">
                        <div className="field">
                            <label className="label">Currency</label>
                            <div className="control">
                                <div className="select is-small">
                                    <select disabled>
                                        <option value="pln" selected>
                                            PLN
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Settings };
