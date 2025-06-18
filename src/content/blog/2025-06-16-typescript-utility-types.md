---
title: 'TypeScript Utility Types Cheat Sheet'
date: '2025-06-16'
excerpt: 'Essential TypeScript utility types for cleaner and more maintainable code'
tags: ['typescript', 'types', 'utilities', 'development']
slug: '2025-06-16-typescript-utility-types'
author: 'Me'
published: true
---

# TypeScript Utility Types

## Most Useful Utilities

Quick reference for the most commonly used utility types:

```typescript
// Pick specific properties
type UserProfile = Pick<User, 'name' | 'email'>;

// Make all properties optional
type PartialUser = Partial<User>;

// Create from union of strings
type Status = 'loading' | 'success' | 'error';
type StatusRecord = Record<Status, boolean>;