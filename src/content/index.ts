import { IkeaProductPageMessage, IkeaProductPageResponse } from "@src/types";

const ikeaProductPageListener = (message: IkeaProductPageMessage, sender: chrome.runtime.MessageSender, sendResponse: (response: IkeaProductPageResponse) => void) => {
    const productWrapperSelector = document.querySelector("div.pip-page-container__main > div[data-product-id]")!;
    const productId = productWrapperSelector.getAttribute("data-product-id")!.toLowerCase();
    const productNo = productWrapperSelector.getAttribute("data-product-no")!;
    const productPrice = Number(productWrapperSelector.getAttribute("data-product-price")!);
    const countryCode = document.URL.split("https://www.ikea.com/")[1].split("/")[0];

    const response: IkeaProductPageResponse = {
        productId: productId,
        productNo: productNo,
        productPrice: productPrice,
        countryCode: countryCode,
    };

    sendResponse(response);
};

chrome.runtime.onMessage.addListener(ikeaProductPageListener);
