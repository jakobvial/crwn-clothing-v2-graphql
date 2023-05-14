import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";

import ProductCard from "../../components/product-card/product-card.component";

import {CategoryContainer, Title} from "./category.styles";
import Spinner from "../../components/spinner/spinner.component";

const GET_CATEGORY = gql`
    query($title: String!) {
        getCollectionsByTitle(title: $title) {
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

const Category = () => {
    const {category} = useParams();
    const [products, setProducts] = useState([]);

    const {loading, data} = useQuery(GET_CATEGORY, {
        variables: { // a config object that contains the variables needed for the query
            title: category
        }
    });

    useEffect(() => {
        if (!loading && data) {
            const {
                getCollectionsByTitle: {items} // nested destructuring
            } = data;
            setProducts(items);
        }
    }, [category, data]);

    return (
        <>
            {loading ?
                <Spinner/> :
                <>
                    <Title>{category.toUpperCase()}</Title>
                    <CategoryContainer>
                        {products &&
                            products.map((product) => (
                                <ProductCard key={product.id} product={product}/>
                            ))}
                    </CategoryContainer>
                </>}
        </>
    );
};

export default Category;
