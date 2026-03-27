export type ProductCategory =
  | "brakes"
  | "engine"
  | "transmission"
  | "suspension"
  | "electrical"
  | "wheels";

export type BikeBrand =
  | "ducati"
  | "honda"
  | "kawasaki"
  | "suzuki"
  | "yamaha";

export type VehicleFitment = {
  make: BikeBrand;
  model: string;
  years: string[];
  engines: string[];
};

export type Product = {
  id: number;
  slug: string;
  title: string;
  category: ProductCategory;
  price: number;
  oldPrice: number | null;
  image: string;
  gallery?: string[];
  rating: number;
  reviews: number;
  badge: string | null;
  shortDescription: string;
  description: string;
  partNumber: string;
  oemNumber: string;
  sku: string;
  brand: string;
  bikeBrand: BikeBrand;
  subCategory?: string; // e.g. "Brake Pads"
  stockStatus: string;
  fitment: string;
  vehicleFitments: VehicleFitment[];
  features: string[];
  specs: { label: string; value: string }[];
};

export type CategoryNode = {
  id: string;
  label: string;
  filter: ProductCategory | "all";
  children?: { id: string; label: string; filter: string }[];
};

export const categoryHierarchy: CategoryNode[] = [
  {
    id: "brakes-root",
    label: "Brakes",
    filter: "brakes",
    children: [
      { id: "brake-pads", label: "Brake Pads", filter: "brakes" },
      { id: "brake-calipers", label: "Brake Calipers", filter: "brakes" },
      { id: "brake-rotors", label: "Brake Rotors", filter: "brakes" },
      { id: "brake-lines", label: "Brake Lines", filter: "brakes" },
    ],
  },
  {
    id: "engine-root",
    label: "Engine",
    filter: "engine",
    children: [
      { id: "exhaust-systems", label: "Exhaust Systems", filter: "engine" },
      { id: "air-filters", label: "Air Filters", filter: "engine" },
      { id: "spark-plugs", label: "Spark Plugs", filter: "engine" },
    ],
  },
  {
    id: "electrical-root",
    label: "Electrical",
    filter: "electrical",
    children: [
      { id: "batteries", label: "Batteries", filter: "electrical" },
      { id: "charging-systems", label: "Charging Systems", filter: "electrical" },
      { id: "lighting", label: "Lighting", filter: "electrical" },
    ],
  },
  {
    id: "suspension-root",
    label: "Suspension",
    filter: "suspension",
    children: [
      { id: "shocks", label: "Shock Absorbers", filter: "suspension" },
      { id: "springs", label: "Fork Springs", filter: "suspension" },
      { id: "grips", label: "Hand Grips", filter: "suspension" },
    ],
  },
  {
    id: "transmission-root",
    label: "Transmission",
    filter: "transmission",
    children: [
      { id: "chains", label: "Drive Chains", filter: "transmission" },
      { id: "sprockets", label: "Sprockets", filter: "transmission" },
    ],
  },
  {
    id: "wheels-root",
    label: "Wheels & Tires",
    filter: "wheels",
    children: [
      { id: "tires", label: "Tires", filter: "wheels" },
      { id: "rims", label: "Rims & Wheels", filter: "wheels" },
    ],
  },
];

function normalizeSearchValue(value: string) {
  return value.toLowerCase().trim();
}

function getProductSearchHaystack(product: Product) {
  return [
    product.title,
    product.brand,
    product.partNumber,
    product.oemNumber,
    product.sku,
    String(product.id),
  ]
    .join(" ")
    .toLowerCase();
}

function vehicleFitment(
  make: BikeBrand,
  model: string,
  years: string[],
  engines: string[],
): VehicleFitment {
  return { make, model, years, engines };
}

export const products: Product[] = [
  {
    id: 1,
    slug: "brembo-sintered-front-brake-pads",
    title: "Brembo Sintered Front Brake Pads",
    category: "brakes",
    price: 45.99,
    oldPrice: 59.99,
    image:
      "https://fitment.ninetheme.com/wp-content/uploads/2023/12/product2-300x300.jpg",
    gallery: [
      "/store/ceramic-brake-pads-main.png",
      "/store/brake-pad-texture-closeup.png",
      "/store/brake-pad-assembly-view.png",
    ],
    rating: 4.9,
    reviews: 342,
    badge: "Top Seller",
    shortDescription: "Track-capable front pads with strong bite and reduced fade.",
    description:
      "Premium sintered brake pads engineered for sport and street riders who need consistent feel, high-temperature stability, and dependable braking confidence.",
    partNumber: "BRM-BRK-2214",
    oemNumber: "06455-MFL-006",
    sku: "9820-A",
    brand: "Brembo",
    bikeBrand: "honda",
    subCategory: "Brake Pads",
    stockStatus: "In Stock - Ready to Ship",
    fitment: "Fits: 2020-2024 Honda CBR1000RR Fireblade",
    vehicleFitments: [
      vehicleFitment("honda", "CBR1000RR", ["2020", "2021", "2022", "2023"], ["999cc Liquid-Cooled"]),
    ],
    features: [
      "Sintered compound for strong initial bite",
      "Excellent heat resistance under repeated braking",
      "Low fade performance for aggressive riding",
    ],
    specs: [
      { label: "Material", value: "Sintered metal" },
      { label: "Position", value: "Front" },
      { label: "Weight", value: "0.42 kg" },
      { label: "Warranty", value: "12 months" },
    ],
  },
  {
    id: 2,
    slug: "galfer-wave-floating-brake-rotor",
    title: "Galfer Wave Floating Brake Rotor",
    category: "brakes",
    price: 285,
    oldPrice: 320,
    image:
      "https://fitment.ninetheme.com/wp-content/uploads/2023/12/product-56-img-2-300x300.png",
    rating: 4.9,
    reviews: 89,
    badge: "New",
    shortDescription: "Floating rotor upgrade for sharper lever feel and cooler braking.",
    description:
      "Precision-cut wave rotor that reduces unsprung weight and improves heat dissipation for demanding street and track riding.",
    partNumber: "GLF-ROT-3110",
    oemNumber: "59210-MKF-D41",
    sku: "GLF-3110",
    brand: "Galfer",
    bikeBrand: "yamaha",
    subCategory: "Brake Rotors",
    stockStatus: "In Stock - Limited Units",
    fitment: "Fits: 2021-2024 Yamaha YZF-R1",
    vehicleFitments: [
      vehicleFitment("yamaha", "YZF-R1", ["2022", "2023", "2024"], ["998cc CP4 Inline-Four"]),
    ],
    features: [
      "Floating design reduces heat transfer",
      "Wave profile improves pad cleaning",
      "Corrosion-resistant stainless finish",
    ],
    specs: [
      { label: "Diameter", value: "320 mm" },
      { label: "Mount", value: "Floating" },
      { label: "Material", value: "High-carbon stainless steel" },
      { label: "Weight", value: "1.25 kg" },
    ],
  },
  {
    id: 3,
    slug: "ebc-double-h-sintered-rear-pads",
    title: "EBC Double-H Sintered Rear Pads",
    category: "brakes",
    price: 36.5,
    oldPrice: 42,
    image:
      "https://fitment.ninetheme.com/wp-content/uploads/2023/12/product2-300x300.jpg",
    rating: 4.7,
    reviews: 164,
    badge: null,
    shortDescription: "Rear braking upgrade with improved wear resistance.",
    description:
      "A durable rear pad set tuned for balanced pedal feel, long life, and stable friction under commuter and touring loads.",
    partNumber: "EBC-RBR-782",
    oemNumber: "43105-MJP-G51",
    sku: "EBC-782",
    brand: "EBC",
    bikeBrand: "kawasaki",
    stockStatus: "In Stock",
    fitment: "Fits: 2019-2024 Kawasaki Ninja ZX-10R",
    vehicleFitments: [
      vehicleFitment("kawasaki", "Ninja ZX-10R", ["2021", "2022", "2023"], ["998cc Inline-Four"]),
    ],
    features: [
      "Long service life compound",
      "Stable friction across varied temperatures",
      "OE-style fit and hardware alignment",
    ],
    specs: [
      { label: "Material", value: "Double-H sintered" },
      { label: "Position", value: "Rear" },
      { label: "Weight", value: "0.31 kg" },
      { label: "Use", value: "Street / sport" },
    ],
  },
  {
    id: 4,
    slug: "akrapovic-slip-on-line-exhaust",
    title: "Akrapovic Slip-On Line Exhaust",
    category: "engine",
    price: 850,
    oldPrice: 950,
    image:
      "https://fitment.ninetheme.com/wp-content/uploads/2023/12/04-061-300x300.jpg",
    rating: 5,
    reviews: 128,
    badge: "Premium",
    shortDescription: "Titanium slip-on system for weight savings and a deeper tone.",
    description:
      "Premium slip-on exhaust system that sharpens throttle response, trims weight, and delivers signature Akrapovic finish quality.",
    partNumber: "AKR-EXH-S17",
    oemNumber: "18110-MEL-000",
    sku: "AKR-S17",
    brand: "Akrapovic",
    bikeBrand: "suzuki",
    subCategory: "Exhaust Systems",
    stockStatus: "In Stock - Ready to Ship",
    fitment: "Fits: 2021-2024 Suzuki GSX-R1000",
    vehicleFitments: [
      vehicleFitment("suzuki", "GSX-R1000", ["2022", "2023", "2024"], ["999.8cc Inline-Four"]),
    ],
    features: [
      "Lightweight titanium outer sleeve",
      "Refined exhaust tone without harsh drone",
      "Direct-fit mounting hardware included",
    ],
    specs: [
      { label: "Construction", value: "Titanium / carbon fiber" },
      { label: "Weight Saving", value: "2.1 kg lighter than OE" },
      { label: "Homologation", value: "Road legal variant available" },
      { label: "Finish", value: "Titanium satin" },
    ],
  },
  {
    id: 5,
    slug: "kn-high-flow-air-filter",
    title: "K&N High-Flow Air Filter",
    category: "engine",
    price: 65,
    oldPrice: 75,
    image:
      "https://fitment.ninetheme.com/wp-content/uploads/2023/12/product-33-img-1-300x300.png",
    rating: 4.7,
    reviews: 560,
    badge: null,
    shortDescription: "Washable performance filter for improved intake flow.",
    description:
      "Reusable cotton gauze air filter designed to improve airflow while maintaining strong filtration for road and sport applications.",
    partNumber: "KN-AIR-YZF09",
    oemNumber: "5VY-14451-00",
    sku: "KN-509",
    brand: "K&N",
    bikeBrand: "yamaha",
    subCategory: "Air Filters",
    stockStatus: "In Stock",
    fitment: "Fits: 2021-2024 Yamaha MT-09",
    vehicleFitments: [
      vehicleFitment("yamaha", "MT-09", ["2021", "2022", "2023"], ["890cc CP3 Inline-Triple"]),
    ],
    features: [
      "Washable and reusable construction",
      "Improved airflow over paper OE filters",
      "Direct replacement fitment",
    ],
    specs: [
      { label: "Filter Media", value: "Oiled cotton gauze" },
      { label: "Service Interval", value: "Up to 50,000 miles" },
      { label: "Washable", value: "Yes" },
      { label: "Weight", value: "0.28 kg" },
    ],
  },
  {
    id: 6,
    slug: "ngk-iridium-spark-plug-set",
    title: "NGK Iridium Spark Plug Set",
    category: "engine",
    price: 54,
    oldPrice: null,
    image:
      "https://fitment.ninetheme.com/wp-content/uploads/2023/12/product-33-img-1-300x300.png",
    rating: 4.8,
    reviews: 233,
    badge: "Recommended",
    shortDescription: "Reliable cold starts and cleaner combustion for high-rev engines.",
    description:
      "Iridium spark plug kit built for modern superbikes, improving ignition consistency and long service life in high-heat engine environments.",
    partNumber: "NGK-IR-CR9EIX",
    oemNumber: "31917-MFL-003",
    sku: "NGK-CR9",
    brand: "NGK",
    bikeBrand: "ducati",
    stockStatus: "In Stock",
    fitment: "Fits: 2018-2024 Ducati Panigale V4",
    vehicleFitments: [
      vehicleFitment(
        "ducati",
        "Panigale V4",
        ["2021", "2022", "2023", "2024"],
        ["Desmosedici Stradale V4", "V4 S", "V4 R"],
      ),
    ],
    features: [
      "Fine-wire iridium center electrode",
      "Improved throttle response and starting",
      "Longer lifespan than standard plugs",
    ],
    specs: [
      { label: "Electrode", value: "Iridium" },
      { label: "Thread Size", value: "10 mm" },
      { label: "Heat Range", value: "9" },
      { label: "Pack Size", value: "Set of 4" },
    ],
  },
  {
    id: 7,
    slug: "did-525-zvmx-super-street-chain",
    title: "DID 525 ZVM-X Super Street Chain",
    category: "transmission",
    price: 155,
    oldPrice: 175,
    image:
      "https://fitment.ninetheme.com/wp-content/uploads/2023/12/product1-300x300.jpeg",
    rating: 4.8,
    reviews: 215,
    badge: "Recommended",
    shortDescription: "High-strength X-ring chain for powerful street bikes.",
    description:
      "A premium sealed drive chain designed for liter-class motorcycles, balancing durability, low friction, and high tensile strength.",
    partNumber: "DID-525ZVMX-120",
    oemNumber: "40530-MEL-013",
    sku: "DID-120L",
    brand: "DID",
    bikeBrand: "honda",
    stockStatus: "In Stock",
    fitment: "Fits: 2020-2024 Honda CBR1000RR-R",
    vehicleFitments: [
      vehicleFitment("honda", "CBR1000RR", ["2020", "2021", "2022", "2023"], ["999cc Liquid-Cooled"]),
    ],
    features: [
      "High tensile strength for superbikes",
      "X-ring sealing for extended service life",
      "Smooth and quiet operation",
    ],
    specs: [
      { label: "Chain Size", value: "525" },
      { label: "Links", value: "120" },
      { label: "Seal Type", value: "X-ring" },
      { label: "Finish", value: "Gold / steel" },
    ],
  },
  {
    id: 8,
    slug: "jt-steel-front-sprocket-15t",
    title: "JT Steel Front Sprocket 15T",
    category: "transmission",
    price: 22.5,
    oldPrice: null,
    image:
      "https://fitment.ninetheme.com/wp-content/uploads/2023/12/product-38-img-1-300x300.png",
    rating: 4.6,
    reviews: 156,
    badge: null,
    shortDescription: "Heat-treated front sprocket with OE-style durability.",
    description:
      "Precision-machined steel countershaft sprocket that restores drivetrain accuracy and handles daily high-load use with ease.",
    partNumber: "JT-FS-565-15",
    oemNumber: "23801-MFL-000",
    sku: "JT-15T",
    brand: "JT Sprockets",
    bikeBrand: "honda",
    stockStatus: "In Stock",
    fitment: "Fits: 2017-2024 Honda CBR650R",
    vehicleFitments: [
      vehicleFitment(
        "honda",
        "CRF1100L Africa Twin",
        ["2021", "2022", "2023"],
        ["1084cc Parallel-Twin"],
      ),
    ],
    features: [
      "CNC-machined chromoly steel",
      "Factory-style spline precision",
      "Ideal for OE replacement or gearing changes",
    ],
    specs: [
      { label: "Teeth", value: "15T" },
      { label: "Material", value: "Heat-treated steel" },
      { label: "Position", value: "Front" },
      { label: "Weight", value: "0.19 kg" },
    ],
  },
  {
    id: 9,
    slug: "renthal-rear-aluminum-sprocket-44t",
    title: "Renthal Rear Aluminum Sprocket 44T",
    category: "transmission",
    price: 74,
    oldPrice: 84,
    image:
      "https://fitment.ninetheme.com/wp-content/uploads/2023/12/product-38-img-1-300x300.png",
    rating: 4.8,
    reviews: 104,
    badge: "Race Tech",
    shortDescription: "Lightweight rear sprocket for faster acceleration response.",
    description:
      "7075-T6 aluminum rear sprocket tuned for riders looking to trim rotating mass without sacrificing machining accuracy.",
    partNumber: "RNT-RS-44T",
    oemNumber: "41201-MKF-D41",
    sku: "RNT-44T",
    brand: "Renthal",
    bikeBrand: "yamaha",
    stockStatus: "In Stock",
    fitment: "Fits: 2021-2024 Yamaha YZF-R1",
    vehicleFitments: [
      vehicleFitment("yamaha", "YZF-R1", ["2022", "2023", "2024"], ["998cc CP4 Inline-Four"]),
    ],
    features: [
      "CNC-cut 7075-T6 aluminum",
      "Hard-anodized for improved wear resistance",
      "Ideal for performance gearing setups",
    ],
    specs: [
      { label: "Teeth", value: "44T" },
      { label: "Material", value: "7075-T6 aluminum" },
      { label: "Color", value: "Hard anodized" },
      { label: "Weight", value: "0.52 kg" },
    ],
  },
  {
    id: 10,
    slug: "ohlins-ttx-gp-rear-shock-absorber",
    title: "Ohlins TTX GP Rear Shock Absorber",
    category: "suspension",
    price: 1200,
    oldPrice: null,
    image:
      "https://fitment.ninetheme.com/wp-content/uploads/2023/12/Nolathane-Sway-Bar-300x300.jpg",
    rating: 5,
    reviews: 42,
    badge: "Race Tech",
    shortDescription: "Premium rear shock for race-level damping control.",
    description:
      "A high-end rear shock with broad tuning range, excellent heat stability, and premium chassis feedback for advanced riders.",
    partNumber: "OHL-TTX-GP36",
    oemNumber: "52400-MKR-D11",
    sku: "OHL-GP36",
    brand: "Ohlins",
    bikeBrand: "honda",
    stockStatus: "In Stock - Special Order",
    fitment: "Fits: 2020-2024 Honda CBR1000RR-R",
    vehicleFitments: [
      vehicleFitment("honda", "CBR1000RR", ["2020", "2021", "2022", "2023"], ["999cc Liquid-Cooled"]),
    ],
    features: [
      "TTX twin-tube damping design",
      "Separate compression and rebound tuning",
      "Improved traction and chassis stability",
    ],
    specs: [
      { label: "Type", value: "Gas pressurized monoshock" },
      { label: "Adjustment", value: "Compression / rebound / preload" },
      { label: "Length", value: "Standard OE fitment" },
      { label: "Use", value: "Track / premium street" },
    ],
  },
  {
    id: 11,
    slug: "progrip-717-sport-gp-grips",
    title: "Progrip 717 Sport GP Grips",
    category: "suspension",
    price: 18,
    oldPrice: 22,
    image:
      "https://fitment.ninetheme.com/wp-content/uploads/2023/12/04-061-300x300.jpg",
    rating: 4.5,
    reviews: 870,
    badge: "Bestseller",
    shortDescription: "Dual-compound grips with improved feel and reduced vibration.",
    description:
      "Sport-oriented handlebar grips made with a dual-density compound for better comfort, grip, and long-ride control.",
    partNumber: "PRG-GRP-717",
    oemNumber: "53165-MEL-000",
    sku: "PRG-717",
    brand: "Progrip",
    bikeBrand: "yamaha",
    stockStatus: "In Stock",
    fitment: "Fits: Universal 22 mm handlebars",
    vehicleFitments: [
      vehicleFitment("yamaha", "MT-09", ["2021", "2022", "2023"], ["890cc CP3 Inline-Triple"]),
      vehicleFitment("ducati", "Monster 821", ["2018", "2019", "2020", "2021"], ["Testastretta 11deg"]),
      vehicleFitment("suzuki", "Hayabusa", ["2021", "2022", "2023"], ["1340cc Inline-Four"]),
    ],
    features: [
      "Dual-compound comfort layer",
      "Textured surface for wet-weather grip",
      "Quick replacement for sport bikes",
    ],
    specs: [
      { label: "Bar Size", value: "22 mm" },
      { label: "Length", value: "122 mm" },
      { label: "Compound", value: "Dual density" },
      { label: "Color", value: "Black / gray" },
    ],
  },
  {
    id: 12,
    slug: "race-tech-fork-spring-kit",
    title: "Race Tech Fork Spring Kit",
    category: "suspension",
    price: 169,
    oldPrice: 189,
    image:
      "https://fitment.ninetheme.com/wp-content/uploads/2023/12/Nolathane-Sway-Bar-300x300.jpg",
    rating: 4.8,
    reviews: 72,
    badge: null,
    shortDescription: "Front-end support upgrade for better braking and corner entry.",
    description:
      "Rate-matched fork spring kit that improves front-end support, chassis balance, and rider confidence under braking.",
    partNumber: "RTC-FSK-095",
    oemNumber: "51401-MFL-003",
    sku: "RTC-095",
    brand: "Race Tech",
    bikeBrand: "kawasaki",
    stockStatus: "In Stock",
    fitment: "Fits: 2019-2024 Kawasaki Z900",
    vehicleFitments: [
      vehicleFitment("kawasaki", "Z900", ["2020", "2021", "2022"], ["948cc Inline-Four"]),
    ],
    features: [
      "Rate-specific tuning for improved chassis balance",
      "Reduces excessive fork dive",
      "Compatible with OE fork hardware",
    ],
    specs: [
      { label: "Spring Rate", value: "0.95 kg/mm" },
      { label: "Position", value: "Front fork" },
      { label: "Material", value: "Chrome silicon steel" },
      { label: "Kit", value: "Pair" },
    ],
  },
  {
    id: 13,
    slug: "yuasa-maintenance-free-battery",
    title: "Yuasa Maintenance-Free Battery",
    category: "electrical",
    price: 124,
    oldPrice: 139,
    image:
      "https://fitment.ninetheme.com/wp-content/uploads/2023/12/product-33-img-1-300x300.png",
    rating: 4.8,
    reviews: 190,
    badge: "Top Seller",
    shortDescription: "Reliable AGM battery for daily starts and consistent cranking.",
    description:
      "A factory-quality AGM battery built for reliable starting performance, vibration resistance, and low maintenance ownership.",
    partNumber: "YUA-YTZ10S",
    oemNumber: "31500-MFL-641",
    sku: "YTZ10S",
    brand: "Yuasa",
    bikeBrand: "yamaha",
    subCategory: "Batteries",
    stockStatus: "In Stock",
    fitment: "Fits: 2018-2024 Yamaha R6 / MT-09 applications",
    vehicleFitments: [
      vehicleFitment("yamaha", "YZF-R1", ["2022", "2023", "2024"], ["998cc CP4 Inline-Four"]),
      vehicleFitment("yamaha", "MT-09", ["2021", "2022", "2023"], ["890cc CP3 Inline-Triple"]),
      vehicleFitment(
        "honda",
        "CRF1100L Africa Twin",
        ["2021", "2022", "2023"],
        ["1084cc Parallel-Twin"],
      ),
    ],
    features: [
      "AGM design resists vibration",
      "Strong cold-start performance",
      "Sealed maintenance-free construction",
    ],
    specs: [
      { label: "Voltage", value: "12V" },
      { label: "Capacity", value: "8.6 Ah" },
      { label: "Battery Type", value: "AGM sealed" },
      { label: "Weight", value: "3.2 kg" },
    ],
  },
  {
    id: 14,
    slug: "mosfet-regulator-rectifier-kit",
    title: "MOSFET Regulator Rectifier Kit",
    category: "electrical",
    price: 138,
    oldPrice: null,
    image:
      "https://fitment.ninetheme.com/wp-content/uploads/2023/12/product-33-img-1-300x300.png",
    rating: 4.7,
    reviews: 84,
    badge: null,
    shortDescription: "Charging-system upgrade for cooler and more stable voltage control.",
    description:
      "MOSFET regulator rectifier kit designed to reduce heat and stabilize charging output for modern high-demand electrical systems.",
    partNumber: "MFR-RR-775",
    oemNumber: "31600-MEL-D21",
    sku: "MOS-775",
    brand: "RoadVolt",
    bikeBrand: "honda",
    stockStatus: "In Stock",
    fitment: "Fits: 2017-2024 Honda, Yamaha, Suzuki sportbike conversions",
    vehicleFitments: [
      vehicleFitment("honda", "CBR1000RR", ["2020", "2021", "2022", "2023"], ["999cc Liquid-Cooled"]),
      vehicleFitment("yamaha", "YZF-R1", ["2022", "2023", "2024"], ["998cc CP4 Inline-Four"]),
      vehicleFitment("suzuki", "GSX-R1000", ["2022", "2023", "2024"], ["999.8cc Inline-Four"]),
    ],
    features: [
      "MOSFET design runs cooler than standard units",
      "Stable output protects charging system components",
      "Wiring harness adapters included",
    ],
    specs: [
      { label: "Type", value: "MOSFET regulator / rectifier" },
      { label: "Output", value: "14.2V regulated" },
      { label: "Cooling", value: "Finned aluminum housing" },
      { label: "Harness", value: "Plug-in conversion kit" },
    ],
  },
  {
    id: 15,
    slug: "led-indicator-relay-conversion-kit",
    title: "LED Indicator Relay Conversion Kit",
    category: "electrical",
    price: 24,
    oldPrice: 29,
    image:
      "https://fitment.ninetheme.com/wp-content/uploads/2023/12/product-33-img-1-300x300.png",
    rating: 4.6,
    reviews: 58,
    badge: null,
    shortDescription: "Fixes fast flash issues when converting to LED turn signals.",
    description:
      "Compact relay kit that stabilizes flash rate and simplifies LED indicator upgrades on modern street bikes.",
    partNumber: "ELC-RLY-2P",
    oemNumber: "38301-MEL-003",
    sku: "LED-2P",
    brand: "MotoVolt",
    bikeBrand: "suzuki",
    stockStatus: "In Stock",
    fitment: "Fits: Universal 2-pin and 3-pin applications",
    vehicleFitments: [
      vehicleFitment("ducati", "Monster 821", ["2018", "2019", "2020", "2021"], ["Testastretta 11deg"]),
      vehicleFitment(
        "honda",
        "CRF1100L Africa Twin",
        ["2021", "2022", "2023"],
        ["1084cc Parallel-Twin"],
      ),
      vehicleFitment("suzuki", "Hayabusa", ["2021", "2022", "2023"], ["1340cc Inline-Four"]),
      vehicleFitment("kawasaki", "Z900", ["2020", "2021", "2022"], ["948cc Inline-Four"]),
    ],
    features: [
      "Stable flash rate for LED indicators",
      "Compact plug-and-play format",
      "Ideal for aftermarket lighting upgrades",
    ],
    specs: [
      { label: "Voltage", value: "12V" },
      { label: "Pins", value: "2 / 3 pin compatible" },
      { label: "Water Resistance", value: "Sealed housing" },
      { label: "Weight", value: "0.08 kg" },
    ],
  },
  {
    id: 16,
    slug: "pirelli-diablo-rosso-iv-front-tire",
    title: "Pirelli Diablo Rosso IV Front Tire",
    category: "wheels",
    price: 214,
    oldPrice: 239,
    image:
      "https://fitment.ninetheme.com/wp-content/uploads/2023/12/04-061-300x300.jpg",
    rating: 4.9,
    reviews: 203,
    badge: "Bestseller",
    shortDescription: "Hypersport front tire with confident turn-in and grip.",
    description:
      "Premium hypersport front tire built for fast steering response, strong wet performance, and high lean-angle confidence.",
    partNumber: "PIR-12070ZR17",
    oemNumber: "44711-MFL-644",
    sku: "PRS4-F120",
    brand: "Pirelli",
    bikeBrand: "honda",
    stockStatus: "In Stock",
    fitment: "Fits: 17-inch supersport front wheel applications",
    vehicleFitments: [
      vehicleFitment("honda", "CBR1000RR", ["2020", "2021", "2022", "2023"], ["999cc Liquid-Cooled"]),
      vehicleFitment("kawasaki", "Ninja ZX-10R", ["2021", "2022", "2023"], ["998cc Inline-Four"]),
      vehicleFitment("yamaha", "YZF-R1", ["2022", "2023", "2024"], ["998cc CP4 Inline-Four"]),
      vehicleFitment("suzuki", "GSX-R1000", ["2022", "2023", "2024"], ["999.8cc Inline-Four"]),
      vehicleFitment(
        "ducati",
        "Panigale V4",
        ["2021", "2022", "2023", "2024"],
        ["Desmosedici Stradale V4", "V4 S", "V4 R"],
      ),
    ],
    features: [
      "Fast warm-up performance",
      "Stable front-end feedback at lean",
      "Strong wet-weather compound blend",
    ],
    specs: [
      { label: "Size", value: "120/70 ZR17" },
      { label: "Position", value: "Front" },
      { label: "Type", value: "Tubeless radial" },
      { label: "Speed Rating", value: "W" },
    ],
  },
  {
    id: 17,
    slug: "michelin-power-5-rear-tire",
    title: "Michelin Power 5 Rear Tire",
    category: "wheels",
    price: 248,
    oldPrice: 269,
    image:
      "https://fitment.ninetheme.com/wp-content/uploads/2023/12/04-061-300x300.jpg",
    rating: 4.8,
    reviews: 176,
    badge: null,
    shortDescription: "Rear sport tire with strong edge grip and road stability.",
    description:
      "Sport-focused rear tire optimized for spirited road riding with excellent shoulder grip and wet-road confidence.",
    partNumber: "MIC-19055ZR17",
    oemNumber: "42711-MFL-643",
    sku: "MIC-P5R",
    brand: "Michelin",
    bikeBrand: "yamaha",
    stockStatus: "In Stock",
    fitment: "Fits: 17-inch supersport rear wheel applications",
    vehicleFitments: [
      vehicleFitment("honda", "CBR1000RR", ["2020", "2021", "2022", "2023"], ["999cc Liquid-Cooled"]),
      vehicleFitment("kawasaki", "Ninja ZX-10R", ["2021", "2022", "2023"], ["998cc Inline-Four"]),
      vehicleFitment("yamaha", "YZF-R1", ["2022", "2023", "2024"], ["998cc CP4 Inline-Four"]),
      vehicleFitment("suzuki", "GSX-R1000", ["2022", "2023", "2024"], ["999.8cc Inline-Four"]),
      vehicleFitment("suzuki", "Hayabusa", ["2021", "2022", "2023"], ["1340cc Inline-Four"]),
    ],
    features: [
      "Excellent dry and wet road grip",
      "Progressive carcass response",
      "Strong mileage for a sport tire",
    ],
    specs: [
      { label: "Size", value: "190/55 ZR17" },
      { label: "Position", value: "Rear" },
      { label: "Type", value: "Tubeless radial" },
      { label: "Speed Rating", value: "W" },
    ],
  },
  {
    id: 18,
    slug: "forged-alloy-front-wheel-17-inch",
    title: "Forged Alloy Front Wheel 17-Inch",
    category: "wheels",
    price: 689,
    oldPrice: 749,
    image: "/store/motorbike-rim-category.png",
    rating: 4.9,
    reviews: 37,
    badge: "Premium",
    shortDescription: "Forged front wheel for lower unsprung mass and sharper handling.",
    description:
      "A performance front wheel that trims weight, improves steering feel, and adds a premium motorsport-inspired finish to your build.",
    partNumber: "ALY-FW-17X35",
    oemNumber: "44650-MKR-D10",
    sku: "ALY-1735",
    brand: "Velocity Forge",
    bikeBrand: "ducati",
    stockStatus: "In Stock - Low Stock",
    fitment: "Fits: Select 17-inch supersport front-end conversions",
    vehicleFitments: [
      vehicleFitment(
        "ducati",
        "Panigale V4",
        ["2021", "2022", "2023", "2024"],
        ["Desmosedici Stradale V4", "V4 S", "V4 R"],
      ),
    ],
    features: [
      "Forged construction for improved strength-to-weight",
      "Sharper steering response",
      "Premium finish ready for custom builds",
    ],
    specs: [
      { label: "Wheel Size", value: "17 x 3.50" },
      { label: "Construction", value: "Forged alloy" },
      { label: "Color", value: "Satin black" },
      { label: "Weight", value: "3.7 kg" },
    ],
  },
];

export function getProductSearchSuggestions(query: string, limit = 6) {
  const normalizedQuery = normalizeSearchValue(query);

  if (!normalizedQuery) {
    return [];
  }

  return products
    .filter((product) => getProductSearchHaystack(product).includes(normalizedQuery))
    .slice(0, limit);
}

export const categories = [
  {
    title: "Brake Components",
    copy: "Pads, rotors and brake upgrades",
    cta: "See Brake Parts",
    filter: "brakes",
    image: "/store/brake-disc-category.png",
  },
  {
    title: "Engine Performance",
    copy: "Exhausts, filters and ignition parts",
    cta: "Browse Engine Parts",
    filter: "engine",
    image: "/store/motorbike-exhaust-category.png",
  },
  {
    title: "Drive & Transmission",
    copy: "Chains, sprockets and drivetrain kits",
    cta: "View Transmission Parts",
    filter: "transmission",
    image: "/store/spare-parts-category.png",
  },
  {
    title: "Suspension Setup",
    copy: "Shocks, springs and control parts",
    cta: "Explore Suspension",
    filter: "suspension",
    image: "/store/motorbike-tire-category.png",
  },
  {
    title: "Wheels & Tires",
    copy: "Rims, tires and rotating hardware",
    cta: "Shop Wheel Parts",
    filter: "wheels",
    image: "/store/motorbike-rim-category.png",
  },
];

export function getCategoryMeta(category: ProductCategory) {
  return categories.find((item) => item.filter === category);
}

export const brands = [
  "Ducati",
  "Honda",
  "Kawasaki",
  "Suzuki",
  "Yamaha",
  "BMW Motorrad",
  "Triumph",
  "KTM",
  "Aprilia",
  "Harley-Davidson",
];

export const bikeBrands: { slug: BikeBrand; label: string }[] = [
  { slug: "ducati", label: "Ducati" },
  { slug: "honda", label: "Honda" },
  { slug: "kawasaki", label: "Kawasaki" },
  { slug: "suzuki", label: "Suzuki" },
  { slug: "yamaha", label: "Yamaha" },
];

export const vehicleData = {
  ducati: {
    label: "Ducati",
    models: {
      "Panigale V4": {
        years: ["2021", "2022", "2023", "2024"],
        engines: ["Desmosedici Stradale V4", "V4 S", "V4 R"],
      },
      "Monster 821": {
        years: ["2018", "2019", "2020", "2021"],
        engines: ["Testastretta 11deg"],
      },
    },
  },
  honda: {
    label: "Honda",
    models: {
      CBR1000RR: {
        years: ["2020", "2021", "2022", "2023"],
        engines: ["999cc Liquid-Cooled"],
      },
      "CRF1100L Africa Twin": {
        years: ["2021", "2022", "2023"],
        engines: ["1084cc Parallel-Twin"],
      },
    },
  },
  kawasaki: {
    label: "Kawasaki",
    models: {
      "Ninja ZX-10R": {
        years: ["2021", "2022", "2023"],
        engines: ["998cc Inline-Four"],
      },
      Z900: {
        years: ["2020", "2021", "2022"],
        engines: ["948cc Inline-Four"],
      },
    },
  },
  suzuki: {
    label: "Suzuki",
    models: {
      "GSX-R1000": {
        years: ["2022", "2023", "2024"],
        engines: ["999.8cc Inline-Four"],
      },
      Hayabusa: {
        years: ["2021", "2022", "2023"],
        engines: ["1340cc Inline-Four"],
      },
    },
  },
  yamaha: {
    label: "Yamaha",
    models: {
      "YZF-R1": {
        years: ["2022", "2023", "2024"],
        engines: ["998cc CP4 Inline-Four"],
      },
      "MT-09": {
        years: ["2021", "2022", "2023"],
        engines: ["890cc CP3 Inline-Triple"],
      },
    },
  },
} as const;

export type VehicleFinderSelection = {
  make?: string;
  model?: string;
  year?: string;
  engine?: string;
};

export function getProductById(id: number) {
  return products.find((product) => product.id === id);
}

export function getProductsByCategory(category: ProductCategory) {
  return products.filter((product) => product.category === category);
}

export function getBikeBrandMeta(brand: BikeBrand) {
  return bikeBrands.find((item) => item.slug === brand);
}

export function getProductsByBikeBrand(brand: BikeBrand) {
  return products.filter((product) => product.bikeBrand === brand);
}

export function getProductsByVehicleSelection(selection: VehicleFinderSelection) {
  const make = selection.make?.trim();
  const model = selection.model?.trim();
  const year = selection.year?.trim();
  const engine = selection.engine?.trim();

  return products.filter((product) =>
    product.vehicleFitments.some((fitment) => {
      if (make && fitment.make !== make) return false;
      if (model && fitment.model !== model) return false;
      if (year && !fitment.years.includes(year)) return false;
      if (engine && !fitment.engines.includes(engine)) return false;
      return true;
    }),
  );
}
