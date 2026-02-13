# Form Patterns

**Status:** 🚧 To be populated from Saleshandy screenshots

## Overview

This document defines form patterns, validation strategies, and best practices used in the Saleshandy application.

---

## Form Structure

### Basic Form Layout

```jsx
<form className={styles.form}>
  <div className={styles.formSection}>
    <h3>Section Title</h3>

    <div className={styles.formField}>
      <label htmlFor="field1">Field Label</label>
      <input type="text" id="field1" />
      <span className={styles.helperText}>Helper text</span>
    </div>

    <div className={styles.formField}>
      <label htmlFor="field2">Field Label</label>
      <input type="text" id="field2" />
    </div>
  </div>

  <div className={styles.formActions}>
    <button type="button" className="btn btn-secondary">Cancel</button>
    <button type="submit" className="btn btn-primary">Submit</button>
  </div>
</form>
```

### Specifications
- **Form Width:** [TO BE DOCUMENTED - max-width?]
- **Field Spacing:** `spacing.4` (16px) [TO BE CONFIRMED]
- **Section Spacing:** `spacing.8` (32px) [TO BE CONFIRMED]
- **Action Button Spacing:** `spacing.3` (12px) [TO BE CONFIRMED]

---

## Field Types

### Required Fields
- **Indicator:** Red asterisk (*) next to label
- **Position:** After label text
- **Color:** `colors.status.error`

### Optional Fields
- **Indicator:** "(optional)" text or no indicator? [TO BE CONFIRMED]
- **Color:** `colors.text.secondary`

### Read-Only Fields
- **Background:** `colors.gray.50` [TO BE CONFIRMED]
- **Border:** `colors.border.light`
- **Cursor:** `default`

---

## Validation Patterns

### When to Validate

**On Blur (After user leaves field):**
- [TO BE CONFIRMED - primary validation strategy?]
- Shows errors after user has finished editing

**On Submit:**
- [TO BE CONFIRMED - final validation?]
- Prevents form submission if errors exist
- Scrolls to first error field

**Real-Time (As user types):**
- [TO BE CONFIRMED - for specific fields?]
- Password strength indicators
- Username availability checks
- Character count

### Validation States

**Valid State:**
- Border: `colors.status.success` [optional]
- Icon: Success checkmark (right side)
- Message: Success text (optional)

**Invalid State:**
- Border: `colors.status.error`
- Icon: Error icon (right side)
- Message: Error text below field (required)

**Warning State:**
- Border: `colors.status.warning` [TO BE CONFIRMED]
- Icon: Warning icon (right side)
- Message: Warning text below field

---

## Error Messages

### Display Pattern
```jsx
<div className={styles.formField}>
  <label htmlFor="email">Email Address *</label>
  <input
    type="email"
    id="email"
    className={`${styles.input} ${styles.inputError}`}
    aria-invalid="true"
    aria-describedby="email-error"
  />
  <span className={styles.errorMessage} id="email-error">
    <Icon name="alert-circle" />
    Please enter a valid email address
  </span>
</div>
```

### Error Message Guidelines
- **Position:** Below the input field
- **Spacing:** `spacing.1` (4px) from input
- **Font Size:** `fontSize.xs` (12px)
- **Color:** `colors.status.error`
- **Icon:** Error icon (left side)

### Error Summary (Multiple Errors)
```jsx
<div className={styles.errorSummary} role="alert">
  <h4>Please fix the following errors:</h4>
  <ul>
    <li><a href="#field1">Error message 1</a></li>
    <li><a href="#field2">Error message 2</a></li>
  </ul>
</div>
```

**Position:** [TO BE DOCUMENTED - top of form? inline?]

---

## Input Patterns

### Text Input
```jsx
<div className={styles.formField}>
  <label htmlFor="name">Full Name *</label>
  <input
    type="text"
    id="name"
    placeholder="John Doe"
    required
  />
</div>
```

### Email Input
```jsx
<div className={styles.formField}>
  <label htmlFor="email">Email Address *</label>
  <input
    type="email"
    id="email"
    placeholder="you@example.com"
    required
  />
  <span className={styles.helperText}>We'll never share your email.</span>
</div>
```

### Password Input
```jsx
<div className={styles.formField}>
  <label htmlFor="password">Password *</label>
  <div className={styles.inputWrapper}>
    <input
      type={showPassword ? "text" : "password"}
      id="password"
      required
    />
    <button
      type="button"
      className={styles.inputAction}
      onClick={togglePasswordVisibility}
    >
      <Icon name={showPassword ? "eye-off" : "eye"} />
    </button>
  </div>
  <div className={styles.passwordStrength}>
    <span className={styles.strengthBar} data-strength="medium" />
    <span className={styles.strengthText}>Medium strength</span>
  </div>
</div>
```

### Select/Dropdown
```jsx
<div className={styles.formField}>
  <label htmlFor="country">Country *</label>
  <select id="country" required>
    <option value="">Select a country</option>
    <option value="us">United States</option>
    <option value="uk">United Kingdom</option>
  </select>
</div>
```

### Checkbox
```jsx
<div className={styles.formField}>
  <label className={styles.checkboxLabel}>
    <input type="checkbox" id="terms" required />
    <span>I agree to the Terms and Conditions *</span>
  </label>
</div>
```

### Radio Buttons
```jsx
<div className={styles.formField}>
  <fieldset>
    <legend>Subscription Plan *</legend>
    <label className={styles.radioLabel}>
      <input type="radio" name="plan" value="basic" />
      <span>Basic Plan</span>
    </label>
    <label className={styles.radioLabel}>
      <input type="radio" name="plan" value="pro" />
      <span>Pro Plan</span>
    </label>
  </fieldset>
</div>
```

### File Upload
```jsx
<div className={styles.formField}>
  <label htmlFor="file">Upload Document *</label>
  <div className={styles.fileUpload}>
    <input type="file" id="file" accept=".pdf,.doc,.docx" />
    <button type="button" className="btn btn-secondary">
      <Icon name="upload" />
      Choose File
    </button>
    <span className={styles.fileName}>No file chosen</span>
  </div>
  <span className={styles.helperText}>Max file size: 10MB</span>
</div>
```

---

## Form Actions

### Button Placement
```jsx
<div className={styles.formActions}>
  <button type="button" className="btn btn-secondary">
    Cancel
  </button>
  <button type="submit" className="btn btn-primary">
    Save Changes
  </button>
</div>
```

**Alignment:** [TO BE DOCUMENTED - right? center? left?]
**Spacing:** `spacing.3` (12px) between buttons
**Order:** Secondary action (left), Primary action (right)

### Loading State
```jsx
<button type="submit" className="btn btn-primary" disabled>
  <Spinner size="sm" />
  Saving...
</button>
```

---

## Multi-Step Forms

### Step Indicator
```jsx
<div className={styles.stepIndicator}>
  <div className={`${styles.step} ${styles.stepCompleted}`}>
    <span className={styles.stepNumber}>1</span>
    <span className={styles.stepLabel}>Account Details</span>
  </div>
  <div className={`${styles.step} ${styles.stepActive}`}>
    <span className={styles.stepNumber}>2</span>
    <span className={styles.stepLabel}>Personal Info</span>
  </div>
  <div className={styles.step}>
    <span className={styles.stepNumber}>3</span>
    <span className={styles.stepLabel}>Confirmation</span>
  </div>
</div>
```

### Navigation
```jsx
<div className={styles.formActions}>
  <button type="button" className="btn btn-secondary">
    <Icon name="arrow-left" />
    Back
  </button>
  <button type="submit" className="btn btn-primary">
    Next
    <Icon name="arrow-right" />
  </button>
</div>
```

---

## Inline Editing

### Pattern
```jsx
// View mode
<div className={styles.inlineField}>
  <span className={styles.label}>Email:</span>
  <span className={styles.value}>user@example.com</span>
  <button className="btn btn-ghost btn-sm">
    <Icon name="edit" />
  </button>
</div>

// Edit mode
<div className={styles.inlineField}>
  <input type="email" value="user@example.com" />
  <button className="btn btn-primary btn-sm">Save</button>
  <button className="btn btn-ghost btn-sm">Cancel</button>
</div>
```

---

## Form Success

### Success Message
```jsx
<div className={styles.successMessage} role="alert">
  <Icon name="check-circle" />
  <h3>Success!</h3>
  <p>Your changes have been saved.</p>
</div>
```

**Display Duration:** [TO BE DOCUMENTED - auto-dismiss? permanent?]
**Position:** [TO BE DOCUMENTED - top of form? toast?]

---

## Accessibility

### Required Patterns
- All form fields must have associated `<label>` elements
- Use `aria-required="true"` for required fields
- Use `aria-invalid="true"` for fields with errors
- Use `aria-describedby` to link helper text and error messages
- Use `role="alert"` for error summaries
- Use proper `<fieldset>` and `<legend>` for radio/checkbox groups

### Keyboard Navigation
- Tab through all interactive elements
- Enter to submit form
- Space to toggle checkboxes/radios
- Escape to cancel/close modals

---

## Best Practices

### Do:
- Group related fields together
- Provide clear labels for all fields
- Show inline validation feedback
- Use appropriate input types (email, tel, url, number)
- Provide helper text for complex requirements
- Make error messages specific and actionable

### Don't:
- Use placeholder text as labels
- Validate before user finishes typing (except for real-time cases)
- Show generic error messages ("Invalid input")
- Disable submit button while form has errors (show errors instead)
- Use too many required fields

---

**Next Steps:**
1. Analyze Saleshandy forms from screenshots
2. Document validation timing and behavior
3. Capture error message patterns and styles
4. Identify form-specific components (date pickers, autocomplete, etc.)
5. Document any custom form patterns

---

**Note:** This document will be continuously updated as we observe and document more form patterns from the Saleshandy application.
