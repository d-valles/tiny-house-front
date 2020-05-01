export interface Listing {
    id: string;
    title: string;
    image: string;
    address: string;
    price: number;
    numOfGuests: number;
    numOfBeds: number;
    numOfBaths: number;
    rating: number;
  }
  
export interface ListingsData {
    listing: Listing[];
};

export interface DeleteListingData {
    deleteListing: Listing;
}

export interface DeleteListingVariables {
    id: string;
}