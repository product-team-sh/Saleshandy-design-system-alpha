# Custom Hooks for React 16.8+ Compatibility

These hooks replace Radix UI primitives for components that need to work with React 16.8+.

## Why These Hooks?

Radix UI requires React 18+. Since the Saleshandy production codebase (`saleshandy-webui`) uses React 16, we cannot use Radix. These 6 custom hooks provide the same functionality as Radix primitives while maintaining compatibility with React 16.8+.

---

## Hooks

### `useFocusTrap`

Traps focus within a container (modals, dropdowns, dialogs).

**Replaces:** Radix Dialog focus management

**Usage:**
```typescript
const Modal = ({ isOpen, children }) => {
  const containerRef = useFocusTrap<HTMLDivElement>(isOpen);

  return isOpen ? (
    <div ref={containerRef} role="dialog">
      {children}
    </div>
  ) : null;
};
```

**Features:**
- Focuses first focusable element on activation
- Tab/Shift+Tab cycles through focusable elements
- Restores focus to previously focused element on deactivation
- Handles dynamically added/removed focusable elements

---

### `useClickOutside`

Detects clicks outside an element to trigger a callback (close dropdowns, modals, popovers).

**Replaces:** Radix Popover dismiss behavior

**Usage:**
```typescript
const Dropdown = ({ isOpen, onClose }) => {
  const dropdownRef = useClickOutside<HTMLDivElement>(
    onClose,
    isOpen // only active when open
  );

  return isOpen ? (
    <div ref={dropdownRef}>
      Dropdown content
    </div>
  ) : null;
};
```

**Advanced: Multiple refs with exclusions**
```typescript
const [buttonRef, dropdownRef] = useMultipleClickOutside(
  handleClose,
  isOpen,
  2 // number of refs
);

<button ref={buttonRef}>Toggle</button>
<div ref={dropdownRef}>Dropdown</div>
```

**Features:**
- Uses mousedown/touchstart (triggers before focus change)
- Supports excluded refs (e.g., trigger button shouldn't close dropdown)
- Can be toggled active/inactive

---

### `useKeyboardNav`

Provides arrow key navigation for lists (dropdowns, radio groups, tabs, menus).

**Replaces:** Radix Listbox keyboard behavior

**Usage:**
```typescript
const Dropdown = ({ items, onSelect }) => {
  const { activeIndex, handleKeyDown, setActiveIndex } = useKeyboardNav(
    items.length,
    {
      orientation: 'vertical', // or 'horizontal' for tabs
      loop: true,              // wrap at edges
      onSelect: (index) => onSelect(items[index]),
    }
  );

  return (
    <div onKeyDown={handleKeyDown} role="listbox">
      {items.map((item, index) => (
        <div
          key={index}
          role="option"
          aria-selected={index === activeIndex}
          onMouseEnter={() => setActiveIndex(index)}
        >
          {item}
        </div>
      ))}
    </div>
  );
};
```

**Options:**
- `orientation`: `'vertical'` (ArrowUp/Down) or `'horizontal'` (ArrowLeft/Right)
- `loop`: Whether to wrap at edges (default: `true`)
- `onSelect`: Callback when Enter/Space is pressed
- `onChange`: Callback when active index changes
- `autoFocus`: Auto-focus items on navigation

**Roving tabindex variant:**
```typescript
const { activeIndex, handleKeyDown } = useRovingTabIndex(itemCount);
// Automatically sets tabIndex=0 for active item, -1 for others
```

---

### `useControllableState`

Implements controlled/uncontrolled pattern for form components.

**Replaces:** Radix controlled/uncontrolled utilities

**Usage:**
```typescript
function Toggle({ value, defaultValue = false, onChange }) {
  const [state, setState] = useControllableState({
    value,           // controlled value (optional)
    defaultValue,    // uncontrolled default
    onChange,        // called on every change
  });

  return (
    <button onClick={() => setState(!state)}>
      {state ? 'On' : 'Off'}
    </button>
  );
}
```

**Uncontrolled:**
```tsx
<Toggle defaultValue={false} onChange={console.log} />
```

**Controlled:**
```tsx
const [value, setValue] = useState(false);
<Toggle value={value} onChange={setValue} />
```

**Variants:**
- `useControllableBooleanState` — For checkboxes, toggles
- `useControllableOpenState` — For modals, dropdowns (open/closed)

---

### `useMergedRefs`

Combines multiple refs into one (forward ref + internal ref).

**Replaces:** Radix ref composition

**Usage:**
```typescript
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, forwardedRef) => {
    const internalRef = useRef<HTMLButtonElement>(null);
    const mergedRef = useMergedRefs(forwardedRef, internalRef);

    useEffect(() => {
      // Can use internalRef here
      internalRef.current?.focus();
    }, []);

    return <button ref={mergedRef} {...props} />;
  }
);
```

**Utilities:**
- `setRef(ref, value)` — Imperatively set a ref
- `hasRef(ref)` — Check if ref has a value

---

### `usePortal`

Renders children into a portal container (modals, tooltips, dropdowns, toasts).

**Replaces:** Radix Portal

**Usage:**
```typescript
const Tooltip = ({ children, content }) => {
  const { Portal } = usePortal('tooltip-root');
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <button onMouseEnter={() => setOpen(true)}>
        {children}
      </button>
      {isOpen && <Portal>{content}</Portal>}
    </>
  );
};
```

**Variants:**
```typescript
// Always render to document.body
const Portal = useBodyPortal();

// With z-index management
const { Portal, zIndex } = useStackedPortal('modal');
// zIndex: dropdown=1000, sticky=1100, modal=1200, popover=1300, tooltip=1400
```

**Features:**
- Auto-creates portal container if it doesn't exist
- Container persists across mounts/unmounts
- Stacked portals with z-index management

---

## Component Usage Matrix

| Component | Hooks Used |
|-----------|------------|
| **Button** | `useMergedRefs` |
| **Input** | `useControllableState`, `useMergedRefs` |
| **Checkbox** | `useControllableBooleanState`, `useMergedRefs` |
| **Radio** | `useKeyboardNav`, `useControllableState` |
| **Toggle** | `useControllableBooleanState`, `useMergedRefs` |
| **Dropdown** | `useFocusTrap`, `useClickOutside`, `useKeyboardNav`, `usePortal`, `useControllableOpenState` |
| **Modal** | `useFocusTrap`, `useClickOutside`, `usePortal`, `useControllableOpenState` |
| **Tooltip** | `usePortal` |
| **Toast** | `usePortal` |
| **Tabs** | `useKeyboardNav`, `useControllableState` |

---

## Installation

These hooks have no external dependencies besides React 16.8+.

```bash
# Required peer dependency
npm install react@^16.8.0 react-dom@^16.8.0
```

---

## Testing

All hooks are unit-tested with Vitest + React Testing Library.

```bash
npm run test hooks/
```

---

## Notes

- **React 18+ migration:** When you upgrade to React 18+, you can switch to Radix UI and remove these hooks (or keep them for backwards compatibility).
- **Performance:** These hooks are optimized for performance and match Radix's behavior.
- **Accessibility:** All hooks follow WCAG 2.1 AA accessibility patterns.
