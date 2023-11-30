import { Link, useLocation } from "react-router-dom";
import { IkeaProductAvailability } from "@src/types";
import { Availability } from "./Availability/Availability";

const Availabilities = (props: any) => {
    const location = useLocation();
    const { country } = location.state;
    const { availabilities } = location.state;
    const { productName } = location.state;

    return (
        <div id="availabilities">
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
                    <h6 className="title is-6 has-text-centered">Availabilities - {country}</h6>
                </div>
                <div className="column has-text-left is-one-quarter"></div>
            </div>
            <div className="columns is-mobile">
                <div className="column has-text-left">
                    <div className="p-2 has-background-white-ter">
                        <h5 className="title is-5 has-text-centered">
                            Availabilities of {productName} in {country}
                        </h5>
                        <div className="column has-text-left">
                            {availabilities.map((availability: IkeaProductAvailability, i: number) => (
                                <Availability availability={availability} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { Availabilities };
