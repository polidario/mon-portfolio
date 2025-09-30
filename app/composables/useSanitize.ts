import { sanitize } from 'isomorphic-dompurify'

const HTML_ALLOWED_TAGS = [
  'p', 'br', 'strong', 'em', 'u', 's', 'sup', 'sub',
  'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'blockquote', 'code', 'pre', 'span', 'small'
]

const HTML_ALLOWED_ATTR = [
  'href', 'target', 'rel', 'class', 'id', 'title', 'aria-label', 'role'
]

const SVG_ALLOWED_TAGS = [
  'svg', 'g', 'path', 'circle', 'rect', 'polygon', 'polyline', 'line', 'ellipse',
  'defs', 'linearGradient', 'radialGradient', 'stop', 'title', 'desc', 'symbol', 'use'
]

const SVG_ALLOWED_ATTR = [
  'class', 'id', 'viewBox', 'xmlns', 'fill', 'stroke', 'stroke-width', 'd', 'points',
  'cx', 'cy', 'r', 'rx', 'ry', 'x', 'y', 'x1', 'x2', 'y1', 'y2', 'width', 'height',
  'opacity', 'transform', 'fill-rule', 'clip-rule', 'aria-label', 'role', 'href', 'xlink:href'
]

export function useSanitize() {
  const sanitizeContent = (html?: string | null) =>
    html ? sanitize(html, {
      ALLOWED_TAGS: HTML_ALLOWED_TAGS,
      ALLOWED_ATTR: HTML_ALLOWED_ATTR,
      USE_PROFILES: { html: true }
    }) : ''

  const sanitizeSvg = (svg?: string | null) =>
    svg ? sanitize(svg, {
      ALLOWED_TAGS: SVG_ALLOWED_TAGS,
      ALLOWED_ATTR: SVG_ALLOWED_ATTR,
      USE_PROFILES: { svg: true, svgFilters: true }
    }) : ''

  return { sanitizeContent, sanitizeSvg }
}