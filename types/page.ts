export interface GraphQLResponse {
    data: GraphQLData
}

interface GraphQLData {
    pages: Array<Page>
}

interface Page {
    enabled: boolean
    slug: string
    title: string
    content: Array<Object>
}