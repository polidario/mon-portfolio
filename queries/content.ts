export const contentQuery = `
query Pages($Slug: String!){
  pages(filters:  {
     slug:  {
        eq: $Slug
     }
  }) {
    enabled
    title
    slug
    content {
      ... on ComponentSectionsHeadline {
        __typename
        id
        title
        subtitle
      }

      ... on ComponentSectionsImage {
        __typename
        id
      }
    }
  }
}`