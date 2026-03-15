# Changelog
<!--
  Purpose:
  - Track project change history over time.
  - Record date, summary, and key files touched for each change set.
  - Keep entries append-only (do not delete past entries).
-->
- 2024-05-13: Rebranded landing and sections to Mailvibe, launched first real working feature for campaign creation and sending.
  - Added `/dashboard/campaigns` for authenticated campaign creation/sending.
  - All campaign data is persisted (new campaigns table/migration).
  - Mailing uses real SendGrid integration.
  - Owner info (Chirag Dodiya, hi@chirag.co) shown in all contact surfaces.
  - Updated sidebar and landing meta/sections for production Mailvibe launch.
  - Key files: lib/db/schema.ts, drizzle/0001_add_campaigns_table.sql, drizzle/meta/_journal.json, app/dashboard/campaigns/actions.tsx, app/dashboard/campaigns/page.tsx, components/dashboard/campaigns-list.tsx, components/dashboard/campaign-form.tsx, components/dashboard/sidebar-nav.tsx, app/page.tsx, components/home/LayoutHeroSection.tsx, components/home/LayoutBenefitsSection.tsx, components/home/LayoutFeatureGridSection.tsx, components/home/LayoutPricingSection.tsx, components/home/LayoutContactSection.tsx, components/home/LayoutFaqSection.tsx