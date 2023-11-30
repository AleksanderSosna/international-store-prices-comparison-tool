const PricesSummary = (props: any) => {
    return (
        <div id="prices-summary" className="p-2 has-background-white-ter">
            <h5 className={"title is-5 has-text-centered " + props.summaryClassName}>{props.summaryTextContent}</h5>
        </div>
    );
};

export { PricesSummary };
