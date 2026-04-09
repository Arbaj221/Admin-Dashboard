# Architecture Decision Records (ADR)

> This file documents all the important technical and design decisions made during the development of the Admin Dashboard.
> **Rule:** Whenever a new decision is made, add it here with the date and reason.

---

## ADR-001 — Use Vite as the Build Tool

- **Date:** April 2026
- **Status:** ✅ Decided
- **Decision:** Use Vite instead of Create React App (CRA)
- **Why:**
  - Significantly faster dev server startup and Hot Module Replacement (HMR)
  - Better performance for modern React + TypeScript projects
  - CRA is no longer actively maintained
  - Vite is now the industry standard for React projects
- **Alternatives Considered:** Create React App (CRA)

---

## ADR-002 — Use TypeScript over JavaScript

- **Date:** April 2026
- **Status:** ✅ Decided
- **Decision:** Use TypeScript (.tsx) throughout the project
- **Why:**
  - Catches bugs at compile time before they reach production
  - Better code readability and self-documentation through types
  - Improved developer experience with autocomplete and IntelliSense
  - Essential for a growing SaaS application with many components
- **Alternatives Considered:** Plain JavaScript

---

## ADR-003 — Use TailwindCSS for Styling

- **Date:** April 2026
- **Status:** ✅ Decided
- **Decision:** Use Tailwind CSS as the primary styling solution
- **Why:**
  - Utility-first approach speeds up UI development
  - No need to write and maintain separate CSS files
  - Consistent design system out of the box
  - Works perfectly with the chosen template (TailwindAdmin)
- **Alternatives Considered:** Plain CSS, CSS Modules, Styled Components

---

## ADR-004 — Use Radix UI for Components

- **Date:** April 2026
- **Status:** ✅ Decided
- **Decision:** Use Radix UI as the base component library
- **Why:**
  - Fully accessible (WAI-ARIA compliant) components out of the box
  - Unstyled by default — works perfectly with Tailwind CSS
  - Handles complex UI behavior (modals, dropdowns, tooltips) reliably
  - Used internally by the TailwindAdmin template
- **Alternatives Considered:** Headless UI, MUI, Ant Design

---

## ADR-005 — Use ApexCharts for Data Visualization

- **Date:** April 2026
- **Status:** ✅ Decided
- **Decision:** Use ApexCharts for all charts and graphs in the dashboard
- **Why:**
  - Rich variety of chart types (bar, line, area, pie, donut, etc.)
  - Good React integration via `react-apexcharts`
  - Interactive and responsive out of the box
  - Already included in the TailwindAdmin template
- **Alternatives Considered:** Recharts, Chart.js, Victory

---

## ADR-006 — Use TailwindAdmin Free Template as the Base

- **Date:** April 2026
- **Status:** ✅ Decided
- **Decision:** Start from the [TailwindAdmin](https://tailwind-admin.com/) free template instead of building from scratch
- **Why:**
  - Saved significant development time on layout, sidebar, and base components
  - Modern, clean design that matches the project's visual goals
  - Free version provides enough components for the current scope
  - Built with the same tech stack (React, TypeScript, Tailwind CSS)
  - Well documented and maintained by WrapPixel team
- **Limitations of Free Version:**
  - Limited to 1 dashboard layout
  - 10+ UI elements (vs 100+ in Pro)
  - 3 page templates (vs 45+ in Pro)
  - Community support only
- **Upgrade Path:** Can upgrade to Pro version if more templates/components are needed in the future
- **Template Source:** https://tailwind-admin.com/

---

## ADR-007 — Target Users: Internal Team / Employees

- **Date:** April 2026
- **Status:** ✅ Decided
- **Decision:** The dashboard is designed for internal team use, not public-facing customers
- **Why it matters:**
  - Influences UX decisions (can be more data-dense, less hand-holding)
  - Authentication and access control will be internal-facing
  - No need for public SEO optimization
  - Performance expectations are based on company network/devices

---

## ADR-008 — Backend / API Decision (Pending)

- **Date:** April 2026
- **Status:** ⏳ Not Decided Yet
- **Decision:** Backend and API integration strategy is to be decided later
- **Why deferred:**
  - Currently in the frontend/template setup phase
  - Backend requirements depend on features to be built
- **Options being considered:** REST API, GraphQL, Supabase, Firebase
- **Action:** Revisit this decision once core UI components are built

---

## How to Add a New Decision

When you make a new architectural or technical decision, copy this template and fill it in:

```md
## ADR-00X — Short Title

- **Date:** Month Year
- **Status:** ✅ Decided / ⏳ Pending / ❌ Rejected
- **Decision:** What did you decide?
- **Why:** Reasons for this decision
- **Alternatives Considered:** What else did you think about?
```