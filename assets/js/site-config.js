/* ============================================================================
   SITE CONFIG — the one place contact details & the form endpoint live.

   Every value here is also hard-coded as fallback content directly in each
   page's HTML (search for data-site="..." attributes), so nothing breaks
   if JavaScript is disabled or fails to load. This file just overwrites
   those fallbacks with the same real values in one place, so you only
   ever have to update a phone number or email address once.

   PLACEHOLDER VALUES — replace before launch. See README.md, section
   "Before you launch", for the full checklist.
   ============================================================================ */

window.SITE_CONFIG = {
  businessName: "Coastline Sound Supply",

  // --- Contact -------------------------------------------------------------
  email: "hello@coastlinesoundsupply.com",
  phone: "+12505550142",                 // PLACEHOLDER — E.164 format, used for tel: links
  phoneDisplay: "(250) 555-0142",        // PLACEHOLDER — human-readable, shown on the page
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
  // PLACEHOLDER — paste your form endpoint URL here (Formspree, Web3Forms,
  // Basin, etc). Leave blank ("") to show the mailto: fallback instead of a
  // broken submit button. See README.md, "Wiring up the enquiry form".
  formEndpoint: ""
};
