<template>
  <div class="page page-content">
    <section v-for="section in content" :key="section.id" class="">
      <div 
      v-if="section.__typename === 'ComponentSectionsHeadline'"
      class="sub-text">
        <h2>{{ section.headlineTitle }}</h2>
        <p>{{ section.subtitle }}</p>
      </div>

      <div
      v-if="section.__typename === 'ComponentSectionsImage' && section.image" 
      class="image-section">
        <img :src="section.image?.url" :alt="section.image?.alternativeText || ''" />
      </div>

      <div 
        v-if="section.__typename === 'ComponentSectionsTextBlock'"
        class="text-block" 
        :class="[
          `text-align-${section.textAlign || 'left'}`,
          `text-size-${section.textSize || 'medium'}`
        ]"
      >
        <div v-html="sanitizeContent(section.content)"></div>
      </div>

      <div v-if="section.__typename === 'ComponentSectionsButton'" class="button-wrapper">
        <a
          v-if="section.url"
          :href="section.url"
          :target="section.isExternal ? '_blank' : '_self'"
          :rel="section.isExternal ? 'noopener noreferrer' : ''"
          :class="[
            'btn',
            `btn-${section.variant || 'primary'}`,
            `btn-${section.size || 'medium'}`,
            { 'btn-full-width': section.fullWidth }
          ]"
        >
          {{ section.text }}
        </a>
        <button
          v-else
          :class="[
            'btn',
            `btn-${section.variant || 'primary'}`,
            `btn-${section.size || 'medium'}`,
            { 'btn-full-width': section.fullWidth }
          ]"
        >
          {{ section.text }}
        </button>
      </div>

      <div v-if="section.__typename === 'ComponentSectionsCard'" class="card">
        <div 
          :class="[
            'card-content',
            `image-position-${section.imagePosition || 'top'}`
          ]"
        >
          <img 
            v-if="section.image?.url"
            :src="section.image.url" 
            :alt="section.image?.alternativeText || section.cardTitle"
            class="card-image"
          />
          <div class="card-text">
            <h3 class="card-title">{{ section.cardTitle }}</h3>
            <p v-if="section.description" class="card-description">{{ section.description }}</p>
          </div>
        </div>
      </div>

      <div v-if="section.__typename === 'ComponentSectionsTestimonial'" class="testimonial">
        <blockquote class="testimonial-quote">
          "{{ section.quote }}"
        </blockquote>
        <div class="testimonial-author">
          <img 
            v-if="section.authorImage?.url"
            :src="section.authorImage.url" 
            :alt="section.authorName"
            class="author-image"
          />
          <div class="author-info">
            <div class="author-name">{{ section.authorName }}</div>
            <div v-if="section.authorTitle" class="author-title">{{ section.authorTitle }}</div>
            <div v-if="section.authorCompany" class="author-company">{{ section.authorCompany }}</div>
            <div v-if="section.rating" class="rating">
              <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= section.rating }">
                ★
              </span>
            </div>
          </div>
        </div>
      </div>

      <div 
        v-if="section.__typename === 'ComponentSectionsGrid' && section.blocks"
        class="content grid" 
        :class="[
          `grid-columns-${section.columns || 'three'}`,
          `grid-gap-${section.gap || 'medium'}`,
          `grid-align-${section.alignment || 'start'}`,
          section.containerClass
        ]"
      >
        <div v-for="block in section.blocks" :key="block.id" class="grid-item">
          <div v-if="block.__typename === 'ComponentSectionsHeadline'" class="sub-text">
            <h3>{{ block.headlineTitle }}</h3>
            <p>{{ block.subtitle }}</p>
          </div>

          <div 
          v-if="block.__typename === 'ComponentSectionsImage' && block.image?.url"
          class="image-section">
            <img :src="block.image.url" :alt="block.image?.alternativeText || ''" />
          </div>

          <div 
            v-if="block.__typename === 'ComponentSectionsTextBlock'"
            class="text-block" 
            :class="[
              `text-align-${block.textAlign || 'left'}`,
              `text-size-${block.textSize || 'medium'}`
            ]"
          >
            <div v-html="sanitizeContent(block.content)"></div>
          </div>

          <div v-if="block.__typename === 'ComponentSectionsButton'" class="button-wrapper">
            <a
              v-if="block.url"
              :href="block.url"
              :target="block.isExternal ? '_blank' : '_self'"
              :rel="block.isExternal ? 'noopener noreferrer' : ''"
              :class="[
                'btn',
                `btn-${block.variant || 'primary'}`,
                `btn-${block.size || 'medium'}`,
                { 'btn-full-width': block.fullWidth }
              ]"
            >
              {{ block.text }}
            </a>
            <button
              v-else
              :class="[
                'btn',
                `btn-${block.variant || 'primary'}`,
                `btn-${block.size || 'medium'}`,
                { 'btn-full-width': block.fullWidth }
              ]"
            >
              {{ block.text }}
            </button>
          </div>

          <div v-if="block.__typename === 'ComponentSectionsCard'" class="card">
            <div 
              :class="[
                'card-content',
                `image-position-${block.imagePosition || 'top'}`
              ]"
            >
              <img 
                v-if="block.image?.url"
                :src="block.image.url" 
                :alt="block.image?.alternativeText || block.cardTitle"
                class="card-image"
              />
              <div class="card-text">
                <h4 class="card-title">{{ block.cardTitle }}</h4>
                <p v-if="block.description" class="card-description">{{ block.description }}</p>
                <a
                  v-if="block.linkText && block.linkUrl"
                  :href="block.linkUrl"
                  :target="block.linkIsExternal ? '_blank' : '_self'"
                  :rel="block.linkIsExternal ? 'noopener noreferrer' : ''"
                  class="card-link"
                >
                  {{ block.linkText }}
                </a>
              </div>
            </div>
          </div>

          <div v-if="block.__typename === 'ComponentSectionsTestimonial'" class="testimonial">
            <blockquote class="testimonial-quote">
              "{{ block.quote }}"
            </blockquote>
            <div class="testimonial-author">
              <img 
                v-if="block.authorImage?.url"
                :src="block.authorImage.url" 
                :alt="block.authorName"
                class="author-image"
              />
              <div class="author-info">
                <div class="author-name">{{ block.authorName }}</div>
                <div v-if="block.authorTitle" class="author-title">{{ block.authorTitle }}</div>
                <div v-if="block.authorCompany" class="author-company">{{ block.authorCompany }}</div>
                <div v-if="block.rating" class="rating">
                  <span v-for="star in 5" :key="star" class="star" :class="{ filled: star <= block.rating }">
                    ★
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
interface Props {
  content: any
  title?: string
}

defineProps<Props>()

const { sanitizeContent } = useSanitize()
</script>

<style scoped>
.hero {
  text-align: center;
  width: 650px;
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem 0 8rem 0;
}
.sub-text {
  padding: 0 0 3rem 0;
}
.hero-subtitle p {
  margin: 0;
  padding: 0;
}
.hero-subtitle {
  font-size: 1em;
  font-weight: 400;
  line-height: 1.68;
  padding: 0;
  margin: 0;
  opacity: 0.6;
}
.subtitle {
  font-size: 1.5em;
  font-weight: 500;
  line-height: 1.68;
  padding: 0;
  margin: 0;
  opacity: 0.6;
}
.project {
  grid-column: auto / span 2;
  text-align: center;
}
@media (min-width: 920px) {
  .project {
    grid-column: auto / span 1;
  }
  .project:nth-child(3n + 1) {
    grid-column: auto / span 2;
  }
}
</style>