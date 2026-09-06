/**
 * House of Madhu Das Gupta — Designers Directory
 * Flat list (no Wedding/Pret/Sale grouping). Aza-style index, MDG black/gold look.
 * Only Sakshi Bindra has an image field (portrait for showroom hero / list photo).
 */
window.MDG_DESIGNERS = [
  {
    id: "seema-gujral",
    slug: "seema-gujral",
    name: "Seema Gujral",
    bio: "Celebrated for opulent bridal lehengas and intricate surface ornamentation — heritage craftsmanship with a modern silhouette.",
    productIds: ["bridal-royal-crimson", "sg-rose-gold-lehenga", "sg-emerald-bridal"]
  },
  {
    id: "ridhi-mehra",
    slug: "ridhi-mehra",
    name: "Ridhi Mehra",
    bio: "Contemporary Indian wear with romantic florals and refined festive silhouettes — effortless elegance for modern celebrations.",
    productIds: ["bridal-maroon-heritage", "rm-anarkali-bloom", "rm-festive-sharara"]
  },
  {
    id: "mukti-and-kavith-casa",
    slug: "mukti-and-kavith-casa",
    name: "Mukti and Kavith Casa",
    bio: "Architectural drapes and sculpted couture — a house known for bold form, luxurious textiles, and red-carpet presence.",
    productIds: ["mkc-sculpted-saree", "mkc-ivory-cape", "mkc-noir-gown"]
  },
  {
    id: "kalista",
    slug: "kalista",
    name: "Kalista",
    bio: "Statement evening and occasion wear with crystal drama and clean modern lines — designed to turn heads.",
    productIds: ["evening-velvet-noir", "kalista-crystal-slip", "kalista-midnight-cape"]
  },
  {
    id: "gopi-vaid",
    slug: "gopi-vaid",
    name: "Gopi Vaid",
    bio: "Luxe Indian fusion with hand embroidery and fluid drapes — elevated occasion wear for the discerning wardrobe.",
    productIds: ["couture-black-statement", "evening-emerald-drape", "gv-pearl-jacket"]
  },
  {
    id: "punit-arora",
    slug: "punit-arora",
    name: "Punit Arora",
    bio: "Refined menswear and ceremonial sherwanis — royal cuts, premium fabrics, and impeccable finishing for the modern groom.",
    productIds: ["sherwani-ivory-royal", "sherwani-midnight-nawab", "sherwani-gold-bandhgala", "pa-indigo-bandhgala"]
  },
  {
    id: "dolly-j",
    slug: "dolly-j",
    name: "Dolly J",
    bio: "Playful luxury and resort-ready silhouettes — soft colour stories, fluid fabrics, and wearable glamour.",
    productIds: ["evening-champagne-flare", "resort-ivory-flow", "dj-coral-kaftan"]
  },
  {
    id: "nitika-gujral",
    slug: "nitika-gujral",
    name: "Nitika Gujral",
    bio: "Delicate bridal and festive ensembles with pearl work and soft ivory tones — quiet luxury for the modern bride.",
    productIds: ["bridal-ivory-pearl", "ng-blush-lehenga", "ng-silver-sharara"]
  },
  {
    id: "riyaz-gangji-libas",
    slug: "riyaz-gangji-libas",
    name: "Riyaz Gangji Libas",
    bio: "A celebrated name in Indian couture, known for impeccable craftsmanship, luxurious fabrics, and timeless silhouettes that blend heritage with contemporary elegance.",
    productIds: ["couture-cocktail-glam", "couture-gold-drape", "rgl-zardozi-lehenga", "rgl-velvet-sherwani"]
  },
  {
    id: "sakshi-bindra",
    slug: "sakshi-bindra",
    name: "Sakshi Bindra",
    bio: "An elite multi-occasion house for the modern woman — from heritage bridal lehengas and elevated daywear to resort garden looks, cocktail glamour, and formal evening drapes. Sakshi Bindra designs with quiet power: refined silhouettes, luxurious fabrics, and hand-finished detail that move effortlessly from wedding mandap to destination soirée.",
    image: "sakshi-bindra.jpg",
    productIds: [
      "sb-ivory-aura-bridal",
      "sb-blush-heritage-bridal",
      "sb-crimson-veil-lehenga",
      "sb-rose-mandap-lehenga",
      "sb-marigold-royal-set",
      "sb-pearl-cascade-lehenga",
      "sb-velvet-pheras-gown",
      "sb-champagne-vows-lehenga",
      "sb-heirloom-scarlet",
      "sb-midnight-muse-cocktail",
      "sb-champagne-hour-slip",
      "sb-ruby-soiree-gown",
      "sb-onyx-party-column",
      "sb-blush-disco-mini",
      "sb-emerald-afterparty",
      "sb-silver-spark-gown",
      "sb-noir-cape-cocktail",
      "sb-noir-riviera-gown",
      "sb-gold-hour-saree",
      "sb-sapphire-opera-gown",
      "sb-ivory-moon-gown",
      "sb-bronze-drape-saree",
      "sb-velvet-gala-cape",
      "sb-smoke-column-gown",
      "sb-aurora-beaded-gown",
      "sb-soft-power-linen",
      "sb-city-muse-kurta",
      "sb-ivory-day-kaftan",
      "sb-sage-lounge-set",
      "sb-sand-shirt-dress",
      "sb-navy-utility-set",
      "sb-garden-party-kaftan",
      "sb-sunlit-resort-set",
      "sb-meadow-picnic-dress",
      "sb-coastal-breeze-set"
    ]
  }
];

window.MDG_getDesigner = function (idOrSlug) {
  if (!idOrSlug) return null;
  var key = String(idOrSlug).toLowerCase();
  // Back-compat: old "sakshi" slug/id → sakshi-bindra
  if (key === "sakshi") key = "sakshi-bindra";
  return (window.MDG_DESIGNERS || []).find(function (d) {
    return d.id.toLowerCase() === key || d.slug.toLowerCase() === key;
  }) || null;
};

window.MDG_getProductsByDesigner = function (idOrSlug) {
  var designer = MDG_getDesigner(idOrSlug);
  if (!designer) return [];
  var ids = designer.productIds || [];
  return ids
    .map(function (pid) {
      return window.MDG_getProduct ? MDG_getProduct(pid) : null;
    })
    .filter(Boolean);
};
