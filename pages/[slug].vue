<script lang="ts" setup>
import { contentQuery } from "~/queries/content";
import type { GraphQLResponse } from "~/types/page"

const route = useRoute()
const slug = route.params.slug

const graphql = useStrapiGraphQL()

const result = await graphql<GraphQLResponse>(contentQuery, { "Slug": slug })
const data = result.data;

console.log(data.pages)
</script>

<template>
    <div class="layout">
        <ContentGrid :content="data.pages[0].content"/>
    </div>
</template>