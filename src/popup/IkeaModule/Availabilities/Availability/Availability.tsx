import React from "react";
import { Link, useLocation } from "react-router-dom";
import { IkeaProductAvailability } from "../../../../types";
import { Tooltip } from "react-tooltip";

const Availability = (props: any) => {
  const availabilityClass = () => {
    if (props.availability.messageType === "HIGH_IN_STOCK") {
      return "icon-text has-text-success";
    } else if (
      ["MEDIUM_IN_STOCK", "LOW_IN_STOCK"].includes(
        props.availability.messageType
      )
    ) {
      return "icon-text has-text-warning";
    } else if (props.availability.messageType === "OUT_OF_STOCK") {
      return "icon-text has-text-danger";
    }
  };

  const availabilityComponent = () => {
    if (props.availability.messageType === "HIGH_IN_STOCK") {
      return (
        <span
          data-tooltip-id={props.availability.storeId + "-availability-tooltip"}
          data-tooltip-content={`Availability: ${props.availability.quantity}`}
          className={availabilityClass()}
        >
          <span>{props.availability.storeName}: </span>
          <span className="material-icons"> check_box </span>
          <span>{props.availability.quantity}</span>
          <Tooltip id={props.availability.storeId + "-availability-tooltip"} />
        </span>
      );
    } else if (
      ["MEDIUM_IN_STOCK", "LOW_IN_STOCK"].includes(
        props.availability.messageType
      )
    ) {
      return (
        <span
          data-tooltip-id={props.availability.storeId + "-availability-tooltip"}
          data-tooltip-content={`Availability: ${props.availability.quantity}`}
          className={availabilityClass()}
        >
          <span>{props.availability.storeName}: </span>
          <span className="material-icons"> warning </span>
          <span>{props.availability.quantity}</span>
          <Tooltip id={props.availability.storeId + "-availability-tooltip"} />
        </span>
      );
    } else if (props.availability.messageType === "OUT_OF_STOCK") {
      return (
        <span
          data-tooltip-id={props.availability.storeId + "-availability-tooltip"}
          data-tooltip-content={`Availability: ${props.availability.quantity}`}
          className={availabilityClass()}
        >
          <span>{props.availability.storeName}: </span>
          <span className="material-icons"> block_flipped </span>
          <span>{props.availability.quantity}</span>
          <Tooltip id={props.availability.storeId + "-availability-tooltip"} />
        </span>
      );
    }
  };

  const restockComponent = () => {
    if (props.availability.messageType === "OUT_OF_STOCK") {
      if (props.availability.restock) {
        const restockTooltipContent = `Restock: ${props.availability.restock.earliestDate} - ${props.availability.restock.latestDate}`;
        const restockTextContent = props.availability.restock.quantity;
        return (
          <span
            data-tooltip-id={props.availability.storeId + "-restock-tooltip"}
            data-tooltip-content={restockTooltipContent}
            className="icon-text has-text-info"
          >
            <span className="material-icons"> info </span>
            <span>{restockTextContent}</span>
            <Tooltip id={props.availability.storeId + "-restock-tooltip"} />
          </span>
        );
      }
    }
  };

  return (
    <div
      id={props.availability.storeId + "-availability"}
      style={{ borderTop: "0.1rem solid rgb(219, 219, 219" }}
    >
      {availabilityComponent()}
      {restockComponent()}
    </div>
  );
};

export { Availability };
