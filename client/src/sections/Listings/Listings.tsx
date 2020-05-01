import React, { useState } from 'react';
import { server } from '../../lib/api';
import { 
    DeleteListingData,
    DeleteListingVariables,
    Listing,
    ListingsData 
} from './types';

const LISTINGS = `
    query Listings {
        listing {
            id
            title
            image
            address
            price
            numOfGuests
            numOfBeds
            numOfBaths
            rating
        }
    }
`;

const DELETE_LISTINGS = `
    mutation DeleteListing($id: ID!) {
        deleteListing(id: $id) {
            id
        }
    }
`;

interface Props {
    title: string;
}

export const Listings = (props: Props) => {
    const [listings, setListings] = useState<Listing[] | null>(null);



    const fetchListings = async () => {
        const { data } = await server.fetch<ListingsData>({query: LISTINGS});
        setListings(data.listing);
    };

    const deleteListing = async (id: string) => {
        await server.fetch<DeleteListingData, DeleteListingVariables> ({
            query: DELETE_LISTINGS,
            variables: {
                id
            }
        });
        fetchListings();
    };

    const listingsList = listings ? ( 
        <ul>{listings.map((listing) => {
            return <li key={listing.id}>{listing.title}
                        <button onClick={ () => deleteListing(listing.id) }>
                            Delete
                        </button>
                </li>
        })}</ul>
    ) : null;

    return (
        <div>
            <h2>{props.title}</h2>
            {listingsList}
            <button onClick={ fetchListings }>
                Query Listings!
            </button>
        </div>)
};