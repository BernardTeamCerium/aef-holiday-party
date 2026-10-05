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
  // Last year: The Leo Kent Hotel, 1 S. Church Ave, Tucson, AZ 85701
  venueName: "Venue TBA", // TODO
  venueAddress: "Address TBA", // TODO
  venueBlurb: "", // optional short description of the venue
  signageEventName: "Allied Elite Financial Holiday Party",
  contactEmail: "events@alliedelitefinancial.com", // TODO: confirm inbox for the contact form

  /*
   * Sponsorship tiers (carried over from last year's packages).
   * available: number of spots left (0 shows "Sold Out" and disables the button).
   * creditCardLink / bondAccountLink: this year's Stripe payment links.
   *   Leave blank ("") and that button falls back to the contact form.
   */
  tiers: [
    {
      name: "Double Diamond",
      nickname: "The Max",
      price: "$7,500",
      available: 1, // TODO: confirm count
      color: "pink",
      featured: true,
      perks: [
        "Featured as Sponsor for the event",
        "AEF Sportscoat / QuarterZip / Polo",
        "Private Invitation to The Event",
        "Top-tier event signage"
      ],
      creditCardLink: "", // TODO
      bondAccountLink: "" // TODO
    },
    {
      name: "Diamond",
      nickname: "Bayside Tigers",
      price: "$5,000",
      available: 1, // TODO
      color: "teal",
      perks: [
        "AEF Sportscoat / QuarterZip / Polo",
        "Private Invitation to Event",
        "Diamond-tier event signage"
      ],
      creditCardLink: "",
      bondAccountLink: ""
    },
    {
      name: "Platinum",
      nickname: "Zack Attack",
      price: "$3,500",
      available: 5, // TODO
      color: "yellow",
      perks: [
        "AEF Sportscoat / QuarterZip",
        "Platinum-tier event signage"
      ],
      creditCardLink: "",
      bondAccountLink: ""
    },
    {
      name: "Gold",
      nickname: "The Hot Sundaes",
      price: "$2,500",
      available: 10, // TODO
      color: "purple",
      perks: [
        "AEF QuarterZip / Polo",
        "Gold-tier event signage"
      ],
      creditCardLink: "",
      bondAccountLink: ""
    },
    {
      name: "Silver",
      nickname: "Hall Pass",
      price: "$1,000",
      available: 18, // TODO
      color: "blue",
      perks: [
        "AEF Polo",
        "Silver-tier event signage"
      ],
      creditCardLink: "",
      bondAccountLink: ""
    }
  ]
};
