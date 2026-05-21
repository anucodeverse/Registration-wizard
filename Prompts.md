# Prompts.md

## AI Usage Documentation

This document records the prompts used during the development of the Registration Wizard module. The purpose of these prompts was to understand architecture, debug implementation issues, and improve code quality. AI was used as a learning and debugging assistant, not as a replacement for understanding the code.

---

## Prompt 1: Multi-Step Form Architecture

**Prompt:**

I am building a multi-step registration wizard in React. The form has separate steps for personal information, account details, and review/submit. What is the recommended architecture for managing form data so that values are not lost when users navigate forward and backward between steps?

**Purpose:**

To understand how form state should be organized across multiple views.

**Learning Outcome:**

I learned that the form payload should be managed at a parent level or through a form management library so that step components can unmount and remount without losing user-entered data.

---

## Prompt 2: React Hook Form State Management

**Prompt:**

In a multi-step React form, how does react-hook-form preserve input values when a user moves between steps? What is the difference between using react-hook-form for form data and using useState only for navigation state?

**Purpose:**

To clarify which data belongs in form state and which data belongs in UI state.

**Learning Outcome:**

I learned that react-hook-form manages the actual form values, while useState can still be used for UI-only state such as the active step, success screen, or password visibility toggle.

---

## Prompt 3: Step-Level Validation Logic

**Prompt:**

I need to validate only the fields shown in the current step before allowing the user to continue to the next step. How can I use react-hook-form validation methods to validate a specific group of fields instead of validating the entire form at once?

**Purpose:**

To solve the logic issue of blocking navigation only when the current step has invalid fields.

**Learning Outcome:**

I learned that the `trigger()` method can validate selected field names. This allows each step to control its own validation before moving forward.

---

## Prompt 4: Real-Time Validation Behavior

**Prompt:**

How can I configure react-hook-form so validation errors appear while the user is typing instead of waiting until the final submit action? I want email, password length, and confirm password matching errors to update immediately.

**Purpose:**

To implement real-time validation required by the project scope.

**Learning Outcome:**

I learned that setting the form mode to `onChange` allows validation to run as the user updates each input.

---

## Prompt 5: Schema Validation Design

**Prompt:**

For a registration form with first name, last name, date of birth, email, password, and confirm password, how should a zod schema be structured to validate required fields, email format, minimum password length, and password confirmation matching?

**Purpose:**

To understand schema-based validation instead of writing manual validation logic in every component.

**Learning Outcome:**

I learned how zod can define validation rules in one centralized schema and how `.refine()` can be used for cross-field validation such as comparing password and confirm password.

---

## Prompt 6: Conditional Button Disabling

**Prompt:**

In a multi-step form, what is a clean way to disable the Next button until all visible fields in the current step are completed and valid? How can I avoid checking unrelated fields from future steps?

**Purpose:**

To debug the issue where navigation buttons should only depend on the current step’s fields.

**Learning Outcome:**

I learned to check the current step’s field values and errors instead of checking the entire form. This keeps Step 1 independent from Step 2 validation.

---

## Prompt 7: Review Step Data Display

**Prompt:**

What is the best way to display a summary review page in a react-hook-form multi-step form before final submission? How can I safely read the latest form values without duplicating them into another state object?

**Purpose:**

To understand how to render the captured payload on the final review step.

**Learning Outcome:**

I learned that `watch()` can be used to read current form values for display without creating duplicate state.

---

## Prompt 8: Submit Payload and Success State

**Prompt:**

After the user reviews the registration data and clicks Submit, how should the final form payload be handled in React? I need to log the completed data object and then display a success UI state.

**Purpose:**

To clarify final submission behavior and success screen logic.

**Learning Outcome:**

I learned that `handleSubmit()` should wrap the final submit function. Inside that function, the completed payload can be logged and a success state can be enabled.

---

## Prompt 9: Password Visibility Toggle UX

**Prompt:**

What is a simple and accessible way to add a show/hide password toggle in a React form? The toggle should change the input type between password and text without modifying the actual password value.

**Purpose:**

To improve the usability of password and confirm password inputs.

**Learning Outcome:**

I learned that password visibility is UI state only and should be controlled separately from the form payload.

---

## Prompt 10: Progress Indicator Logic

**Prompt:**

How can I build a progress indicator for a three-step registration wizard that updates dynamically as the user moves between steps? What calculation should be used for the progress bar width?

**Purpose:**

To implement the required progress indicator in a simple and maintainable way.

**Learning Outcome:**

I learned that the current step can be divided by the total number of steps to calculate progress percentage.

---

## Prompt 11: Component Organization

**Prompt:**

How should I split a multi-step registration wizard into smaller React components while keeping the form logic centralized? I want the code to remain readable without passing too many props to every step.

**Purpose:**

To improve code organization and readability.

**Learning Outcome:**

I learned that `FormProvider` and `useFormContext()` allow child step components to access form methods without prop drilling.

---

## Prompt 12: UI Polish and Styling Review

**Prompt:**

My registration wizard is functional, but the interface looks too basic. What CSS improvements can make the UI look more polished while keeping the design appropriate for a student React project?

**Purpose:**

To improve the visual quality of the project without changing the core logic.

**Learning Outcome:**

I learned how spacing, card layout, border radius, progress bar styling, button states, and responsive design can improve the user experience.

---

## Prompt 13: Code Readability Review

**Prompt:**

Can you review the structure of my registration wizard and suggest small naming or organization improvements that make the code easier to understand without changing functionality?

**Purpose:**

To make the code more readable and maintainable.

**Learning Outcome:**

I learned that component names should be simple and descriptive, and that form logic should remain centralized in the parent component.

---

## Prompt 14: Validation Debugging

**Prompt:**

In my multi-step form, the Next button sometimes remains disabled even after entering values. What areas should I inspect in react-hook-form and zod validation to identify whether the issue is caused by field names, schema rules, errors, or validation mode?

**Purpose:**

To understand how to debug validation-related issues.

**Learning Outcome:**

I learned to check whether the registered field names match the schema, whether validation mode is set correctly, and whether the current step is checking the correct errors.

---

## Prompt 15: Final Project Review

**Prompt:**

Can you help me verify whether my registration wizard meets these requirements: three-step conditional rendering, persistent form data across navigation, real-time validation, disabled navigation until valid, password visibility toggle, progress indicator, review step, console logged payload, success UI state, react-hook-form integration, and zod schema validation?

**Purpose:**

To compare the final implementation against the project requirements.

**Learning Outcome:**

I learned how to review the project against the sprint scope and confirm that each required feature was implemented.