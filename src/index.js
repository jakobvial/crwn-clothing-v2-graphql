import React from "react";
import {render} from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {ApolloClient, ApolloProvider, InMemoryCache} from "@apollo/client";

import App from "./App";
import {UserProvider} from "./contexts/user.context";
import {CategoriesProvider} from "./contexts/categories.context";
import {CartProvider} from "./contexts/cart.context";

import "./index.scss";

const client = new ApolloClient({
    uri: "https://crwn-clothing.com/",
    cache: new InMemoryCache() // InMemoryCache is the default cache implementation.
    // It stores the cache in memory (JS object),
    // and it supports all of Apollo Client 3's features except for pagination.
});

const rootElement = document.getElementById("root");

render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <UserProvider>
                    <CategoriesProvider>
                        <CartProvider>
                            <App/>
                        </CartProvider>
                    </CategoriesProvider>
                </UserProvider>
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>,
    rootElement
);
