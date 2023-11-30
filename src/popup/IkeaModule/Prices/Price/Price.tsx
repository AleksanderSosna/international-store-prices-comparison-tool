import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";

const Price = (props: any) => {
    //TODO
    const selectedCurrency = "PLN";
    const selectedStores = [
        { countryCode: "pl", storeId: "306" },
        { countryCode: "cz", storeId: "309" },
    ];

    const country = (countryCode: string) => {
        switch (countryCode) {
            case "pl":
                return "Poland";
            case "cz":
                return "Czechia";
            default:
                return "";
        }
    };

    const currency = (countryCode: string) => {
        switch (countryCode) {
            case "pl":
                return "PLN";
            case "cz":
                return "CZK";
            default:
                return "";
        }
    };

    const storeNameForStoreId = (storeId: string) => {
        switch (storeId) {
            case "188":
                return "Warszawa Janki";
                break;
            case "203":
                return "Gdańsk";
                break;
            case "204":
                return "Kraków";
                break;
            case "205":
                return "Poznań";
                break;
            case "294":
                return "Wrocław";
                break;
            case "306":
                return "Katowice";
                break;
            case "307":
                return "Warszawa Targówek";
                break;
            case "311":
                return "Lublin";
                break;
            case "329":
                return "Łódź";
                break;
            case "429":
                return "Bydgoszcz";
                break;
            case "583":
                return "Szczecin";
                break;
            case "178":
                return "Praha Zličín";
                break;
            case "278":
                return "Brno";
                break;
            case "309":
                return "Ostrava";
                break;
            case "408":
                return "Černý Most";
                break;
            default:
                return "";
        }
    };

    if (!props.price.price) {
        return (
            <div id={props.price.countryCode + "-price"} className="p-2 has-background-white-ter" style={{ borderTop: "0.1rem solid rgb(219, 219, 219" }}>
                <div className="columns is-mobile">
                    <div className="column has-text-left is-full">
                        <p id={props.price.countryCode} className="has-text-grey-light">
                            {country(props.price.countryCode)}: product unavailable
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const priceTextContent = () => {
        if (props.price.calculatedPrice) {
            return `${country(props.price.countryCode)}: ${props.price.calculatedPrice} ${selectedCurrency}`;
        } else {
            return `${country(props.price.countryCode)}: ${props.price.price} ${selectedCurrency}`;
        }
    };

    const calculatedPriceComponent = () => {
        if (props.price.calculatedPrice) {
            return (
                <span>
                    <br></br>
                    {`(${props.price.price} ${currency(props.price.countryCode)})`}
                </span>
            );
        } else {
            return null;
        }
    };

    const availabilityClass = () => {
        if (
            props.price.availabilities.filter((avlblt: any) => {
                return (
                    avlblt.storeId ===
                    selectedStores.filter((selectedStore) => {
                        return selectedStore.countryCode === props.price.countryCode;
                    })[0].storeId
                );
            })[0].messageType === "HIGH_IN_STOCK"
        ) {
            return "icon-text has-text-success";
        } else if (
            ["MEDIUM_IN_STOCK", "LOW_IN_STOCK"].includes(
                props.price.availabilities.filter((avlblt: any) => {
                    return (
                        avlblt.storeId ===
                        selectedStores.filter((selectedStore) => {
                            return selectedStore.countryCode === props.price.countryCode;
                        })[0].storeId
                    );
                })[0].messageType
            )
        ) {
            return "icon-text has-text-warning";
        } else if (
            props.price.availabilities.filter((avlblt: any) => {
                return (
                    avlblt.storeId ===
                    selectedStores.filter((selectedStore) => {
                        return selectedStore.countryCode === props.price.countryCode;
                    })[0].storeId
                );
            })[0].messageType === "OUT_OF_STOCK"
        ) {
            return "icon-text has-text-danger";
        }
    };

    const availabilityComponent = () => {
        if (
            props.price.availabilities.filter((avlblt: any) => {
                return (
                    avlblt.storeId ===
                    selectedStores.filter((selectedStore) => {
                        return selectedStore.countryCode === props.price.countryCode;
                    })[0].storeId
                );
            })[0].messageType === "HIGH_IN_STOCK"
        ) {
            return (
                <span
                    data-tooltip-id={props.price.countryCode + "-availability-tooltip"}
                    data-tooltip-content={`Availability: ${
                        props.price.availabilities.filter((avlblt: any) => {
                            return (
                                avlblt.storeId ===
                                selectedStores.filter((selectedStore) => {
                                    return selectedStore.countryCode === props.price.countryCode;
                                })[0].storeId
                            );
                        })[0].quantity
                    }`}
                    className={availabilityClass()}
                >
                    <span>
                        {storeNameForStoreId(
                            selectedStores.filter((selectedStore) => {
                                return selectedStore.countryCode === props.price.countryCode;
                            })[0].storeId
                        )}
                        :{" "}
                    </span>
                    <span className="material-icons"> check_box </span>
                    <span>
                        {
                            props.price.availabilities.filter((avlblt: any) => {
                                return (
                                    avlblt.storeId ===
                                    selectedStores.filter((selectedStore) => {
                                        return selectedStore.countryCode === props.price.countryCode;
                                    })[0].storeId
                                );
                            })[0].quantity
                        }
                    </span>
                    <Tooltip id={props.price.countryCode + "-availability-tooltip"} />
                </span>
            );
        } else if (
            ["MEDIUM_IN_STOCK", "LOW_IN_STOCK"].includes(
                props.price.availabilities.filter((avlblt: any) => {
                    return (
                        avlblt.storeId ===
                        selectedStores.filter((selectedStore) => {
                            return selectedStore.countryCode === props.price.countryCode;
                        })[0].storeId
                    );
                })[0].messageType
            )
        ) {
            return (
                <span
                    data-tooltip-id={props.price.countryCode + "-availability-tooltip"}
                    data-tooltip-content={`Availability: ${
                        props.price.availabilities.filter((avlblt: any) => {
                            return (
                                avlblt.storeId ===
                                selectedStores.filter((selectedStore) => {
                                    return selectedStore.countryCode === props.price.countryCode;
                                })[0].storeId
                            );
                        })[0].quantity
                    }`}
                    className={availabilityClass()}
                >
                    <span>
                        {storeNameForStoreId(
                            selectedStores.filter((selectedStore) => {
                                return selectedStore.countryCode === props.price.countryCode;
                            })[0].storeId
                        )}
                        :{" "}
                    </span>
                    <span className="material-icons"> warning </span>
                    <span>
                        {
                            props.price.availabilities.filter((avlblt: any) => {
                                return (
                                    avlblt.storeId ===
                                    selectedStores.filter((selectedStore) => {
                                        return selectedStore.countryCode === props.price.countryCode;
                                    })[0].storeId
                                );
                            })[0].quantity
                        }
                    </span>
                    <Tooltip id={props.price.countryCode + "-availability-tooltip"} />
                </span>
            );
        } else if (
            props.price.availabilities.filter((avlblt: any) => {
                return (
                    avlblt.storeId ===
                    selectedStores.filter((selectedStore) => {
                        return selectedStore.countryCode === props.price.countryCode;
                    })[0].storeId
                );
            })[0].messageType === "OUT_OF_STOCK"
        ) {
            return (
                <span
                    data-tooltip-id={props.price.countryCode + "-availability-tooltip"}
                    data-tooltip-content={`Availability: ${
                        props.price.availabilities.filter((avlblt: any) => {
                            return (
                                avlblt.storeId ===
                                selectedStores.filter((selectedStore) => {
                                    return selectedStore.countryCode === props.price.countryCode;
                                })[0].storeId
                            );
                        })[0].quantity
                    }`}
                    className={availabilityClass()}
                >
                    <span>
                        {storeNameForStoreId(
                            selectedStores.filter((selectedStore) => {
                                return selectedStore.countryCode === props.price.countryCode;
                            })[0].storeId
                        )}
                        :{" "}
                    </span>
                    <span className="material-icons"> block_flipped </span>
                    <span>
                        {
                            props.price.availabilities.filter((avlblt: any) => {
                                return (
                                    avlblt.storeId ===
                                    selectedStores.filter((selectedStore) => {
                                        return selectedStore.countryCode === props.price.countryCode;
                                    })[0].storeId
                                );
                            })[0].quantity
                        }
                    </span>
                    <Tooltip id={props.price.countryCode + "-availability-tooltip"} />
                </span>
            );
        }
    };

    const restockComponent = () => {
        if (
            props.price.availabilities.filter((avlblt: any) => {
                return (
                    avlblt.storeId ===
                    selectedStores.filter((selectedStore) => {
                        return selectedStore.countryCode === props.price.countryCode;
                    })[0].storeId
                );
            })[0].messageType === "OUT_OF_STOCK"
        ) {
            if (
                props.price.availabilities.filter((avlblt: any) => {
                    return (
                        avlblt.storeId ===
                        selectedStores.filter((selectedStore) => {
                            return selectedStore.countryCode === props.price.countryCode;
                        })[0].storeId
                    );
                })[0].restock
            ) {
                const restockTooltipContent = `Restock: ${
                    props.price.availabilities.filter((avlblt: any) => {
                        return (
                            avlblt.storeId ===
                            selectedStores.filter((selectedStore) => {
                                return selectedStore.countryCode === props.price.countryCode;
                            })[0].storeId
                        );
                    })[0].restock.earliestDate
                } - ${
                    props.price.availabilities.filter((avlblt: any) => {
                        return (
                            avlblt.storeId ===
                            selectedStores.filter((selectedStore) => {
                                return selectedStore.countryCode === props.price.countryCode;
                            })[0].storeId
                        );
                    })[0].restock.latestDate
                }`;
                const restockTextContent = props.price.availabilities.filter((avlblt: any) => {
                    return (
                        avlblt.storeId ===
                        selectedStores.filter((selectedStore) => {
                            return selectedStore.countryCode === props.price.countryCode;
                        })[0].storeId
                    );
                })[0].restock.quantity;
                return (
                    <span data-tooltip-id={props.price.countryCode + "-restock-tooltip"} data-tooltip-content={restockTooltipContent} className="icon-text has-text-info">
                        <span className="material-icons"> info </span>
                        <span>{restockTextContent}</span>
                        <Tooltip id={props.price.countryCode + "-restock-tooltip"} />
                    </span>
                );
            }
        }
    };

    const openProductPage = () => {
        chrome.tabs.create({ url: props.price.url });
    };

    return (
        <div id={props.price.countryCode + "-price"} className="p-2 has-background-white-ter" style={{ borderTop: "0.1rem solid rgb(219, 219, 219" }}>
            <div className="columns is-mobile">
                <div className="column">
                    <div className="columns is-mobile">
                        <div className="column has-text-left is-three-quarters">
                            <strong>
                                <p className={props.price.productClassName}>
                                    {priceTextContent()}
                                    {calculatedPriceComponent()}
                                </p>
                            </strong>
                        </div>
                        <div className="column has-text-right is-one-quarter">
                            <button className="button is-small" onClick={openProductPage}>
                                <span className="icon-text">
                                    <span className="material-icons"> open_in_new </span>
                                </span>
                            </button>
                        </div>
                    </div>
                    <div className="columns is-mobile">
                        <div className="column has-text-left is-three-quarters">
                            {availabilityComponent()}
                            {restockComponent()}
                        </div>
                        <div className="column has-text-right is-one-quarter">
                            <Link to="/availabilities" state={{ country: props.price.country, availabilities: props.price.availabilities, productName: props.productName }}>
                                <button className="button is-link is-small">
                                    <span className="icon-text">
                                        <span className="material-icons"> production_quantity_limits </span>
                                    </span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Price };
