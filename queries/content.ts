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
        headlineTitle: title
        subtitle
      }

      ... on ComponentSectionsImage {
        __typename
        id
        image {
          url
          alternativeText
          width
          height
          name
        }
      }

      ... on ComponentSectionsTextBlock {
        __typename
        id
        content
        textAlign
        textSize
      }

      ... on ComponentSectionsButton {
        __typename
        id
        text
        url
        isExternal
        variant
        size
        fullWidth
      }

      ... on ComponentSectionsCard {
        __typename
        id
        cardTitle: title
        description
        linkText
        linkUrl
        linkIsExternal
        imagePosition
        image {
          url
          alternativeText
          width
          height
          name
        }
      }

      ... on ComponentSectionsTestimonial {
        __typename
        id
        quote
        authorName
        authorTitle
        authorCompany
        rating
        authorImage {
          url
          alternativeText
          width
          height
          name
        }
      }

      ... on ComponentSectionsGrid {
        __typename
        id
        columns
        gap
        alignment
        containerClass
        blocks {
          ... on ComponentSectionsHeadline {
            __typename
            id
            headlineTitle: title
            subtitle
          }

          ... on ComponentSectionsImage {
            __typename
            id
            image {
              url
              alternativeText
              width
              height
              name
            }
          }

          ... on ComponentSectionsTextBlock {
            __typename
            id
            content
            textAlign
            textSize
          }

          ... on ComponentSectionsButton {
            __typename
            id
            text
            url
            isExternal
            variant
            size
            fullWidth
          }

          ... on ComponentSectionsCard {
            __typename
            id
            cardTitle: title
            description
            linkText
            linkUrl
            linkIsExternal
            imagePosition
            image {
              url
              alternativeText
              width
              height
              name
            }
          }

          ... on ComponentSectionsTestimonial {
            __typename
            id
            quote
            authorName
            authorTitle
            authorCompany
            rating
            authorImage {
              url
              alternativeText
              width
              height
              name
            }
          }
        }
      }
    }
  }
}`