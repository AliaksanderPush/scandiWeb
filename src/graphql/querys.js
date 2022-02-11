import { gql } from "graphql-tag";

export const MENU_CATEGORIES = gql`
  query {
    categories {
      name
      products {
        id
        name
        inStock
        gallery
        description
        category
      }
    }
  }
`;
export const getCategory = (cat) => {
  return gql`
    query {
        category(input:{title:"${cat}"}){
            products {
                id
                brand
                name
                inStock
                gallery
                prices {
                   currency {
                      label
                      symbol
                   }
                    amount
                }
            }    
        }
    }
  `;
};
export const GET_CURRENCIES = gql`
  query {
    currencies {
      label
      symbol
    }
  }
`;
export const getProdDetails = (id) => {
  return gql`
    query {
      product (id:"${id}") {
        brand
        name
        gallery
        prices {
          currency{
          label
          symbol
        }
          amount
        }
        attributes {
          name
          type
          items {
            value
          }
        }
      }
    }
  `;
};