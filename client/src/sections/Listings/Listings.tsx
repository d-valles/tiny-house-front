import React from 'react';
import { server } from '../../lib/api';
import { DeleteListingData, DeleteListingVariables, ListingsData } from './types';

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
    const fetchListings = async () => {
        const listings = await server.fetch<ListingsData>({query: LISTINGS});
        console.log({fetched: listings});
    };

    const deleteListing = async () => {
        const { data } = await server.fetch<DeleteListingData, DeleteListingVariables> ({
            query: DELETE_LISTINGS,
            variables: {
                id: '5ea8e1baf70ae73686462e09'
            }
        });
        console.log({deleted: data});
    };

    return (
        <div>
            <h2>{props.title}</h2>
            <button onClick={ fetchListings }>
                Query Listings!
            </button>
            <button onClick={ deleteListing }>
                Delete a listing!
            </button>
        </div>)
};