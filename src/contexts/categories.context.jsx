import {createContext, useEffect, useState} from "react";
import {gql, useQuery} from "@apollo/client";

export const CategoriesContext = createContext({
    categoriesMap: {}
});

const COLLECTIONS = gql`
    query {
        collections {
            id
            title
            items {
                id
                name
                price
                imageUrl
            }
        }
    }
`;

export const CategoriesProvider = ({children}) => {
    const {loading, data} = useQuery(COLLECTIONS);
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        if (!loading && data) {
            const {collections} = data;
            const categoriesMap = collections.reduce((accumulator, collection) => {
                const {title, items} = collection;
                accumulator[title.toLowerCase()] = items;
                return accumulator;
            }, {});
            setCategoriesMap(categoriesMap);
        }
    }, [loading, data]);

    const value = {categoriesMap, loading};
    return (<CategoriesContext.Provider value={value}>
            {children}
        </CategoriesContext.Provider>);
};
