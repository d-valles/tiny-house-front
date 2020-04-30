import React from 'react';
import { server } from '../../lib/api';
import { ListingsData } from './types';

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

interface Props {
    title: string;
}

export const Listings = (props: Props) => {
    const fetchListings = async () => {
        const listings = await server.fetch<ListingsData>({query: LISTINGS});
        console.log(listings);
    };

    return (
        <div>
            <h2>{props.title}</h2>
            <button onClick={ fetchListings }>Query Listings!</button>
        </div>)
};