const ErrorComponent = (props: any) => {
    return (
        <div id="error-component" className="p-2 has-background-white-ter">
            <h5 className="title is-5 has-text-centered has-text-danger-dark">Oops! Something went wrong... Please try again.</h5>
            <h5 className="title is-5 has-text-centered has-text-danger-dark">Are you sure you're on IKEA product page?</h5>
        </div>
    );
};

export { ErrorComponent };
