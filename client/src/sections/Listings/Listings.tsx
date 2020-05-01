import React from 'react';
import { server, useQuery } from '../../lib/api';
import { 
    DeleteListingData,
    DeleteListingVariables,
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
    const { data, refetch } = useQuery<ListingsData>(LISTINGS);

    const deleteListing = async (id: string) => {
        await server.fetch<DeleteListingData, DeleteListingVariables> ({
            query: DELETE_LISTINGS,
            variables: {
                id
            }
        });

        refetch();
    };
    
    const listings = data ? data.listing : null;

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
        </div>)
};