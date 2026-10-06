/*
 * ============================================================
 *  EVENT CONFIG: edit everything here, no HTML changes needed.
 *  Items marked TODO are placeholders to confirm for this year.
 * ============================================================
 */
window.EVENT = {
  year: "2026",
  // ISO date/time used for the countdown (venue local time).
  startISO: "2026-12-18T18:00:00", // TODO: confirm date & start time
  dateLong: "Friday, December 18, 2026", // TODO
  timeRange: "Time TBA", // TODO
  venueName: "CORBETT'S",
  venueAddress: "340 N. 6th Avenue, Tucson, AZ 85705",
  venueBlurb: "Local cuisine, a beer garden and pickleball courts inside the Historic Corbett Building in downtown Tucson. Free parking for guests.",
  venueUrl: "https://corbettstucson.com/",
  venueMapUrl: "https://www.google.com/maps/search/?api=1&query=CORBETT%27S+340+N+6th+Ave+Tucson+AZ+85705",
  signageEventName: "Allied Elite Financial Holiday Party",
  contactEmail: "events@alliedelitefinancial.com", // TODO: confirm inbox for the contact form

  /*
   * Sponsorship tiers (carried over from last year's packages).
   * available: number of spots left (0 shows "Sold Out" and disables the button).
   * creditCardLink: this year's Stripe payment link for "Pay by Credit Card".
   *   Leave blank ("") and that button falls back to the contact form.
   * "Pay by Bond Account" always goes to the contact form with Bond Account selected.
   */
  tiers: [
    {
      name: "Double Diamond",
      nickname: "The Country Club",
      price: "$10,000",
      available: 1, // TODO: confirm count
      color: "navy",
      featured: true,
      perks: [
        "Featured as Sponsor for the event",
        "AEF Sportscoat / QuarterZip / Polo",
        "Private Invitation to The Event",
        "Top-tier event signage"
      ],
      creditCardLink: "https://buy.stripe.com/aFacN64WcfJU9n83ln1RC0c"
    },
    {
      name: "Diamond",
      nickname: "The Yacht Club",
      price: "$5,000",
      available: 1, // TODO
      color: "blue",
      perks: [
        "AEF Sportscoat / QuarterZip / Polo",
        "Private Invitation to Event",
        "Diamond-tier event signage"
      ],
      creditCardLink: "https://buy.stripe.com/aEU8zfbTl1HF5R64gg"
    },
    {
      name: "Platinum",
      nickname: "Popped Collar",
      price: "$3,500",
      available: 5, // TODO
      color: "cyan",
      perks: [
        "AEF Sportscoat / QuarterZip",
        "Platinum-tier event signage"
      ],
      creditCardLink: "https://buy.stripe.com/14AbJ20FWdBM56S1df1RC09"
    },
    {
      name: "Gold",
      nickname: "Argyle",
      price: "$2,500",
      available: 10, // TODO
      color: "aqua",
      perks: [
        "AEF QuarterZip / Polo",
        "Gold-tier event signage"
      ],
      creditCardLink: "https://buy.stripe.com/3cIbJ22O4apA0QC09b1RC08"
    },
    {
      name: "Silver",
      nickname: "Boat Shoes",
      price: "$1,000",
      available: 18, // TODO
      color: "mint",
      perks: [
        "AEF Polo",
        "Silver-tier event signage"
      ],
      creditCardLink: "https://buy.stripe.com/5kA7vb2iLfyv6VaeUX"
    }
  ]
};
