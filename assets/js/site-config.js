/* ============================================================================
   SITE CONFIG — the one place contact details & the form endpoint live.

   Every value here is also hard-coded as fallback content directly in each
   page's HTML (search for data-site="..." attributes), so nothing breaks
   if JavaScript is disabled or fails to load. This file just overwrites
   those fallbacks with the same real values in one place, so you only
   ever have to update the email address once.

   PLACEHOLDER VALUES — replace before launch. See README.md, section
   "Before you launch", for the full checklist.
   ============================================================================ */

window.SITE_CONFIG = {
  businessName: "Coastline Sound Supply",

  // --- Contact -------------------------------------------------------------
  // No phone number is published on the site by choice.
  email: "hello@coastlinesoundsupply.com",
  instagramHandle: "@coastlinesoundsupply", // PLACEHOLDER
  instagramUrl: "https://instagram.com/coastlinesoundsupply", // PLACEHOLDER

  responseTime: "within 1 business day",

  // --- Partners / regions ---------------------------------------------------
  regionVancouverIsland: {
    name: "Vancouver Island",
    contact: "Grady",
    base: "Nanaimo, BC"
  },
  regionLowerMainland: {
    name: "Lower Mainland & Sea-to-Sky",
    contact: "Dave",
    base: "Vancouver, BC"
  },

  // --- Lead form --------------------------------------------------------------
  // Wired up to Web3Forms — the access key itself lives as a hidden field
  // directly in contact.html's form (Web3Forms keys are public/client-side
  // by design). Leave this blank ("") to show the mailto: fallback instead
  // of a broken submit button. See README.md, "Wiring up the enquiry form".
  formEndpoint: "https://api.web3forms.com/submit"
};
