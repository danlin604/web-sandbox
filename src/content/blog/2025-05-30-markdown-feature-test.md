---
title: 'Complete Markdown Feature Test'
date: '2025-05-30'
excerpt: 'A comprehensive test of all markdown features including headers, lists, code blocks, tables, and more'
tags: ['markdown', 'test', 'mdsvex', 'documentation']
slug: '2025-05-30-markdown-feature-test'
author: 'Me'
published: true
---

# {title}

_Published on {date} by {author}_

This is a comprehensive test of all markdown features to ensure MDSvex is working properly.

## Headers

# H1 Header

## H2 Header

### H3 Header

#### H4 Header

##### H5 Header

###### H6 Header

## Text Formatting

**Bold text** and **also bold**

_Italic text_ and _also italic_

**_Bold and italic_** and **_also bold and italic_**

~~Strikethrough text~~

`Inline code`

## Lists

### Unordered Lists

- First item
- Second item
  - Nested item
  - Another nested item
    - Deep nested item
- Third item

### Ordered Lists

1. First ordered item
2. Second ordered item
   1. Nested ordered item
   2. Another nested ordered item
3. Third ordered item

### Task Lists

- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task
- [ ] Another incomplete task

## Links and Images

[This is a link](https://svelte.dev)

[Link with title](https://kit.svelte.dev 'SvelteKit Documentation')

## Blockquotes

> This is a blockquote
>
> With multiple lines
>
> > And nested blockquotes
> >
> > > Even deeper nesting

## Code Blocks

### JavaScript

```javascript
function greetUser(name) {
  console.log(`Hello, ${name}!`);
  return `Welcome to the blog, ${name}`;
}

const user = 'Developer';
greetUser(user);
```

### TypeScript

```typescript
interface BlogPost {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  slug: string;
}

const post: BlogPost = {
  title: 'My Blog Post',
  date: '2025-05-30',
  excerpt: 'This is a test post',
  tags: ['test', 'markdown'],
  slug: 'test-post',
};
```

### CSS

```css
.blog-post {
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Inter', sans-serif;
}

.blog-post h1 {
  color: #1a202c;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}
```

### Svelte Component

```svelte
<script>
  let count = 0;

  function increment() {
    count += 1;
  }
</script>

<button onclick={increment}>
  Count: {count}
</button>

<style>
  button {
    background: #ff3e00;
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;
  }
</style>
```

## Tables

| Feature     | Status     | Notes                      |
| ----------- | ---------- | -------------------------- |
| Headers     | ✅ Working | All levels supported       |
| Lists       | ✅ Working | Ordered, unordered, nested |
| Code blocks | ✅ Working | Syntax highlighting        |
| Tables      | ✅ Working | This table!                |
| Links       | ✅ Working | Internal and external      |
| Images      | ⚠️ Testing | Need to test images        |

### Table with Alignment

| Left Aligned | Center Aligned | Right Aligned |
| :----------- | :------------: | ------------: |
| Left         |     Center     |         Right |
| This is      |   some test    |       content |
| to verify    |     table      |     alignment |

## Horizontal Rules

---

## Math (if supported)

Inline math: `$E = mc^2$`

Block math:

```
$$
\sum_{i=1}^{n} x_i = x_1 + x_2 + \cdots + x_n
$$
```

## Special Characters

- En dash: –
- Em dash: —
- Ellipsis: …
- Copyright: ©
- Trademark: ™
- Registered: ®

## Escape Characters

\*This is not italic\*

\`This is not code\`

\# This is not a header

## Line Breaks

This is a line with two spaces at the end
This should be on a new line

This is a paragraph with a hard break.

This is a new paragraph.

## Footnotes (if supported)

This text has a footnote[^1].

This text has another footnote[^note].

[^1]: This is the first footnote.

[^note]: This is a named footnote.

## Emoji (if supported)

:rocket: :heart: :tada: :computer: :coffee:

## Definition Lists (if supported)

Term 1
: Definition for term 1

Term 2
: Definition for term 2
: Another definition for term 2

## Abbreviations (if supported)

_[HTML]: Hyper Text Markup Language
_[CSS]: Cascading Style Sheets

The HTML and CSS specifications are maintained by W3C.

## Conclusion

This comprehensive test covers most standard markdown features. If you can see all these elements rendered properly, your MDSvex setup is working correctly!

---
