import { Link } from "react-router-dom";
import { CountryStoreSelect } from "./CountryStoreSelect/CountryStoreSelect";

const StoresSelection = (props: any) => {
    const countriesWithStores = [
        {
            countryCode: "pl",
            country: "Poland",
            stores: [
                {
                    storeId: "306",
                    storeName: "Katowice",
                },
                {
                    storeId: "188",
                    storeName: "Warszawa Janki",
                },
                {
                    storeId: "203",
                    storeName: "Gdańsk",
                },
                {
                    storeId: "204",
                    storeName: "Kraków",
                },
                {
                    storeId: "205",
                    storeName: "Poznań",
                },
                {
                    storeId: "294",
                    storeName: "Wrocław",
                },
                {
                    storeId: "307",
                    storeName: "Warszawa Targówek",
                },
                {
                    storeId: "311",
                    storeName: "Lublin",
                },
                {
                    storeId: "329",
                    storeName: "Łódź",
                },
                {
                    storeId: "429",
                    storeName: "Bydgoszcz",
                },
                {
                    storeId: "583",
                    storeName: "Szczecin",
                },
            ],
        },
        {
            countryCode: "cz",
            country: "Czechia",
            stores: [
                {
                    storeId: "309",
                    storeName: "Ostrava",
                },
                {
                    storeId: "178",
                    storeName: "Praha Zličín",
                },
                {
                    storeId: "278",
                    storeName: "Brno",
                },
                {
                    storeId: "408",
                    storeName: "Černý Most",
                },
            ],
        },
    ];

    return (
        <div id="stores-selection">
            <div className="columns is-mobile is-variable is-1">
                <div className="column has-text-left is-one-quarter">
                    <Link to="/settings">
                        <button className="button is-link is-small">
                            <span className="icon-text">
                                <span className="material-icons"> arrow_back </span>
                            </span>
                        </button>
                    </Link>
                </div>
                <div className="column has-text-left is-two-quarters has-background-white-ter" style={{ borderRadius: "0.5rem" }}>
                    <h6 className="title is-6 has-text-centered">Settings - Stores</h6>
                </div>
                <div className="column has-text-left is-one-quarter"></div>
            </div>
            <div className="columns is-mobile">
                <div className="column has-text-left">
                    <div className="p-2 has-background-white-ter">
                        <h5 className="title is-5 has-text-centered">Default stores</h5>
                        <h6 className="subtitle is-6 has-text-centered">availability of products will be shown on result cards for selected stores</h6>
                        <div className="column has-text-left">
                            {countriesWithStores.map((countrysWithStores, i) => (
                                <CountryStoreSelect country={countrysWithStores.country} stores={countrysWithStores.stores} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { StoresSelection };
