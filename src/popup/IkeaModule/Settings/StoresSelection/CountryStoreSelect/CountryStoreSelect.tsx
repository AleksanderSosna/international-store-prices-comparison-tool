const CountryStoreSelect = (props: any) => {
    return (
        <div id={props.country + "-stores"} style={{ borderTop: "0.1rem solid rgb(219, 219, 219" }}>
            <div className="field">
                <label className="label">{props.country}</label>
                <div className="control">
                    <div className="select is-small">
                        <select disabled>
                            {props.stores.map((store: any, i: number) => (
                                <option value={store.storeId}>{store.storeName}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export { CountryStoreSelect };
