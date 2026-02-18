# AI Search Component (Conversational Lead Finder)

**Status:** Created for Lead Finder natural language search (2026-02-17)

## Overview

Conversational AI search allows users to find leads using natural language queries instead of manual filter selection. The AI interprets intent and automatically applies appropriate filters to the Lead Finder table.

---

## Use Cases

**Example queries:**
- "Show me manufacturing companies in United States founded after 2000"
- "Find tech startups in California with 50-200 employees"
- "Get me B2B SaaS companies in New York with Series A funding"
- "Companies in healthcare industry, revenue over $10M"
- "Retail businesses in Texas founded in last 5 years"

---

## Anatomy

```
AI Search Bar
├── Search Input (expandable)
│   ├── AI icon (left)
│   ├── Input field (natural language)
│   ├── Clear button (right, when has value)
│   └── Submit button (send icon)
├── Suggestion Pills (below input, when empty)
│   ├── "Tech companies in USA"
│   ├── "Founded after 2020"
│   └── "Revenue > $5M"
├── Active Query Display (when search active)
│   ├── Query text
│   ├── Applied filters count badge
│   └── Clear search button
└── Results Status (below search)
    ├── "Found 1,247 leads matching your search"
    └── Loading state: "Searching..."
```

---

## Component States

### 1. Empty State (Default)

| Property | Value |
|----------|-------|
| Height | 48px |
| Width | 100% (max 600px) |
| Border | 1px solid #e5e7eb |
| Border Radius | 8px |
| Background | #ffffff |
| Placeholder | "Ask AI to find leads... e.g., 'Tech companies in California'" |

**Visual elements:**
- AI sparkle icon (left, 20px, gradient purple-blue)
- Input field (14px, gray.400 placeholder)
- Suggestion pills below (3-4 examples)

### 2. Focus State

| Property | Value |
|----------|-------|
| Border | 2px solid #1d4ed8 |
| Box Shadow | 0 0 0 2px rgba(29, 78, 216, 0.25) |
| Background | #ffffff |
| Suggestion Pills | Visible below |

### 3. Typing State

| Property | Value |
|----------|-------|
| Text Color | #1f2937 |
| Submit Button | Appears (right side) |
| Clear Button | Appears (x icon, 16px) |

### 4. Loading State

| Property | Value |
|----------|-------|
| Border | 2px solid #1d4ed8 |
| Submit Button | Replaced with spinner |
| Cursor | wait |

**Loading text below:**
- "Analyzing your query..."
- "Applying filters..."
- "Searching leads..."

### 5. Active Search State

| Property | Value |
|----------|-------|
| Background | #eff6ff (primary.50) |
| Border | 1px solid #93c5fd (primary.300) |
| Query Display | Visible inside bar |
| Filter Badge | Shows count (e.g., "4 filters") |

**Layout:**
```
[AI icon] "Tech companies in California" [4 filters applied] [Clear x]
```

### 6. Error State

| Property | Value |
|----------|-------|
| Border | 2px solid #b91c1c (red.700) |
| Background | #fef2f2 (red.50) |
| Error Icon | Red warning triangle |

**Error messages:**
- "I couldn't understand that query. Try 'companies in [location]' or 'founded after [year]'"
- "No filters could be applied. Try a different query."

---

## AI Icon (Gradient)

| Property | Value |
|----------|-------|
| Size | 20x20px |
| Gradient | linear-gradient(135deg, #8b5cf6 0%, #3b82f6 100%) |
| Animation | Pulse when loading (subtle) |
| Position | Left side, 12px from edge |

---

## Suggestion Pills

### Pill Style

| Property | Value |
|----------|-------|
| Padding | 6px 12px |
| Border Radius | 9999px (full pill) |
| Background | #f3f4f6 (gray.100) |
| Text Color | #6b7280 (gray.500) |
| Font | 12px / 500 |
| Border | 1px solid #e5e7eb |

### States

**Hover:**
- Background: #e5e7eb (gray.200)
- Text: #4b5563 (gray.600)
- Cursor: pointer

**Active:**
- Background: #dbeafe (primary.100)
- Text: #1d4ed8 (primary.700)
- Border: #93c5fd (primary.300)

### Example Pills

1. "Tech companies in USA"
2. "Founded after 2020"
3. "Revenue > $5M"
4. "50-200 employees"

---

## Applied Filters Display

### Filter Chip (inside search bar when active)

| Property | Value |
|----------|-------|
| Padding | 2px 8px |
| Border Radius | 4px |
| Background | #1d4ed8 (primary.700) |
| Text Color | #ffffff |
| Font | 12px / 600 |
| Icon | Filter icon (16px) |

**Format:** `[Filter icon] 4 filters applied`

**On click:** Opens dropdown showing all applied filters

---

## Results Status Banner

### Success State

| Property | Value |
|----------|-------|
| Background | #ecfdf5 (green.50) |
| Border | 1px solid #a7f3d0 (green.200) |
| Text Color | #065f46 (green.800) |
| Icon | Check circle (green.500) |
| Font | 14px / 500 |
| Padding | 12px 16px |

**Text:** "Found 1,247 leads matching your search"

### Empty State

| Property | Value |
|----------|-------|
| Background | #fffbeb (yellow.50) |
| Border | 1px solid #fde68a (yellow.200) |
| Text Color | #92400e (yellow.800) |
| Icon | Info circle (yellow.500) |

**Text:** "No leads found. Try adjusting your search."

---

## Integration with Lead Finder Table

### Placement

**Position:** Above existing filter bar
```
┌─────────────────────────────────────────┐
│  AI Search Bar (conversational input)   │
├─────────────────────────────────────────┤
│  Filter Bar (Company Location, etc.)    │ ← Existing filters (auto-populated by AI)
├─────────────────────────────────────────┤
│  Table (results)                        │
└─────────────────────────────────────────┘
```

### Behavior

1. **User types query** → Submit
2. **AI parses query** → Identifies:
   - Industry: "Tech"
   - Location: "California"
   - Founded year: "after 2020"
3. **System applies filters** → Programmatically sets:
   - Industry dropdown: "Technology"
   - Company Location: "California, United States"
   - Founding Year: min=2020
4. **Table updates** → Shows filtered results
5. **Filter chips appear** → In both AI search bar AND traditional filter bar

---

## AI Query Parsing (Backend Logic)

### Entity Extraction

**Industries:**
- Tech, Technology, Software → "Technology & IT"
- Manufacturing, Factory → "Manufacturing"
- Healthcare, Medical → "Healthcare"
- Retail, E-commerce → "Retail"

**Locations:**
- "United States", "USA", "US" → Country filter
- "California", "CA" → State filter
- "New York City" → City filter

**Founding Year:**
- "founded after 2020" → min_year=2020
- "founded before 2018" → max_year=2018
- "founded in 2019" → year=2019
- "founded in last 5 years" → min_year=(current_year - 5)

**Company Size:**
- "50-200 employees" → employee_range: [50, 200]
- "small companies" → employee_range: [1, 50]
- "enterprise" → employee_range: [1000+]

**Revenue:**
- "revenue over $10M" → min_revenue=10000000
- "revenue between $5M and $20M" → revenue_range: [5M, 20M]

**Funding Stage:**
- "Series A" → funding_stage: "Series A"
- "bootstrapped" → funding_stage: "Bootstrapped"
- "funded" → has_funding: true

### Response Format

```json
{
  "query": "Tech companies in California founded after 2020",
  "filters": {
    "industry": ["Technology & IT"],
    "location": {
      "country": "United States",
      "state": "California"
    },
    "founding_year": {
      "min": 2020
    }
  },
  "filtersApplied": 3,
  "resultsCount": 1247,
  "confidence": 0.95
}
```

---

## API Endpoints

### POST /api/ai-search/leads

**Request:**
```json
{
  "query": "Tech companies in California founded after 2020",
  "limit": 50,
  "offset": 0
}
```

**Response:**
```json
{
  "success": true,
  "query": "Tech companies in California founded after 2020",
  "filters": { /* parsed filters */ },
  "results": [ /* lead objects */ ],
  "total": 1247,
  "confidence": 0.95,
  "suggestions": [
    "Add employee count filter",
    "Narrow by funding stage"
  ]
}
```

### POST /api/ai-search/suggestions

**Request:**
```json
{
  "partial_query": "Tech companies in"
}
```

**Response:**
```json
{
  "suggestions": [
    "Tech companies in United States",
    "Tech companies in California",
    "Tech companies in New York"
  ]
}
```

---

## Keyboard Shortcuts

- **Cmd/Ctrl + K:** Focus AI search bar
- **Enter:** Submit query
- **Escape:** Clear search and close
- **Tab:** Navigate suggestion pills
- **Arrow Down:** Navigate suggestions dropdown (if implemented)

---

## Accessibility

- **Role:** `role="search"`
- **Label:** `aria-label="AI-powered lead search"`
- **Input:** `aria-describedby="ai-search-help-text"`
- **Loading:** `aria-busy="true"` when processing
- **Results:** `aria-live="polite"` for status announcements
- **Suggestion pills:** `role="button"` with `aria-label`
- **Keyboard:** Full keyboard navigation support
- **Screen reader:** Announces filter count and results count

---

## Component Dependencies

| Component | Usage |
|-----------|-------|
| [Input](./input.md) | Search input field |
| [Button](./button.md) | Submit, Clear buttons |
| [Icon](./icon.md) | AI icon, Clear icon, Filter icon |
| [Badge](./labels-badges-tags.md) | Applied filters count |
| [Spinner](./spinner.md) | Loading state |
| [Dropdown](./dropdown.md) | Applied filters dropdown (optional) |

---

## Implementation Example (React)

### Component Structure

```typescript
// ai-search.types.ts
export interface AISearchProps {
  onSearch: (query: string, filters: ParsedFilters) => void;
  onClear: () => void;
  isLoading?: boolean;
  resultsCount?: number;
  error?: string;
  suggestions?: string[];
}

export interface ParsedFilters {
  industry?: string[];
  location?: {
    country?: string;
    state?: string;
    city?: string;
  };
  founding_year?: {
    min?: number;
    max?: number;
  };
  employee_range?: [number, number];
  revenue_range?: [number, number];
  funding_stage?: string;
}
```

### AI Search Component

```tsx
// ai-search.tsx
import React, { useState, useCallback } from 'react';
import { cn } from '../../utils/cn';
import { AISearchProps } from './ai-search.types';

export const AISearch: React.FC<AISearchProps> = ({
  onSearch,
  onClear,
  isLoading = false,
  resultsCount,
  error,
  suggestions = [
    'Tech companies in USA',
    'Founded after 2020',
    'Revenue > $5M'
  ]
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim() || isLoading) return;

    try {
      const response = await fetch('/api/ai-search/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      const data = await response.json();
      onSearch(query, data.filters);
    } catch (err) {
      console.error('AI search error:', err);
    }
  }, [query, isLoading, onSearch]);

  const handleClear = useCallback(() => {
    setQuery('');
    onClear();
  }, [onClear]);

  const handleSuggestionClick = useCallback((suggestion: string) => {
    setQuery(suggestion);
    // Auto-submit on suggestion click
    handleSubmit({ preventDefault: () => {} } as React.FormEvent);
  }, [handleSubmit]);

  return (
    <div className="w-full max-w-3xl mx-auto space-y-3">
      {/* Main Search Bar */}
      <form
        onSubmit={handleSubmit}
        className={cn(
          'relative flex items-center gap-3 px-4 py-3',
          'border-2 rounded-lg transition-all duration-200',
          'bg-white',
          isFocused && !error && 'border-primary-700 shadow-focused',
          !isFocused && !error && 'border-gray-200',
          error && 'border-red-700 bg-red-50'
        )}
        role="search"
        aria-label="AI-powered lead search"
      >
        {/* AI Icon */}
        <div className="flex-shrink-0">
          <div
            className={cn(
              'w-5 h-5 rounded-full',
              'bg-gradient-to-br from-purple-500 to-blue-500',
              isLoading && 'animate-pulse'
            )}
            aria-hidden="true"
          >
            {/* Replace with actual AI sparkle icon */}
            ✨
          </div>
        </div>

        {/* Input Field */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask AI to find leads... e.g., 'Tech companies in California'"
          disabled={isLoading}
          className={cn(
            'flex-1 bg-transparent border-none outline-none',
            'text-gray-800 text-sm font-normal',
            'placeholder:text-gray-400',
            'disabled:cursor-wait'
          )}
          aria-describedby="ai-search-status"
        />

        {/* Clear Button */}
        {query && !isLoading && (
          <button
            type="button"
            onClick={handleClear}
            className="flex-shrink-0 p-1 hover:bg-gray-100 rounded"
            aria-label="Clear search"
          >
            <span className="text-gray-400 text-lg">×</span>
          </button>
        )}

        {/* Submit Button / Loading Spinner */}
        {isLoading ? (
          <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
            <div className="animate-spin w-4 h-4 border-2 border-primary-700 border-t-transparent rounded-full" />
          </div>
        ) : (
          <button
            type="submit"
            disabled={!query.trim()}
            className={cn(
              'flex-shrink-0 p-2 rounded',
              'text-primary-700 hover:bg-primary-50',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              'transition-colors'
            )}
            aria-label="Submit search"
          >
            →
          </button>
        )}
      </form>

      {/* Suggestion Pills (when empty or focused) */}
      {!query && (isFocused || suggestions.length > 0) && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Search suggestions">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className={cn(
                'px-3 py-1.5 rounded-full text-xs font-medium',
                'border border-gray-200 bg-gray-100 text-gray-500',
                'hover:bg-gray-200 hover:text-gray-600',
                'active:bg-primary-100 active:text-primary-700 active:border-primary-300',
                'transition-colors'
              )}
              type="button"
            >
              {suggestion}
            </button>
          ))}
        </div>
      )}

      {/* Results Status */}
      {resultsCount !== undefined && !isLoading && !error && (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-lg bg-green-50 border border-green-200"
          role="status"
          aria-live="polite"
          id="ai-search-status"
        >
          <span className="text-green-500">✓</span>
          <span className="text-sm font-medium text-green-800">
            Found {resultsCount.toLocaleString()} leads matching your search
          </span>
        </div>
      )}

      {/* Loading Status */}
      {isLoading && (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-lg bg-blue-50 border border-blue-200"
          role="status"
          aria-live="polite"
          aria-busy="true"
        >
          <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full" />
          <span className="text-sm font-medium text-blue-800">
            Analyzing your query...
          </span>
        </div>
      )}

      {/* Error Status */}
      {error && (
        <div
          className="flex items-center gap-2 px-4 py-3 rounded-lg bg-red-50 border border-red-200"
          role="alert"
        >
          <span className="text-red-500">⚠</span>
          <span className="text-sm font-medium text-red-800">{error}</span>
        </div>
      )}
    </div>
  );
};
```

---

## Responsive Behavior

### Desktop (>1024px)
- Full width search bar (max 600px centered)
- Suggestion pills in single row
- Filter dropdown shows all applied filters

### Tablet (768px - 1024px)
- Search bar takes 100% width
- Suggestion pills wrap to multiple rows
- Filter count badge visible

### Mobile (<768px)
- Full-width search bar
- Submit button moves to below input
- Suggestion pills stack vertically
- Applied filters shown as count only (tap to expand)

---

## Performance Optimization

1. **Debounce API calls** — Wait 300ms after user stops typing
2. **Cache common queries** — Store recent searches client-side
3. **Lazy load suggestions** — Only fetch when input focused
4. **Streaming results** — Show partial results as they arrive
5. **Cancel in-flight requests** — Use AbortController for query changes

---

## GitHub Deviation

This is a NEW component with no existing implementation. Follow Figma design system tokens exactly:
- Primary color: #1d4ed8 (NOT Ant Design blue)
- Border radius: 8px for search bar, 9999px for pills
- Font: Inter 14px
- Spacing: Use tokens.spacing values

---

## Related Components

- [Input](./input.md) — Search input field
- [Table](./table.md) — Lead results display
- [Dropdown](./dropdown.md) — Filter management
- [Badge](./labels-badges-tags.md) — Filter count indicator
- [Spinner](./spinner.md) — Loading state

---

## Testing Checklist

- [ ] Natural language queries parse correctly
- [ ] Filters apply programmatically to table
- [ ] Loading states show properly
- [ ] Error handling for invalid queries
- [ ] Suggestion pills clickable and functional
- [ ] Clear button removes filters and query
- [ ] Keyboard shortcuts work (Cmd+K, Enter, Escape)
- [ ] Screen reader announces results count
- [ ] Mobile responsive layout works
- [ ] API debouncing prevents excessive calls
