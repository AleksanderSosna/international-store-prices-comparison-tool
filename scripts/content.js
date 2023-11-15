const productWrapperSelector = document.querySelector(
  "div.pip-page-container__main > div[data-product-id]"
);
const productId = productWrapperSelector.getAttribute("data-product-id").toLowerCase();
const productNo = productWrapperSelector.getAttribute("data-product-no");
const productPrice = Number(productWrapperSelector.getAttribute("data-product-price"));
const countryCode = document.URL.split("https://www.ikea.com/")[1].split(
  "/"
)[0];

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.request === "productId and productNo and productPrice and countryCode") {
    sendResponse({
      productId: productId,
      productNo: productNo,
      productPrice: productPrice,
      countryCode: countryCode,
    });
  }
});
