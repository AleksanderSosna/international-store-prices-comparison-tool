document.getElementById("load-results").addEventListener("click", loadResults);

function country(countryCode) {
  switch (countryCode) {
    case "pl":
      return "Poland";
    case "cz":
      return "Czechia";
    default:
      console.log("countryCode doesn't match our data");
  }
}
function currency(countryCode) {
  switch (countryCode) {
    case "pl":
      return "PLN";
    case "cz":
      return "CZK";
    default:
      console.log("countryCode doesn't match our data");
  }
}

function loadResults() {
  // add loading spinner
  document.getElementById("load-results").classList.add("is-loading");

  const pricesDiv = document.getElementById("prices");
  // populate pricesDiv with progress bar
  pricesDiv.className = ""
  pricesDiv.style = ""
  pricesDiv.innerHTML =
    '<progress class="progress is-small is-link" max="100"></progress>';

  // ask content.js for product data
  chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true,
    },
    function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          request: "productId and productNo and productPrice and countryCode",
        },
        function (response) {
          if (response) {
            const selectedCountries = ["pl", "cz"]; //TODO from storage
            const selectedCurrency = "PLN"; //TODO from storage

            fetch(
              `https://stores-api-polyu.ondigitalocean.app/api/ikea/products/${response.productId}.json`
            )
              .then(function (res) {
                return res.json();
              })
              .then(async (resJson) => {
                const productName = resJson.name;

                // get only the prices for selectedCountries
                const filteredPrices = resJson.prices.filter(function (price) {
                  return selectedCountries.includes(price.countryCode);
                });

                // create prices list
                const prices = [];

                // add price objects from countries with product unavailable
                for (const selectedCountry of selectedCountries) {
                  if (
                    !filteredPrices.some(function (filteredPrice) {
                      return filteredPrice.countryCode === selectedCountry;
                    })
                  ) {
                    prices.push({
                      countryCode: selectedCountry,
                      country: country(selectedCountry),
                      price: "",
                      calculatedPrice: "",
                      currencyCode: currency(selectedCountry),
                      textContent: `${country(selectedCountry)}: product unavailable`,
                      class: "has-text-grey-light",
                    })
                  }
                }

                // loop through prices from countries with product available
                for (const filteredPrice of filteredPrices) {
                  const price = {
                    countryCode: "",
                    country: "",
                    price: "",
                    calculatedPrice: "",
                    currencyCode: "",
                    textContent: "",
                    class: "",
                  };

                  // country
                  price.countryCode = filteredPrice.countryCode;
                  price.country = country(filteredPrice.countryCode);

                  // price in original currency
                  price.price = filteredPrice.price;

                  // for other currencies than selectedCurrency
                  // get the exchange rates and calculate the price in selected currency
                  if (filteredPrice.currencyCode !== selectedCurrency) {
                    const exchangeRateResponse = await fetch(
                      `https://api.nbp.pl/api/exchangerates/rates/A/${filteredPrice.currencyCode}?format=json`
                    );
                    const exchangeRateResJson =
                      await exchangeRateResponse.json();
                    const exchangeRate = exchangeRateResJson.rates[0].mid;
                    const calculatedPrice = (
                      filteredPrice.price * exchangeRate
                    ).toFixed(2);
                    price.calculatedPrice = calculatedPrice;
                  }

                  // original currency code
                  price.currencyCode = filteredPrice.currencyCode;

                  //TODO when working selectedCurrency will be added needs refactoring
                  // compose textContent
                  if (filteredPrice.countryCode === "pl") {
                    price.textContent = `${price.country}: ${price.price} ${selectedCurrency}`;
                  } else {
                    price.textContent = `${price.country}: ${price.calculatedPrice}  ${selectedCurrency} (${price.price} ${price.currencyCode})`;
                  }

                  // compare prices
                  let productPrice = response.productPrice;
                  if (response.countryCode !== "pl") {
                    const exchangeRateResponse = await fetch(
                      `https://api.nbp.pl/api/exchangerates/rates/A/${currency(
                        response.countryCode
                      )}?format=json`
                    );
                    const exchangeRateResJson =
                      await exchangeRateResponse.json();
                    const exchangeRate = exchangeRateResJson.rates[0].mid;
                    productPrice = (
                      response.productPrice * exchangeRate
                    ).toFixed(2);
                  }
                  if (filteredPrice.countryCode === response.countryCode) {
                    price.class = "";
                  } else if (filteredPrice.countryCode === "pl") {
                    if (price.price >= productPrice) {
                      price.class = "has-text-danger-dark";
                    } else {
                      price.class = "has-text-success-dark";
                    }
                  } else {
                    if (price.calculatedPrice >= productPrice) {
                      price.class = "has-text-danger-dark";
                    } else {
                      price.class = "has-text-success-dark";
                    }
                  }

                  prices.push(price);
                }

                // remove progress bar
                pricesDiv.innerHTML = "";
                pricesDiv.className = "p-2 has-background-white-ter"
                pricesDiv.style = "border-radius: 0.5rem"

                // create summary
                const summaryHeading = document.createElement("h5");
                if (
                  prices.some((price) => {
                    return price.class === "has-text-success-dark";
                  })
                ) {
                  summaryHeading.textContent = `Product ${productName} is cheaper in another country!`;
                  summaryHeading.className = "title is-5 has-text-centered has-text-danger-dark";
                } else {
                  summaryHeading.textContent = `Product ${productName} is the cheapest in ${country(
                    response.countryCode
                  )}!`;
                  summaryHeading.className = "title is-5 has-text-centered has-text-success-dark";
                }
                pricesDiv.appendChild(summaryHeading);

                // create prices elements list
                for (const price of prices) {
                  const priceParagraph = document.createElement("p");
                  priceParagraph.id = price.countryCode;
                  priceParagraph.textContent = price.textContent;
                  if (price.class) {
                    priceParagraph.classList.add(price.class);
                  }
                  pricesDiv.appendChild(priceParagraph);
                }

                // remove loading spinner from button
                document
                  .getElementById("load-results")
                  .classList.remove("is-loading");
              });
          } else {
            document
              .getElementById("load-results")
              .classList.remove("is-loading");
            pricesDiv.innerHTML = "";
            pricesDiv.className = "p-2 has-background-white-ter"
            pricesDiv.style = "border-radius: 0.5rem"
            const errorMessageParagraph = document.createElement("h5");
            errorMessageParagraph.textContent =
              "You must be on IKEA product page to load results!";
            errorMessageParagraph.className = "title is-5 has-text-centered has-text-danger-dark";
            pricesDiv.appendChild(errorMessageParagraph);
          }
        }
      );
    }
  );
}

// try {
//  ...
// } catch (error) {
//   pricesDiv.innerHTML = "";
//   const errorMessageParagraph = document.createElement("p");
//   errorMessageParagraph.textContent =
//     "Oops! Something went wrong... Please try again.";
//   errorMessageParagraph.className = "has-text-danger-dark";
//   pricesDiv.appendChild(errorMessageParagraph);
// }
