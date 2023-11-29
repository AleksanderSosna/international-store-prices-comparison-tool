import React from "react";
import {
  IkeaProductAvailability,
  IkeaProductPageMessage,
  IkeaProductPageResponse,
  IkeaProductPrice,
  IkeaProductRestock,
} from "../../../types";
import { Price } from "../Price/Price";
import { PricesSummary } from "../PricesSummary/PricesSummary";
import { ErrorComponent } from "../ErrorComponent/ErrorComponent";
import { Link } from "react-router-dom";

function Prices() {
  const [pricesState, setPrices] = React.useState([{}]);
  const [productNameState, setProductName] = React.useState("");
  const [summaryTextContent, setSummaryTextContent] = React.useState("");
  const [summaryClassName, setSummaryClassName] = React.useState("");
  const [buttonClassName, setButtonClassName] =
    React.useState("button is-link");
  const [showProgressBar, setShowProgressBar] = React.useState(false);
  const [showPriceComponent, setShowPriceComponent] = React.useState(false);
  const [showErrorComponent, setShowErrorComponent] = React.useState(false);

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

  const loadResults = async () => {
    setButtonClassName("button is-link is-loading");
    setShowProgressBar(true);

    try {
      // ask content.js for product data
      const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
      });
      let response: IkeaProductPageResponse = await chrome.tabs.sendMessage(
        tab.id || 0,
        {
          request: "productId and productNo and productPrice and countryCode",
        } as IkeaProductPageMessage
      );

      //TODO
      const selectedCountries = ["pl", "cz"];
      const selectedCurrency = "PLN";

      // fetch product data
      const res = await fetch(
        `https://stores-api-polyu.ondigitalocean.app/api/ikea/products/${response.productId}.json`
      );
      const resJson = await res.json();

      // product name
      const productName = resJson.name
      setProductName(productName);

      // get only the prices for selectedCountries
      const filteredPrices = resJson.prices.filter((price: any) => {
        return selectedCountries.includes(price.countryCode);
      });

      // create prices list
      const prices: Array<IkeaProductPrice> = [];

      // add price objects from countries with product unavailable
      for (const selectedCountry of selectedCountries) {
        if (
          !filteredPrices.some((filteredPrice: any) => {
            return filteredPrice.countryCode === selectedCountry;
          })
        ) {
          prices.push({
            countryCode: selectedCountry,
            country: country(selectedCountry),
            price: "",
            calculatedPrice: "",
            currencyCode: currency(selectedCountry),
            url: "",
            productClassName: "has-text-grey-light",
            availabilities: [],
          });
        }
      }

      // loop through prices from countries with product available
      for (const filteredPrice of filteredPrices) {
        let price: IkeaProductPrice = {
          countryCode: "",
          country: "",
          price: "",
          calculatedPrice: "",
          currencyCode: "",
          url: "",
          productClassName: "",
          availabilities: [],
        };

        // country
        price.countryCode = filteredPrice.countryCode;
        price.country = country(filteredPrice.countryCode)!;

        // price in original currency
        price.price = filteredPrice.price;

        // for other currencies than selectedCurrency
        // get the exchange rates and calculate the price in selected currency
        if (filteredPrice.currencyCode !== selectedCurrency) {
          const exchangeRateResponse = await fetch(
            `https://api.nbp.pl/api/exchangerates/rates/A/${filteredPrice.currencyCode}?format=json`
          );
          const exchangeRateResJson = await exchangeRateResponse.json();
          const exchangeRate = exchangeRateResJson.rates[0].mid;
          const calculatedPrice = (filteredPrice.price * exchangeRate).toFixed(
            2
          );
          price.calculatedPrice = calculatedPrice;
        }

        // compare prices
        let productPriceToCompare = response.productPrice;
        if (response.countryCode !== "pl") {
          const exchangeRateResponse = await fetch(
            `https://api.nbp.pl/api/exchangerates/rates/A/${currency(
              response.countryCode
            )}?format=json`
          );
          const exchangeRateResJson = await exchangeRateResponse.json();
          const exchangeRate = exchangeRateResJson.rates[0].mid;
          productPriceToCompare = Number(
            (response.productPrice * exchangeRate).toFixed(2)
          );
        }
        if (filteredPrice.countryCode === response.countryCode) {
          price.productClassName = "";
        } else if (filteredPrice.countryCode === "pl") {
          if (Number(price.price) >= productPriceToCompare) {
            price.productClassName = "has-text-danger-dark";
          } else {
            price.productClassName = "has-text-success-dark";
          }
        } else {
          if (Number(price.calculatedPrice) >= productPriceToCompare) {
            price.productClassName = "has-text-danger-dark";
          } else {
            price.productClassName = "has-text-success-dark";
          }
        }

        // original currency code
        price.currencyCode = filteredPrice.currencyCode;

        // url
        price.url = resJson.urls.filter((url: any) => {
          return url.countryCode === price.countryCode;
        })[0].url;

        //availability
        const availabilityResponse = await fetch(
          `https://api.ingka.ikea.com/cia/availabilities/ru/${price.countryCode}?itemNos=${resJson.itemNo}&StoresList,Restocks,SalesLocations,DisplayLocations,`,
          {
            headers: {
              "X-Client-Id": "b6c117e5-ae61-4ef5-b4cc-e0b1e37f0631",
            },
          }
        );
        const availabilityResJson = await availabilityResponse.json();
        for (const availability of availabilityResJson.data) {
          if (
            availability.classUnitKey.classUnitCode ===
            price.countryCode.toUpperCase()
          ) {
            continue;
          }

          let index = -1;
          if (availability.isInCashAndCarryRange) {
            index = availability.availableStocks.findIndex(
              (availableStock: any) => {
                return availableStock.type === "CASHCARRY";
              }
            );
          }
          const quantity =
            index >= 0 ? availability.availableStocks[index].quantity : 0;

          // messageType: "HIGH_IN_STOCK" | "MEDIUM_IN_STOCK" | "LOW_IN_STOCK" | "OUT_OF_STOCK"
          let messageType = "OUT_OF_STOCK";
          if (quantity !== 0) {
            messageType =
              availability.availableStocks[index].probabilities[0].communication
                .messageType;
          }

          // restock
          let restock: IkeaProductRestock = null;
          if (index >= 0 && quantity === 0) {
            if (availability.availableStocks[index].restocks) {
              const restockFromResponse =
                availability.availableStocks[index].restocks[0];
              restock = {
                earliestDate: restockFromResponse.earliestDate, // "yyyy-mm-dd"
                latestDate: restockFromResponse.latestDate, // "yyyy-mm-dd"
                quantity: restockFromResponse.quantity, // number
              };
            }
          }

          price.availabilities.push({
            countryCode: price.countryCode,
            storeId: availability.classUnitKey.classUnitCode,
            storeName: storeNameForStoreId(
              availability.classUnitKey.classUnitCode
            ),
            quantity: quantity,
            messageType: messageType,
            restock: restock,
          } as IkeaProductAvailability);
        }

        prices.push(price);
      }

      if (
        prices.some((price) => {
          return price.productClassName === "has-text-success-dark";
        })
      ) {
        setSummaryTextContent(
          `${productName} is cheaper in another country!`
        );
        setSummaryClassName(
          "title is-5 has-text-centered has-text-danger-dark"
        );
      } else {
        setSummaryTextContent(
          `${productName} is the cheapest in ${country(
            response.countryCode
          )}!`
        );
        setSummaryClassName(
          "title is-5 has-text-centered has-text-success-dark"
        );
      }

      setPrices(prices);
      setButtonClassName("button is-link");
      setShowProgressBar(false);
      setShowPriceComponent(true);
    } catch (error) {
      setButtonClassName("button is-link");
      setShowProgressBar(false);
      setShowErrorComponent(true);
    }
  };

  return (
    <div id="prices">
      <div className="columns is-mobile">
        <div className="column has-text-right">
          <Link to="/settings">
            <button className="button is-link is-small">
              <span className="icon-text">
                <span className="material-icons"> settings </span>
              </span>
            </button>
          </Link>
        </div>
      </div>
      <div className="columns is-mobile">
        <div className="column has-text-centered">
          <button className={buttonClassName} onClick={loadResults}>
            Load Results
          </button>
        </div>
      </div>
      {showProgressBar && (
        <progress className="progress is-small is-link" max="100"></progress>
      )}
      {showErrorComponent && <ErrorComponent />}
      {showPriceComponent && (
        <PricesSummary
          summaryTextContent={summaryTextContent}
          summaryClassName={summaryClassName}
        />
      )}
      {showPriceComponent &&
        pricesState.map((price, i) => <Price price={price} productName={productNameState} />)}
    </div>
  );
}

export { Prices };
