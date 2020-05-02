import React from 'react';
import { gql } from 'apollo-boost';
import { useQuery, useMutation } from 'react-apollo';
import { Listings as ListingsData } from "./__generated__/Listings";
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables
} from "./__generated__/DeleteListing";

const LISTINGS = gql`
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

const DELETE_LISTINGS = gql`
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
    const { data, loading, refetch, error } = useQuery<ListingsData>(LISTINGS);
    const [ deleteListing, {
            loading: deleteListingsLoading,
            error: deleteListingsError
        }
    ] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTINGS);

    const handleDeleteListing = async (id: string) => {
        await deleteListing({ variables: { id }});

        refetch();
    };
    
    const listings = data ? data.listing : null;

    const listingsList = listings ? ( 
        <ul>{listings.map((listing) => {
            return <li key={listing.id}>{listing.title}
                        <button onClick={ () => handleDeleteListing(listing.id) }>
                            Delete
                        </button>
                </li>
        })}</ul>
    ) : null;

    if (loading) {
        return <h2>Loading...</h2>
    }

    if (error) {
        return (
            <h2>
                Something went wrong, please try again later.
            </h2>
        )
    }

    const deleteListingsLoadingMessage = deleteListingsLoading
        ? (
            <h4>Deletion in progres...</h4>
        ) : null;
    
    const deleteListingErrorMessage = deleteListingsError
        ? (
            <h4>Something went wrong with deletion, try again later.</h4>
        ) : null;

    return (
        <div>
            <h2>{props.title}</h2>
            {listingsList}
            {deleteListingsLoadingMessage}
            {deleteListingErrorMessage}
        </div>)
};