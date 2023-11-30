export type IkeaProductPrice = {
    countryCode: string;
    country: string;
    price: string;
    calculatedPrice: string;
    currencyCode: string;
    url: string;
    productClassName: string;
    availabilities: Array<IkeaProductAvailability>;
};

export type IkeaProductAvailability = {
    countryCode: string;
    storeId: string;
    storeName: string;
    quantity: number;
    messageType: string;
    restock: IkeaProductRestock;
};

export type IkeaProductRestock = {
    earliestDate: string;
    latestDate: string;
    quantity: number;
} | null;
