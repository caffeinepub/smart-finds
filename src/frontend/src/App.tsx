import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Backpack,
  BookOpen,
  Box,
  CheckCircle,
  ChevronRight,
  Cpu,
  ExternalLink,
  Flame,
  Gift,
  Heart,
  Menu,
  Music,
  Search,
  Share2,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

type Category =
  | "all"
  | "productivity"
  | "student"
  | "tech"
  | "fun"
  | "survival"
  | "electrical"
  | "audio"
  | "bags"
  | "stationery"
  | "storage"
  | "fashion";

type SortOption = "best-rated" | "most-reviewed" | "price-low" | "price-high";

interface Product {
  id: number;
  name: string;
  category: Exclude<Category, "all">;
  benefit: string;
  description: string[];
  price: string;
  tag: "Viral" | "Best Seller" | "Student Favorite" | "New" | "Trending";
  image: string;
  amazonUrl: string;
  rating: number;
  reviewCount: number;
  keywords: string[];
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Cello Puro Steel-X Benz 900ml",
    category: "student",
    benefit: "Stay hydrated all day with this leak-proof inner steel bottle",
    price: "₹379",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/31kl7TaCmOL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4sHImlK?tag=curifyystore-21",
    rating: 3.9,
    reviewCount: 21986,
    keywords: [
      "bottle",
      "water bottle",
      "steel bottle",
      "flask",
      "drinkware",
      "cello",
      "insulated",
      "leak proof",
      "900ml",
    ],
    description: [
      "ISI certified and BPA-free — safe for daily use with no chemical leaching.",
      "Leak-proof wide mouth lid sealed with a silicone ring stays dry in your bag.",
      "Inner stainless steel keeps cold drinks cold for hours — ideal for daily use.",
      "900ml capacity carries enough water for a full college or gym session.",
      "Durable, lightweight, and easy to clean — a practical everyday essential.",
    ],
  },
  {
    id: 2,
    name: "Perch Zenith 1L Vacuum Flask",
    category: "student",
    benefit:
      "Premium hot & cold bottle that keeps drinks at the right temp all day",
    price: "₹999",
    tag: "Trending",
    image: "https://m.media-amazon.com/images/I/41jth2SU5LL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/3O0CWTJ?tag=curifyystore-21",
    rating: 4.3,
    reviewCount: 805,
    keywords: [
      "bottle",
      "flask",
      "vacuum flask",
      "water bottle",
      "drinkware",
      "1 liter",
      "insulated",
      "thermos",
    ],
    description: [
      "ISI certified with triple-layer vacuum insulation for superior temperature control.",
      "Precision-engineered airtight lid is 100% leakproof — safe in bags and backpacks.",
      "Anti-skid base prevents slips on desks; integrated carry strap for easy transport.",
      "BPA-free, food-safe 304 stainless steel — no metallic taste, eco-friendly too.",
      "Elegant amber brown design looks great at college, gym, or as a gift.",
    ],
  },
  {
    id: 3,
    name: "Pexpo Amaze 940ml Thermos",
    category: "student",
    benefit: "Stylish ombre hot & cold flask with a flip-top lock cap",
    price: "₹935",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/31QgtWvnjlL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4dq3JDn?tag=curifyystore-21",
    rating: 3.9,
    reviewCount: 1322,
    keywords: [
      "thermos",
      "flask",
      "bottle",
      "water bottle",
      "insulated bottle",
      "drinkware",
      "pexpo",
      "940ml",
    ],
    description: [
      "3-layer double-wall insulation keeps drinks hot or cold for hours with no condensation.",
      "Vibrant pink-green ombre design looks bold and modern — a head-turner at college.",
      "Flip-top lock cap gives one-handed access with a secure, leak-proof seal.",
      "Made with 304 stainless steel — rust-resistant, durable, and BPA-free.",
      "ISI certified with 1-year warranty — a reliable daily companion for students.",
    ],
  },
  {
    id: 4,
    name: "Classmate Pulse 6 Subject Spiral Notebook",
    category: "stationery",
    benefit:
      "6-subject A4 notebook with attractive cover — perfect for college notes",
    price: "₹201",
    tag: "Student Favorite",
    image: "https://m.media-amazon.com/images/I/51Ljom+q7BL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4sSQLD2?tag=curifyystore-21",
    rating: 4.5,
    reviewCount: 1121,
    keywords: [
      "notebook",
      "classmate",
      "spiral notebook",
      "notes",
      "writing",
      "school",
      "college",
      "study",
    ],
    description: [
      "6 clearly divided subjects make it easy to organise all your college notes in one book.",
      "A4 size (29.7 x 21 cm) with 400 single-line pages — plenty of space for every lecture.",
      "Dust-repellent PP soft cover with rounded corners keeps pages safe and looking sharp.",
      "Spiral binding lets the notebook lie flat so writing feels effortless, page after page.",
      "Attractive cover designs make it a joy to carry — a true student essential under ₹210.",
    ],
  },
  {
    id: 5,
    name: "Luxor 5 Subject Single Ruled Notebook",
    category: "stationery",
    benefit:
      "Compact A5 ruled notebook with 300 smooth pages for clean, organised notes",
    price: "₹146",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/41A+0eKLTML._SL1500_.jpg",
    amazonUrl: "https://amzn.to/41NPMYJ?tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 12836,
    keywords: [
      "notebook",
      "luxor",
      "ruled notebook",
      "notes",
      "writing",
      "school",
      "college",
      "study",
    ],
    description: [
      "5 subject sections keep your notes neatly organised across different topics or classes.",
      "A5 size (14.0 x 21.6 cm) slips into any bag — great for college, meetings, or journaling.",
      "300 pages of 70 GSM paper deliver a smooth, ink-friendly writing experience every time.",
      "Sturdy cover adds durability and a professional look for office or campus use alike.",
      "Trusted by over 12,000 buyers — one of Amazon India's best-selling ruled notebooks.",
    ],
  },
  {
    id: 6,
    name: "KALP 2026 Dated Planner Kit",
    category: "stationery",
    benefit:
      "All-in-one 2026 planner with 450+ stickers, pocket diary, posters & eco pen",
    price: "₹999",
    tag: "Trending",
    image: "https://m.media-amazon.com/images/I/41igSswM8aL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4cmdSQo?tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 444,
    keywords: [
      "planner",
      "diary",
      "notebook",
      "organizer",
      "kalp",
      "dated planner",
      "journal",
      "2026",
    ],
    description: [
      "A page for every day of 2026 — plan meetings, goals, and habits in one hardbound diary.",
      "Ink-bleed-free 400 pages in A5 hardcover with ribbon bookmark and matte finish.",
      "Includes 450+ stickers, pocket diary, magnetic bookmark, 2 posters, activity booklet & eco-friendly pen.",
      "Compact A5 size is travel-ready and tough — works as a daily planner, journal, or gift.",
      "Originally priced at ₹2,999, available at 67% off — a premium gift that feels personal.",
    ],
  },
  {
    id: 7,
    name: "House of Quirk 1200ML Stainless Steel Tumbler",
    category: "student",
    benefit:
      "Large #1 Best Seller tumbler with handle, lid & 2 straws — keeps drinks hot or cold all day",
    price: "₹1,249",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/41GejyccUWL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4dpEyAY?tag=curifyystore-21",
    rating: 4.1,
    reviewCount: 3220,
    keywords: [
      "tumbler",
      "bottle",
      "water bottle",
      "steel tumbler",
      "drinkware",
      "1200ml",
      "insulated",
    ],
    description: [
      "1200ML stainless steel tumbler keeps drinks hot for hours and cold all day — no sweating on the outside.",
      "Comes with a secure lid and 2 straws so you can sip your way, with zero spills on the go.",
      "Ergonomic handle makes it easy to carry from desk to gym to outdoor adventures.",
      "#1 Best Seller in Insulated Tumblers on Amazon India with 400+ buys last month.",
      "Pink Daisy design is instantly Instagrammable — a practical gift that also looks gorgeous on your desk.",
    ],
  },
  {
    id: 8,
    name: "BURRDOFF Insulated Tumbler with Bear Straw Cover",
    category: "fun",
    benefit:
      "1200ML double-wall tumbler with cute bear straw cover — keeps drinks at perfect temp for 12 hrs",
    price: "₹1,499",
    tag: "Trending",
    image: "https://m.media-amazon.com/images/I/41ED6UmdQXL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4bNkeIt?tag=curifyystore-21",
    rating: 4.5,
    reviewCount: 142,
    keywords: [
      "tumbler",
      "bottle",
      "bear tumbler",
      "cute bottle",
      "straw bottle",
      "drinkware",
      "insulated",
    ],
    description: [
      "Double-wall vacuum insulation keeps cold drinks icy for 12 hours and hot drinks warm for 8 hours.",
      "Premium 304 stainless steel is BPA-free, rust-resistant, and leaves zero metallic aftertaste.",
      "Anti-splash threaded lid seals tightly so you can toss it in your bag without worrying about leaks.",
      "Includes a cute bear straw cover, silicone straw cover, stainless steel straw, straw brush, and Tritan lid.",
      "Slim tapered base fits most car cupholders — the perfect road trip or commute companion.",
    ],
  },
  {
    id: 9,
    name: "Nestasia PickSip40 Tumbler with Straw & Top Handle",
    category: "student",
    benefit:
      "Amazon's Choice 1.2L tumbler with dual sip-swig lid and tri-ply vacuum insulation",
    price: "₹1,195",
    tag: "Viral",
    image: "https://m.media-amazon.com/images/I/419FaxRU7XL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/41tTruZ?tag=curifyystore-21",
    rating: 4.0,
    reviewCount: 758,
    keywords: [
      "tumbler",
      "bottle",
      "nestasia",
      "straw bottle",
      "drinkware",
      "handle bottle",
      "aesthetic bottle",
    ],
    description: [
      "Tri-ply vacuum insulation — three layers keep your beverage at the right temperature far longer than standard bottles.",
      "Dual-compartment sip-swig lid lets you switch between sipping through a straw or chugging freely with a flip.",
      "BIS-certified 304 stainless steel with a BPA-free, food-safe lid — safe, durable, and leakproof by design.",
      "Ergonomic top handle makes it effortless to carry whether you're commuting, at the gym, or on campus.",
      "Amazon's Choice with 700+ buys last month — comes complete with stainless steel tumbler, PP straw, and straw cleaner.",
    ],
  },
  {
    id: 10,
    name: "The Umbrella Store Anti Hero Glass Tumbler",
    category: "fun",
    benefit:
      "Aesthetic transparent glass can with bamboo lid and straw — the edgy desk drink upgrade under ₹500",
    price: "₹499",
    tag: "Viral",
    image: "https://m.media-amazon.com/images/I/71mRHHeMDvL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/41EePNY?tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 35,
    keywords: [
      "tumbler",
      "glass tumbler",
      "bottle",
      "drinkware",
      "anti hero",
      "glass bottle",
    ],
    description: [
      "350ml transparent glass can tumbler with a bold Anti Hero graphic print — turns your daily drink into a vibe.",
      "Natural bamboo lid seals tightly and adds an eco-friendly, aesthetic touch to the look.",
      "Includes a reusable glass straw — perfect for iced coffee, cold brew, smoothies, or any cold drink.",
      "Clear borosilicate-style glass lets you see what's inside — great for showing off your colorful drinks.",
      "Slim, can-shaped silhouette fits standard cup holders and looks great on your study desk or cafe table.",
    ],
  },
  {
    id: 11,
    name: "Sunchhaya Book Stand & Laptop Stand",
    category: "productivity",
    benefit:
      "360° rotatable multi-functional book & laptop stand with adjustable height and angle",
    price: "₹389",
    tag: "Student Favorite",
    image: "https://m.media-amazon.com/images/I/41DZN7DMHEL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/3NUyxSw?tag=curifyystore-21",
    rating: 3.9,
    reviewCount: 312,
    keywords: [
      "book stand",
      "laptop stand",
      "study stand",
      "holder",
      "reading stand",
      "desk stand",
      "adjustable stand",
    ],
    description: [
      "Multi-functional foldable stand that works as a book holder, laptop riser, recipe stand, or music sheet holder.",
      "360° rotation and adjustable tilt lets you set the perfect reading or typing angle in seconds.",
      "Adjustable height reduces neck strain during long study or work sessions at your desk.",
      "Warm R51 brown finish fits neatly into any room — minimalist, earthy, and student-friendly.",
      "Folds flat for easy portability — carry it to class, the library, or use it across multiple rooms at home.",
    ],
  },
  {
    id: 12,
    name: "APPUCOCO Adjustable Metal Bookend with Pen Holder",
    category: "productivity",
    benefit:
      "Expandable metal bookend with built-in pen holder — keeps your desk books and stationery organized",
    price: "₹499",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/41yyZPCsshL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4trV7kA?tag=curifyystore-21",
    rating: 4.1,
    reviewCount: 189,
    keywords: [
      "bookend",
      "book stand",
      "pen holder",
      "desk organizer",
      "metal bookend",
      "study",
    ],
    description: [
      "Expands up to 15 inches to hold books of any volume — works for home shelves, office desks, classrooms, and libraries.",
      "Built-in pen holder means your stationery stays within arm's reach — no more hunting for pens mid-study session.",
      "Tiered shelf organizer design keeps books upright and stable, preventing them from leaning or falling over.",
      "Matte black metal finish is sleek and modern — blends into minimalist and academic desk setups effortlessly.",
      "Heavy-duty non-slip base prevents sliding even on smooth surfaces, keeping your stack secure throughout the day.",
    ],
  },
  {
    id: 13,
    name: "Metal Book Stand - Portable Cookbook & Study Holder",
    category: "productivity",
    benefit:
      "Foldable multicolor metal book stand — lightweight and adjustable for reading, cooking, and studying",
    price: "₹278",
    tag: "Student Favorite",
    image: "https://m.media-amazon.com/images/I/51fa3MkamGL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4cjAlOa?tag=curifyystore-21",
    rating: 4.0,
    reviewCount: 224,
    keywords: [
      "book stand",
      "cookbook stand",
      "reading stand",
      "study holder",
      "portable stand",
      "desk",
    ],
    description: [
      "Foldable and portable design makes this the perfect study companion — pack it in your bag or set it up anywhere in seconds.",
      "Adjustable angle lets you prop up books, tablets, notebooks, or cookbooks at a comfortable reading height.",
      "Multicolor finish adds a fun, vibrant touch to your desk setup — a cheerful productivity boost for students.",
      "Sturdy metal construction holds textbooks and thick cookbooks firmly without wobbling or bending.",
      "At just ₹278, it's one of the most affordable desk upgrades that actually makes a visible difference to your posture.",
    ],
  },
  {
    id: 14,
    name: "Metawood Superman Bookend",
    category: "productivity",
    benefit: "Superhero illusion bookend that doubles as stunning desk decor",
    price: "₹299",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/51m9R3AqTpL._SL1024_.jpg",
    amazonUrl: "https://amzn.to/4bME9r5?tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 48,
    keywords: ["bookend", "superman", "book holder", "desk decor", "study"],
    description: [
      "The Metawood Superman Bookend brings a playful superhero vibe to your study desk with its clever illusion design.",
      "Made of durable metal, it keeps your books upright while looking absolutely cool.",
      "The Superman design creates an eye-catching 3D illusion effect that wows anyone who sees it.",
      "Perfect for gifting to a book lover or adding personality to a boring shelf.",
      "Lightweight yet sturdy — it does the job without taking up much space.",
    ],
  },
  {
    id: 15,
    name: "Canvas 3-Layer Pencil Pouch",
    category: "stationery",
    benefit: "Large-capacity 3-compartment aesthetic pencil pouch for school",
    price: "₹299",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/712zJVzitFL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4m3pISS?tag=curifyystore-21",
    rating: 3.9,
    reviewCount: 1910,
    keywords: [
      "pencil pouch",
      "pencil case",
      "pen pouch",
      "stationery bag",
      "canvas pouch",
      "school bag",
    ],
    description: [
      "This Canvas pencil pouch packs serious capacity into a cute aesthetic package.",
      "The 3 separate compartments keep your pens, pencils, erasers, and stationery perfectly sorted and easy to find.",
      "Made from durable canvas material that holds its shape even when fully loaded.",
      "The stylish black design looks great with any school bag.",
      "Big enough for all your supplies — ideal for students who hate rummaging through a messy pencil case.",
    ],
  },
  {
    id: 16,
    name: "GadgetBite Hard Shell Pen Case",
    category: "stationery",
    benefit:
      "Waterproof hard EVA case that protects your Apple Pencil and pens",
    price: "₹329",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/81OXRhnYyUL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4skXwww?tag=curifyystore-21",
    rating: 4.3,
    reviewCount: 209,
    keywords: [
      "pen case",
      "pencil case",
      "hard case",
      "stationery",
      "pen holder",
      "gadgetbite",
    ],
    description: [
      "The GadgetBite Hard Shell Pen Case is a slim, protective EVA case built for Apple Pencil, fountain pens, and stylus pens.",
      "The hard outer shell guards against bumps while the inner mesh pocket and elastic strap keep everything secure.",
      "Lightweight and waterproof, it slips easily into any bag pocket without taking extra space.",
      "Great for students who carry expensive pens and don't want them getting crushed.",
      "A clean, professional look at a very student-friendly price.",
    ],
  },
  {
    id: 17,
    name: "Supreme Deals Canvas Pencil Case",
    category: "stationery",
    benefit:
      "6-layer, 3-compartment cute aesthetic pencil case for everyday use",
    price: "₹258",
    tag: "Student Favorite",
    image: "https://m.media-amazon.com/images/I/71a9rKgxQfL._SL1440_.jpg",
    amazonUrl: "https://amzn.to/4c3huWc?tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 1004,
    keywords: [
      "pencil case",
      "pen case",
      "canvas case",
      "stationery bag",
      "pouch",
    ],
    description: [
      "The Supreme Deals Canvas Pencil Case features 6 layers of compartments across 3 main sections — plenty of space for all your stationery.",
      "The cute aesthetic cartoon design makes it a fun addition to your school bag.",
      "Made from durable canvas with a smooth zipper closure that won't snag.",
      "Available in vibrant purple-pink colour that looks adorable on any desk.",
      "A crowd favourite for students who want function and personality in their pencil case.",
    ],
  },
  {
    id: 18,
    name: "Aesthetic Grid Journal Notebook",
    category: "stationery",
    benefit:
      "Premium grid-ruled journal perfect for notes, sketches, and planning",
    price: "₹399",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/61JMvK0SL5L._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B0B28PVRHQ/ref=cm_sw_r_as_gl_apa_gl_i_dl_FNAZQKAW05P3PPP3N1MV?linkCode=ml1&tag=curifyystore-21&linkId=03f7d3d3a5ed40b25ab87878fa147d3f",
    rating: 4.1,
    reviewCount: 156,
    keywords: [
      "journal",
      "notebook",
      "grid notebook",
      "aesthetic journal",
      "diary",
      "writing",
      "dotted",
    ],
    description: [
      "A5 hardcover grid journal with a soft pastel cover — designed for students who love aesthetic, organized setups.",
      "Dot-grid pages give you perfect structure for bullet journaling, sketching, equations, or daily planning.",
      "Thick, high-quality paper handles both gel pens and fine-liners without bleed-through or ghosting.",
      "Lay-flat binding means the notebook stays open on its own — no holding down pages while you write.",
      "Makes a beautiful gift for any student, creative, or planner — practical and pretty at the same time.",
    ],
  },
  {
    id: 20,
    name: "boAt Rockerz 411 Wireless Headphones",
    category: "audio",
    benefit:
      "40hrs battery, 40ms low latency, 40mm drivers — study & gaming beast",
    price: "₹1,089",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/71QdB7hDCAL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4sJPkXp?tag=curifyystore-21",
    rating: 4.1,
    reviewCount: 27892,
    keywords: [
      "headphones",
      "wireless headphones",
      "bluetooth headphones",
      "earphones",
      "boat",
      "music",
      "audio",
      "over ear",
      "rockerz",
      "gaming headset",
    ],
    description: [
      "The boAt Rockerz 411 delivers 40 hours of battery life so you never have to stop mid-study for a charge.",
      "The 40ms low latency mode is perfect for gaming and video watching without annoying audio delay.",
      "ENx tech ensures crystal clear calls — great for online classes and group calls.",
      "The 40mm drivers produce rich, immersive sound that makes every playlist better.",
      "Dual device pairing lets you switch seamlessly between phone and laptop.",
    ],
  },
  {
    id: 21,
    name: "pTron Studio Pro Headphones",
    category: "audio",
    benefit: "Wireless over-ear with 65hrs battery, ENC mic, and fast charging",
    price: "₹699",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/51oyBaXOGbL._SL1200_.jpg",
    amazonUrl: "https://amzn.to/4bP5DfC?tag=curifyystore-21",
    rating: 4.1,
    reviewCount: 348,
    keywords: [
      "headphones",
      "wireless headphones",
      "bluetooth headphones",
      "over ear headphones",
      "ptron",
      "music",
      "audio",
      "earphones",
    ],
    description: [
      "The pTron Studio Pro delivers an impressive 65 hours of playtime on a single charge — enough for a full week of study sessions without plugging in.",
      "The HD Mic with TruTalk AI-ENC technology cuts out background noise during calls and online classes for crystal-clear communication.",
      "Bluetooth 5.4 ensures a stable, lag-free connection.",
      "Type-C fast charging means you're never stuck waiting for power.",
      "Dual device pairing makes switching between phone and laptop effortless.",
    ],
  },
  {
    id: 22,
    name: "Post-it Super Sticky Notes (Neon)",
    category: "stationery",
    benefit: "2x sticking power neon sticky notes that actually stay put",
    price: "₹350",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/81RFwqD8s2L._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4sMKhWd?tag=curifyystore-21",
    rating: 4.5,
    reviewCount: 1182,
    keywords: [
      "sticky notes",
      "post it",
      "notes",
      "reminder",
      "stationery",
      "neon sticky",
      "memo",
    ],
    description: [
      "Post-it Super Sticky Notes have twice the adhesive power of regular sticky notes, so they actually stay on textbooks, monitors, and notebooks without falling off.",
      "The neon colours make your most important reminders impossible to miss.",
      "Each pack includes 5 pads with 90 sheets each — plenty of supply for a full semester.",
      "Perfect for coding notes on monitors, revision flags in textbooks, or marking important pages.",
      "The classic 3x3 inch size works for any quick note.",
    ],
  },
  {
    id: 23,
    name: "boAt Rockerz 113 Neckband",
    category: "audio",
    benefit: "Magnetic neckband with 40hr battery, dual pair, and fast charge",
    price: "₹699",
    tag: "Trending",
    image: "https://m.media-amazon.com/images/I/61B5hIAmvdL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/3PH2PbX?tag=curifyystore-21",
    rating: 4.0,
    reviewCount: 8056,
    keywords: [
      "neckband",
      "earphones",
      "bluetooth earphones",
      "wireless earphones",
      "boat",
      "music",
      "audio",
      "neckband earphones",
      "sports earphones",
    ],
    description: [
      "The boAt Rockerz 113 neckband fits effortlessly around your neck and stays there during workouts, commutes, and long study sessions.",
      "The magnetic buds click together and auto-pause music when not in use — super convenient.",
      "40 hours of battery life means you can go nearly a week without charging.",
      "Fast charge support gets you hours of playback in just minutes.",
      "ENx technology delivers clear calls even in noisy environments like cafeterias or public transport.",
    ],
  },
  {
    id: 24,
    name: "Magnetic Cable Clips Organizer",
    category: "storage",
    benefit:
      "Keep your desk cables tangle-free with magnetic cable management clips",
    price: "₹299",
    tag: "Viral",
    image: "https://m.media-amazon.com/images/I/51jFWg5DMKL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4v2vcS9?tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 580,
    keywords: [
      "cable clips",
      "cable organizer",
      "wire organizer",
      "desk organizer",
      "magnetic clips",
      "cable management",
    ],
    description: [
      "These magnetic cable clips snap onto your desk edge and hold USB, charging, and headphone cables in place so they're always within reach.",
      "No more crawling under desks to find fallen cables.",
      "The strong magnetic base holds firmly without scratching surfaces.",
      "Works on most desk materials and can hold multiple cables at once.",
      "A simple, cheap fix for the cable chaos that plagues every student desk. Clean desk, clear mind.",
    ],
  },
  {
    id: 25,
    name: "DME Pastel Sticky Notes Set",
    category: "stationery",
    benefit: "Cute pastel tear-off memo pads perfect for organizing notes",
    price: "₹187",
    tag: "Student Favorite",
    image: "https://m.media-amazon.com/images/I/71I5gM4lvCL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4s8clSU?tag=curifyystore-21",
    rating: 3.2,
    reviewCount: 40,
    keywords: [
      "sticky notes",
      "pastel notes",
      "memo pad",
      "stationery",
      "reminder",
      "dme",
    ],
    description: [
      "These DME pastel sticky notes come in a charming multi-colour set ideal for colour-coded notes, reminders, and study organization.",
      "Each 95mm x 98mm sheet is the perfect size for a short reminder or important note.",
      "The pastel shades are easy on the eyes and look adorable on any planner or notebook.",
      "With 210 sheets in the set, you'll have plenty to last through exams and projects.",
      "A fun and affordable stationery essential for any organized student.",
    ],
  },
  {
    id: 26,
    name: "MeeTo Mini Travel Sewing Kit",
    category: "survival",
    benefit:
      "Pocket-sized sewing kit with everything for quick clothing repairs",
    price: "₹134",
    tag: "Student Favorite",
    image: "https://m.media-amazon.com/images/I/51BSdXORzDL._SL1080_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B0CFJF5KZD/ref=cm_sw_r_as_gl_apa_gl_i_BG7R4PRMZYSB59Z7GJG8?linkCode=ml1&tag=curifyystore-21&linkId=6841ff42f2e0409648f6a93b1a653fe4",
    rating: 4.0,
    reviewCount: 127,
    keywords: [
      "sewing kit",
      "travel sewing",
      "needle thread",
      "emergency kit",
      "repair kit",
      "sewing",
    ],
    description: [
      "The MeeTo Mini Travel Sewing Kit is the ultimate 'I didn't know I needed this' purchase.",
      "It includes scissors, needles, thread in multiple colours, pins, and clips — everything for quick wardrobe repairs while at college or on a trip.",
      "The compact folding design fits in your bag pocket or drawer without taking any space.",
      "Perfect for repairing a loose button, a torn seam, or a broken zip when you're far from home.",
      "Every student staying in a hostel should have one of these.",
    ],
  },
  {
    id: 27,
    name: "Retractable Gel Pen Set",
    category: "stationery",
    benefit:
      "Smooth-writing retractable gel pens — your everyday writing essential",
    price: "₹199",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/71P5kFtTNzL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/419Gbvi?tag=curifyystore-21",
    rating: 4.1,
    reviewCount: 445,
    keywords: [
      "pen",
      "gel pen",
      "retractable pen",
      "writing pen",
      "stationery",
      "ballpoint",
      "smooth writing",
    ],
    description: [
      "Set of retractable gel pens in multiple ink colors — blue, black, red, and more for color-coded note-taking.",
      "Smooth, consistent ink flow from tip to finish — writes cleanly on notebooks, planners, and sticky notes.",
      "Click retract mechanism keeps the tip protected in your bag so there are no accidental ink marks.",
      "Comfortable rubber grip reduces hand fatigue during long lectures, study sessions, or exam prep.",
      "At ₹199, it's one of the best value pen sets for students — replace just the refill to save money long-term.",
    ],
  },
  {
    id: 28,
    name: "Macaron Sticky Notes (400 Sheets)",
    category: "stationery",
    benefit:
      "Vibrant macaron-colour sticky notes with strong adhesive — 400 sheets",
    price: "₹129",
    tag: "Viral",
    image: "https://m.media-amazon.com/images/I/517+9a4yjxL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4saEyIK?tag=curifyystore-21",
    rating: 3.8,
    reviewCount: 70,
    keywords: [
      "sticky notes",
      "macaron notes",
      "memo pad",
      "stationery",
      "reminder",
      "pastel sticky",
    ],
    description: [
      "These Macaron sticky notes come in beautiful pastel macaron shades that make your study planner or board look adorable.",
      "With 400 sheets of strong-adhesive paper, you have plenty to stick reminders, flags, and annotations across all your books and notebooks.",
      "The 7.6 x 7.6 cm size gives you just enough space for a meaningful note without wasting paper.",
      "A fan favourite for bullet journaling, mood boarding, and revision planning.",
      "Affordable and cheerful — makes studying feel a little less serious.",
    ],
  },
  {
    id: 29,
    name: "WeCool T1 Mobile Stand for Desk",
    category: "tech",
    benefit:
      "360° rotating desk stand with height & angle adjustment for phones and tablets",
    price: "₹489",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/71Q0e7FXJFL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/47Bxy05?tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 3068,
    keywords: [
      "mobile stand",
      "phone stand",
      "phone holder",
      "desk stand",
      "wecool",
      "phone mount",
    ],
    description: [
      "The WeCool T1 features 360° rotation so you can watch, video call, or follow a recipe from any angle without straining your neck.",
      "Height and view angle are both adjustable, making it perfect for your study desk, bedside table, or kitchen counter.",
      "A rubber anti-slip pad keeps your phone or tablet firmly in place — no sliding, no scratching.",
      "Compatible with smartphones, tablets, Kindles, and iPads up to 7 inches in size.",
      "Backed by a 1-year brand warranty — solid desk companion for students who live on their devices.",
    ],
  },
  {
    id: 30,
    name: "Soko Cable Management Box with Mobile Stand",
    category: "storage",
    benefit:
      "Hide messy power strips and cables in a sleek organiser box with a built-in phone stand",
    price: "₹999",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/71G0c7H3mfL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/47A9SJE?tag=curifyystore-21",
    rating: 4.3,
    reviewCount: 48,
    keywords: [
      "cable box",
      "wire management",
      "cable organizer",
      "mobile stand",
      "desk organizer",
      "cable management",
    ],
    description: [
      "The Soko WireHide is a premium plastic cable management box that hides your power strip, router, and gadget wires neatly under your desk.",
      "Comes with a built-in phone stand so your device stays accessible even while charging.",
      "Measures 35 × 13.5 × 15 cm — spacious enough for extension boards, adapters, and cables.",
      "Keeps your WFH or study setup looking clean, modern, and clutter-free in seconds.",
      "Made with heat-resistant premium plastic for safe, long-term use around electronics.",
    ],
  },
  {
    id: 31,
    name: "Picozon Magnetic Cable Clip Organizer (Pack of 6)",
    category: "storage",
    benefit:
      "Stick-anywhere magnetic cable clips to tame charger and headphone wires on any surface",
    price: "₹499",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/41HkPM-PJ-L._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4m7DEeI?tag=curifyystore-21",
    rating: 4.0,
    reviewCount: 1331,
    keywords: [
      "cable clips",
      "cable organizer",
      "wire clips",
      "magnetic",
      "desk organizer",
      "cable management",
    ],
    description: [
      "These 6 magnetic cable clips stick to almost any smooth surface — wood, glass, metal, marble — keeping wires exactly where you want them.",
      "The 7.5mm slot holds most phone chargers, headphone cables, and USB wires securely.",
      "Adhesive backing installs in seconds: clean the surface, peel, and stick. No tools needed.",
      "Not happy with placement? Wash the adhesive, air dry, and restick up to 10 times.",
      "A must-have for keeping your desk, car, or nightstand wire-free and looking tidy.",
    ],
  },
  {
    id: 32,
    name: "DR VAKU Unity 15W Fast Wireless Charger",
    category: "electrical",
    benefit:
      "15W Qi-certified wireless charging stand compatible with iPhone and Android",
    price: "₹799",
    tag: "Viral",
    image: "https://m.media-amazon.com/images/I/61KM2g2WZAL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4bNCOQH?tag=curifyystore-21",
    rating: 3.9,
    reviewCount: 561,
    keywords: [
      "wireless charger",
      "fast charger",
      "charging pad",
      "qi charger",
      "15w charger",
      "phone charger",
    ],
    description: [
      "The DR VAKU Unity charges at up to 15W for fast wireless power — just place your phone and go, no fumbling with cables.",
      "Qi-certified and compatible with iPhone 12 through 17 series, Samsung Galaxy, OnePlus, Nothing Phone, and all Qi-enabled devices.",
      "The upright stand design lets you use your phone while it charges — great for notifications, video calls, and bedside use.",
      "Built-in short circuit protection and charging indicator light for safe, reliable overnight charging.",
      "Comes with a USB-C cable and user manual — just add a 9V adapter and it's ready to go.",
    ],
  },
  {
    id: 33,
    name: "Deskart Pen Holder with Clock & Infinity Calendar",
    category: "storage",
    benefit:
      "Stylish MDF desk organiser with a working analog clock and lifetime reusable calendar",
    price: "₹999",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/71Lf7YWZFSL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4bXZf4t?tag=curifyystore-21",
    rating: 3.8,
    reviewCount: 13,
    keywords: [
      "pen holder",
      "desk organizer",
      "clock",
      "calendar",
      "stationery holder",
      "desk decor",
    ],
    description: [
      "The Deskart pen stand combines three desk essentials in one: a pen holder, an analog clock, and a lifetime infinity calendar.",
      "Built from premium laser-cut MDF wood with a smooth polished finish — looks elegant on any study table or office desk.",
      "The infinity calendar is reusable year after year, so you'll never need to buy a new desk calendar again.",
      "Spacious compartment holds pens, pencils, markers, scissors, and other daily stationery needs.",
      "Makes a thoughtful corporate or festive gift — modern, functional, and beautifully crafted.",
    ],
  },
  {
    id: 34,
    name: "Amazon Basics Desk Organiser 7 Compartments (Pack of 2)",
    category: "storage",
    benefit:
      "Pack of 2 sleek white plastic desk organisers with 7 compartments each",
    price: "₹699",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/71A9fFPdoNL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4v6GsNh?tag=curifyystore-21",
    rating: 4.0,
    reviewCount: 2786,
    keywords: [
      "desk organizer",
      "stationery organizer",
      "pen holder",
      "desk storage",
      "office organizer",
      "compartment organizer",
    ],
    description: [
      "Get two high-quality desk organisers in one pack — each with 7 compartments for pens, stationery, makeup, and small office essentials.",
      "Crafted from durable HIPS + PS + PP plastic with smooth edges and a clean white finish that suits any workspace aesthetic.",
      "Compact 23 × 15 × 11.5 cm size fits neatly on your desk, shelf, or inside a cabinet without taking up too much space.",
      "Easy-slide drawers with ergonomic handles make accessing your stuff quick and frustration-free.",
      "Simple to wipe clean — maintain a tidy, fresh-looking workspace effortlessly.",
    ],
  },
  {
    id: 35,
    name: "UCRAVO Desk Organiser with 5 Compartments & 2 Drawers",
    category: "storage",
    benefit:
      "Budget-friendly black desk organiser with 5 slots and 2 transparent drawers",
    price: "₹199",
    tag: "Student Favorite",
    image: "https://m.media-amazon.com/images/I/61FQx8Y1JxL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4ckQRNL?tag=curifyystore-21",
    rating: 4.0,
    reviewCount: 512,
    keywords: [
      "desk organizer",
      "drawer organizer",
      "stationery organizer",
      "desk storage",
      "compartment",
      "pen holder",
    ],
    description: [
      "At just ₹199, the UCRAVO desk organiser is one of the best value buys for students — 5 compartments and 2 transparent drawers in sleek black.",
      "Different-sized slots let you sort pens, paper clips, keys, phone, wallet, and small stationery all in one place.",
      "The 2 transparent drawers hide smaller items like erasers, staples, and accessories while keeping them easy to find.",
      "Lightweight at 110g, making it easy to move around between your desk, shelf, or bag.",
      "500+ units sold every month — a trusted pick for students, teachers, and office workers alike.",
    ],
  },
  {
    id: 36,
    name: "Fujifilm Instax Mini Link 3 Smartphone Printer",
    category: "tech",
    benefit:
      "Print photos straight from your phone in seconds — no ink, no mess.",
    price: "₹10,499",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/41oTrKTv6-L._SL1500_.jpg",
    amazonUrl: "https://amzn.to/3Qh8nKf?tag=curifyystore-21",
    rating: 4.4,
    reviewCount: 320,
    keywords: [
      "instax",
      "photo printer",
      "fujifilm",
      "instant printer",
      "photo",
      "printer",
      "polaroid",
      "smartphone printer",
    ],
    description: [
      "Print wallet-sized photos from your smartphone via Bluetooth in seconds.",
      "Works with Fujifilm's free Instax mini Link app for iOS and Android.",
      "Gorgeous Clay White finish — compact enough to slip into any bag.",
      "Uses credit card-sized instax mini film for sharp, vivid prints.",
      "Perfect for journaling, gifting, decorating your room, or capturing memories on the go.",
    ],
  },
  {
    id: 37,
    name: "Epson PictureMate PM-520 Compact Photo Printer",
    category: "tech",
    benefit:
      "Lab-quality borderless photo prints at home — no visits to a print shop needed.",
    price: "₹9,699",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/4154dZBYbTL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4tpFR7M?tag=curifyystore-21",
    rating: 4.3,
    reviewCount: 1850,
    keywords: [
      "photo printer",
      "epson",
      "compact printer",
      "picture printer",
      "photo printing",
      "printer",
    ],
    description: [
      'Prints lab-quality, borderless 4×6" photos from your phone, laptop, or memory card.',
      "Uses Epson's DURABrite Ultra ink for smudge-proof, water-resistant, long-lasting prints.",
      "Super compact and lightweight — perfect for dorm rooms and small spaces.",
      'Prints a 4×6" photo in just 37 seconds with stunning colour accuracy.',
      "Compatible with Wi-Fi printing, USB, and SD card slots for maximum flexibility.",
    ],
  },
  {
    id: 38,
    name: "SEZNIK Mini Portable Thermal Pocket Printer",
    category: "tech",
    benefit:
      "Inkless Bluetooth pocket printer — print notes, stickers, and photos anywhere.",
    price: "₹1,747",
    tag: "Viral",
    image: "https://m.media-amazon.com/images/I/41a0yk56tpL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/41ag8Ec?tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 410,
    keywords: [
      "thermal printer",
      "pocket printer",
      "mini printer",
      "portable printer",
      "sticker printer",
      "label printer",
    ],
    description: [
      "Palm-sized inkless thermal printer that pairs to your phone via Bluetooth — no ink cartridges, ever.",
      "Print sticky-back stickers, to-do lists, mini photos, labels, and study notes on the go.",
      "Compatible with both Android and iOS — download the free app and print in seconds from anywhere.",
      "Compact EON-Stealth velvet body fits in a jacket pocket, pencil case, or small bag with ease.",
      "Comes with thermal paper rolls and 1-year warranty — a fun, practical tool for aesthetic setups and journaling.",
    ],
  },
  {
    id: 39,
    name: "One94Store LED Desk Lamp with Touch Sensor",
    category: "electrical",
    benefit:
      "USB rechargeable study lamp with 3 brightness modes, 360° adjustable arm & phone holder",
    price: "₹299",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/41zzFNFjRlL._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B0D57JRWN1?linkCode=ml1&tag=curifyystore-21",
    rating: 4.0,
    reviewCount: 112,
    keywords: [
      "desk lamp",
      "study lamp",
      "led lamp",
      "table lamp",
      "touch lamp",
      "reading light",
      "lamp",
    ],
    description: [
      "USB rechargeable with 1250mAh battery — up to 6 hours of light on a single charge.",
      "3 lighting modes (warm, cool, natural) with stepless dimming for the perfect brightness.",
      "360° gooseneck arm adjusts to any angle, reducing eye strain during long study sessions.",
      "Built-in phone holder keeps your device within reach while you study or work.",
      "Lightweight and compact — ideal for dorms, desks, bedside tables, and travel.",
    ],
  },
  {
    id: 40,
    name: "WEIRD WOLF Rechargeable Study Table Lamp",
    category: "electrical",
    benefit:
      "3 color modes, 2000mAh battery, flexible gooseneck, pen & mobile holder — 6 months warranty",
    price: "₹599",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/51xU9SQBNHL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/47HRQVQ?tag=curifyystore-21",
    rating: 4.3,
    reviewCount: 2692,
    keywords: [
      "desk lamp",
      "study lamp",
      "table lamp",
      "rechargeable lamp",
      "led lamp",
      "reading light",
      "lamp",
    ],
    description: [
      "3 color modes (White, Warm White, Warm) — switch with a single touch for any study situation.",
      "2000mAh battery with Type-C USB charging supports laptop, power bank, or adapter.",
      "Long-press touch dimmer lets you choose Low/Medium/High brightness smoothly.",
      "Flexible 360° gooseneck with built-in pen holder and mobile stand — a true 3-in-1 desk lamp.",
      "6-month brand warranty and 500+ buys last month — a tested bestseller for students.",
    ],
  },
  {
    id: 41,
    name: "Dayalu Double Head Desk Lamp with Fan & Display",
    category: "electrical",
    benefit:
      "Dual-head study lamp with time display, fan, and double pen holder — all in one desk organizer",
    price: "₹1,299",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/51e6Hk8T41L._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4c5eN6G?tag=curifyystore-21",
    rating: 3.9,
    reviewCount: 20,
    keywords: [
      "desk lamp",
      "study lamp",
      "lamp with fan",
      "double head lamp",
      "led lamp",
      "table lamp",
      "fan lamp",
      "lamp",
    ],
    description: [
      "Dual-headed lamp expands 180° horizontally and folds vertically for wide, flexible lighting.",
      "Built-in LED display shows time, temperature, and date — no separate desk clock needed.",
      "3 light modes (3000K/4500K/6000K) with stepless dimming and long-press touch control.",
      "USB-powered base doubles as a phone stand and has two pen holders for easy desk organization.",
      "Multifunctional and space-saving — a perfect all-in-one desk companion for students.",
    ],
  },
  {
    id: 42,
    name: "eo Digital Magnetic Timer with Whiteboard",
    category: "productivity",
    benefit:
      "4 independent timers & stopwatches with a built-in whiteboard — perfect for Pomodoro study sessions",
    price: "₹399",
    tag: "Viral",
    image: "https://m.media-amazon.com/images/I/41E0UrSmMUL._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B0GK72WGRC?linkCode=ml1&tag=curifyystore-21",
    rating: 4.5,
    reviewCount: 16,
    keywords: [
      "timer",
      "study timer",
      "whiteboard timer",
      "pomodoro",
      "magnetic timer",
      "countdown timer",
    ],
    description: [
      "4 independent countdown timers and stopwatches run simultaneously — perfect for Pomodoro technique.",
      "Built-in whiteboard lets you jot goals or tasks right on the device — no paper needed.",
      "Magnetic back sticks to any metal surface like a fridge or locker — always visible.",
      "Amazon's Choice with 200+ buys last month and 1-year warranty.",
      "Compact and lightweight — perfect for desks, study tables, kitchens, and office use.",
    ],
  },
  {
    id: 43,
    name: "Milgeo Gravity Pomodoro Timer",
    category: "productivity",
    benefit:
      "Flip to set time — a gravity-activated time management cube for focused study and work",
    price: "₹999",
    tag: "Student Favorite",
    image: "https://m.media-amazon.com/images/I/31ld3G7XZBL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4dw4ElX?tag=curifyystore-21",
    rating: 4.5,
    reviewCount: 107,
    keywords: [
      "pomodoro timer",
      "timer",
      "study timer",
      "gravity timer",
      "focus timer",
      "time management",
    ],
    description: [
      "Simply flip the cube to start a timer — no buttons, no apps, just pure tactile focus.",
      "Each side sets a different time interval — perfect for Pomodoro or interval studying.",
      "Compact plastic cube weighs just 70g and fits in any bag or sits quietly on your desk.",
      "Great for ADHD, time-blindness, and anyone who needs a visual, physical reminder to focus.",
      "4.5 stars with 107 reviews — a productivity toy that actually helps you stay on task.",
    ],
  },
  {
    id: 44,
    name: "Amkette USB-C Hub 4 Port",
    category: "tech",
    benefit:
      "Slim aluminum 4-port USB-C hub with 5Gbps USB 3.0 speed — plug and play",
    price: "₹249",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/41xlPW4BYFL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4scgBAL?tag=curifyystore-21",
    rating: 4.3,
    reviewCount: 1004,
    keywords: [
      "fan",
      "handheld fan",
      "portable fan",
      "rechargeable fan",
      "mini fan",
      "desk fan",
      "travel fan",
    ],
    description: [
      "1 USB 3.0 port delivers 5Gbps transfer speeds — move large files effortlessly.",
      "3 additional USB 2.0 ports for peripherals, accessories, and everyday devices.",
      "110mm slim and lightweight 19g aluminum build — fits in any bag pocket.",
      "Works with Windows 7+, Mac OS 10.1+, and Linux — universally compatible.",
      "Amazon's Choice with 1,000+ reviews — one of the most trusted USB-C hubs under ₹250.",
    ],
  },
  {
    id: 45,
    name: "Honeywell 7-in-1 TypeC Docking Station 4K HDMI",
    category: "tech",
    benefit:
      "All-in-one TypeC hub with 4K HDMI, SD card, 100W PD charging — 3 years warranty",
    price: "₹1,999",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/31gZe3CXLZL._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B0CHBHYLLR?linkCode=ml1&tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 1081,
    keywords: [
      "fan",
      "folding fan",
      "mini fan",
      "handheld fan",
      "portable fan",
      "travel fan",
    ],
    description: [
      "7 ports in one: 4K HDMI, USB 3.0, 2x USB 2.0, TypeC 3.0, SD card, and Micro SD slot.",
      "100W Power Delivery charges your laptop while you use all other ports simultaneously.",
      "Supports MacBook, Thunderbolt 3, laptops, and all Type-C devices.",
      "Amazon's Choice with 1K+ buys last month — a trusted upgrade for any workstation.",
      "3-year manufacturer warranty for complete peace of mind.",
    ],
  },
  {
    id: 46,
    name: "Portronics Mport 4D USB Hub",
    category: "tech",
    benefit:
      "4-port USB hub with 1.5m tangle-free cable — connect everything to your laptop",
    price: "₹229",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/31fy6AaC7OL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/3QfMFq0?tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 1046,
    keywords: [
      "travel bag",
      "duffle bag",
      "luggage",
      "travel luggage",
      "gym bag",
      "weekend bag",
      "bag",
      "travel duffel",
    ],
    description: [
      "4 USB 2.0 ports at up to 480 Mbps transfer speed — connect keyboards, mice, drives, and more.",
      "1.5-metre tangle-free cable keeps your setup clean and comfortable across any desk.",
      "Compatible with keyboards, mouse, USB drives, external HDDs, joysticks, and printers.",
      "Amazon's Choice with 500+ buys per month — extremely reliable for everyday use.",
      "1-year brand warranty — a plug-and-play essential for students and WFH setups.",
    ],
  },
  {
    id: 47,
    name: "HOME CUBE 7-Compartment Cable Organizer Box",
    category: "storage",
    benefit:
      "Compact 7-compartment box with cover to sort USB cables, chargers, and desk accessories",
    price: "₹491",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/51FNlbqbfmL._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B0CKLRBZZW?linkCode=ml1&tag=curifyystore-21",
    rating: 4.5,
    reviewCount: 545,
    keywords: [
      "umbrella",
      "folding umbrella",
      "compact umbrella",
      "mini umbrella",
      "rain umbrella",
      "portable umbrella",
    ],
    description: [
      "7 compartments including enlarged slots for USB cables, chargers, cards, and stationery.",
      "Made from eco-friendly, non-toxic ABS plastic with smooth, burr-free edges.",
      "Cover keeps dust out and items secure — ideal for desk drawers or shelves.",
      "Measures 28.5 × 10 × 8 cm — compact enough for any desk but spacious for all your cables.",
      "50+ buys last month — a simple, affordable solution to cable and desk clutter.",
    ],
  },
  {
    id: 48,
    name: "Neomate Cable Management Box",
    category: "storage",
    benefit:
      "Hides power strips and cables in a child-safe, heat-resistant box — desk stays spotless",
    price: "₹399",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/41yKxLa6pjL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/3O2tLCq?tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 72,
    keywords: [
      "umbrella",
      "uv umbrella",
      "sun umbrella",
      "anti uv",
      "compact umbrella",
      "carabiner umbrella",
    ],
    description: [
      "Neatly hides power strips, surge protectors, extension boards, and routers out of sight.",
      "Durable, heat-dissipating material built for heavy-duty applications and long-term use.",
      "32 × 24 × 13 cm spacious design fits most power strips and excess cable slack inside.",
      "Prevents tripping hazards and clutter — safer for kids and more aesthetically pleasing.",
      "12-month warranty — a clean, functional upgrade for home offices and study desks.",
    ],
  },
  {
    id: 49,
    name: "Bowiemall Reusable Cable Ties 20pcs",
    category: "storage",
    benefit:
      "20 microfiber reusable cable straps in 5 colors — tame every cable on your desk",
    price: "₹199",
    tag: "Student Favorite",
    image: "https://m.media-amazon.com/images/I/51D3jJBFl4L._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B0BNVG3JSV?linkCode=ml1&tag=curifyystore-21",
    rating: 3.9,
    reviewCount: 748,
    keywords: [
      "cable box",
      "cable organizer",
      "wire management",
      "desk organizer",
      "compartment box",
    ],
    description: [
      "20 cable ties in 5 colors — perfect for color-coded cable management across devices.",
      "High-quality microfiber cloth is reusable, eco-friendly, and won't damage cables.",
      "4-hole adjustment system makes it quick and easy to wrap any cable thickness.",
      "Works for all cords — chargers, USB cables, headphones, laptop power, lamp cords, and more.",
      "200+ buys last month at just ₹199 — the cheapest upgrade for a clean, tidy desk.",
    ],
  },
  {
    id: 50,
    name: "Portronics SoundDrum P 20W Bluetooth Speaker",
    category: "audio",
    benefit:
      "20W portable speaker with 6-7 hrs playtime, handsfree calling, USB slot & Type-C charging",
    price: "₹1,999",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/41DQPG4XfXL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4dXgPYW?tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 24602,
    keywords: [
      "cable management",
      "cable box",
      "wire organizer",
      "desk organizer",
      "neomate",
    ],
    description: [
      "20W audio output powered by a 4000mAh Li-ion battery — up to 7 hours of non-stop music.",
      "Built-in microphone supports handsfree calls — use it for studying, gaming, and calls.",
      "USB slot plays from drives, AUX-in for wired connections, and Type-C fast charging.",
      "Amazon's Choice with 24,000+ reviews — one of India's most trusted portable speakers.",
      "Lightweight and portable — your perfect room, hostel, or outdoor companion.",
    ],
  },
  {
    id: 51,
    name: "pTron Fusion Tunes 10W Speaker with Karaoke Mic",
    category: "audio",
    benefit:
      "10W mini Bluetooth speaker with wireless karaoke mic, RGB lights, 8hrs battery & fast charge",
    price: "₹799",
    tag: "Viral",
    image: "https://m.media-amazon.com/images/I/41RRV4GFKQL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4sQvEkX?tag=curifyystore-21",
    rating: 4.0,
    reviewCount: 5423,
    keywords: [
      "cable ties",
      "wire ties",
      "velcro ties",
      "cable organizer",
      "reusable ties",
    ],
    description: [
      "Comes with a wireless karaoke mic — sing along to your favorite songs instantly.",
      "Vivid RGB lights make it a fun desk centerpiece or party speaker in any space.",
      "8 hours of playtime with fast Type-C charging so you're never left without music.",
      "Bluetooth 5.1, TF card slot, and multiple voice effects for a full entertainment experience.",
      "Amazon's Choice with 3K+ monthly buys — a crowd favorite among students under ₹800.",
    ],
  },
  {
    id: 52,
    name: 'Kratos K9 Selfie Stick Tripod with Light 67"',
    category: "fun",
    benefit:
      "170cm bluetooth selfie stick tripod with LED fill light and detachable remote",
    price: "₹617",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/41GqIBGpUgL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4c4sGlF?tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 3209,
    keywords: [
      "storage box",
      "organizer box",
      "desk organizer",
      "multifunctional box",
      "storage",
    ],
    description: [
      "170cm/67inch extended height captures wide angles for vlogs, reels, and group shots.",
      "2-level LED fill light brightens selfies and video calls in any lighting condition.",
      "3-in-1: selfie stick, tripod, and phone stand — transitions between modes in seconds.",
      "Detachable Bluetooth remote controls your phone from up to 10 meters away.",
      "Amazon's Choice with 7K+ monthly buys — the go-to selfie stick for content creators.",
    ],
  },
  {
    id: 53,
    name: "One94Store Handheld Rechargeable Fan",
    category: "electrical",
    benefit:
      "Portable mini fan with 1200mAh battery, 120 speed levels, and whisper-quiet operation",
    price: "₹379",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/51D34LQBzRL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4vncMvw?tag=curifyystore-21",
    rating: 2.7,
    reviewCount: 14,
    keywords: [
      "bluetooth speaker",
      "wireless speaker",
      "speaker",
      "portronics",
      "portable speaker",
      "music",
      "audio",
      "sound",
      "20w speaker",
    ],
    description: [
      "1200mAh rechargeable battery keeps you cool without needing a power outlet.",
      "120 adjustable speed levels via long-press for precise airflow control.",
      "Lightweight and compact at 200g — fits in any bag for travel, college, or daily use.",
      "Waterproof and splash-resistant design for outdoor durability.",
      "Budget-friendly cooling option for hot classrooms, commutes, or workspaces.",
    ],
  },
  {
    id: 54,
    name: "Gaiatop Mini Handheld Folding Fan",
    category: "electrical",
    benefit:
      "Foldable pocket fan with 2 speed settings, rechargeable battery, and pastel design",
    price: "₹548",
    tag: "Trending",
    image: "https://m.media-amazon.com/images/I/41lj+PL-mRL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/3Of9864?tag=curifyystore-21",
    rating: 4.1,
    reviewCount: 2526,
    keywords: [
      "bluetooth speaker",
      "speaker with mic",
      "karaoke speaker",
      "wireless speaker",
      "ptron",
      "music",
      "audio",
      "karaoke",
    ],
    description: [
      "Foldable design fits in any bag pocket — perfect for college, commute, and travel.",
      "2 speed modes for gentle breezes or stronger airflow when you need it most.",
      "USB rechargeable — charges via laptop, power bank, or any USB adapter easily.",
      "Pastel pink color adds an aesthetic touch to your everyday accessories.",
      "500+ buys last month with 4.1 stars — a practical must-have for warm weather seasons.",
    ],
  },
  {
    id: 56,
    name: "Wazdorf 41L Expandable Travel Duffle Bag",
    category: "bags",
    benefit:
      "Waterproof foldable 41L nylon duffle with 5 pockets — #1 Best Seller in Travel Duffels",
    price: "₹499",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/41Bz8fQtNfL._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B0D3M1SS89?linkCode=ml1&tag=curifyystore-21",
    rating: 4.1,
    reviewCount: 2960,
    keywords: [
      "earbuds",
      "tws earbuds",
      "wireless earbuds",
      "fire boltt",
      "earphones",
      "music",
      "audio",
      "bluetooth earbuds",
    ],
    description: [
      "#1 Best Seller in Travel Duffels on Amazon India — trusted by over 1,000 buyers per month.",
      "41-liter capacity carries clothes, toiletries, gear, and essentials for a weekend trip.",
      "5 pockets including a wet/dry pocket, front zip pocket, and 2 inner compartments.",
      "Waterproof nylon material is durable, lightweight, and easy to clean.",
      "Foldable when empty — stores flat in your wardrobe until your next adventure.",
    ],
  },
  {
    id: 57,
    name: "TEKCOOL Mini Folding Umbrella with Case",
    category: "survival",
    benefit:
      "Ultra-compact UPF 50+ umbrella that fits in any bag — rain or shine protection",
    price: "₹499",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/51Y2BPFYXNL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4vcOVi4?tag=curifyystore-21",
    rating: 5.0,
    reviewCount: 77,
    keywords: [
      "earbuds",
      "wireless earbuds",
      "tws",
      "earphones",
      "music",
      "audio",
      "bluetooth earbuds",
      "goboult",
    ],
    description: [
      "Ultra-compact design weighs just 300g and fits perfectly in any bag or purse.",
      "UPF 50+ rating blocks 99% of harmful UV rays — protects against both rain and sun.",
      "Industrial-strength fiberglass frame with 6 reinforced ribs handles strong winds.",
      "Water-repellent canopy forms beads and bounces off — stay dry without waiting.",
      "Comes with a waterproof case — slides in and out easily for quick deployment.",
    ],
  },
  {
    id: 58,
    name: "TEKCOOL UV Umbrella with Carabiner Handle",
    category: "survival",
    benefit:
      "Auto open/close umbrella with carabiner clip handle — hang it anywhere, use with one hand",
    price: "₹549",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/51bEhv8GKRL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4mr2A13?tag=curifyystore-21",
    rating: 5.0,
    reviewCount: 60,
    keywords: [
      "earbuds",
      "tws earbuds",
      "wireless earbuds",
      "truke",
      "earphones",
      "music",
      "audio",
      "bluetooth earbuds",
    ],
    description: [
      "Unique carabiner clip handle lets you hang the umbrella on bags, belts, or rails easily.",
      "One-button auto open/close — works with one hand even in sudden downpours.",
      "8 strong fiberglass ribs provide excellent stability even in severe, windy weather.",
      "300T high-density fabric with Teflon waterproof coating — quick-drying with a gentle flick.",
      "40-inch diameter provides full protection and can be shared between two people.",
    ],
  },
  {
    id: 59,
    name: 'Toy Imagine LCD Writing Tablet 12"',
    category: "fun",
    benefit:
      "#1 Best Seller LCD drawing tablet for sketching, notes, and practice — one-click erase",
    price: "₹199",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/51uGqz6+ORL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4tk6lav?tag=curifyystore-21",
    rating: 3.8,
    reviewCount: 2709,
    keywords: [
      "docking station",
      "usb hub",
      "type c hub",
      "honeywell",
      "4k hdmi",
      "usb c",
      "laptop accessories",
      "hub",
    ],
    description: [
      "#1 Best Seller in Doodle & Scribbler Boards with 1K+ buys per month.",
      "LCD screen with no radiation, no glare, and no blue light — safe for extended use.",
      "One-click erase wipes the screen instantly — reusable, eco-friendly, and waste-free.",
      "Lock button prevents accidental erasure when you want to preserve drawings.",
      "Lightweight and compact — perfect for taking notes in class, drawing, and rough work.",
    ],
  },
  {
    id: 60,
    name: 'Amazon Basics 15" Rainbow LCD Writing Tablet',
    category: "fun",
    benefit:
      "Rainbow-colored LCD writing tablet with stylus — no charge needed, low-power coin battery",
    price: "₹699",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/41pW5JsZUNL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4v7W0Ac?tag=curifyystore-21",
    rating: 4.0,
    reviewCount: 1602,
    keywords: [
      "usb hub",
      "portronics",
      "4 port hub",
      "usb",
      "laptop accessories",
      "hub",
      "usb splitter",
    ],
    description: [
      "15-inch rainbow-colored LCD screen is vibrant, glare-free, and easy on the eyes.",
      "Pressure-sensitive surface provides a paper-like writing experience with the stylus.",
      "Built-in coin-cell battery requires no charging and lasts for years of daily use.",
      "Ultra-thin and lightweight body makes it the most portable writing board for students.",
      "Amazon's Choice with 700+ monthly buys — comes with a clear/lock key for convenience.",
    ],
  },
  {
    id: 61,
    name: "Maped All The Best Exam Kit 10-piece",
    category: "stationery",
    benefit:
      "Complete exam stationery kit with clipboard, geometry box, ruler, pens, pencils & more",
    price: "₹405",
    tag: "Student Favorite",
    image: "https://m.media-amazon.com/images/I/51FsGWV3A3L._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4dYz403?tag=curifyystore-21",
    rating: 3.8,
    reviewCount: 24,
    keywords: [
      "exam kit",
      "geometry box",
      "maped",
      "drawing instruments",
      "school set",
      "stationery set",
      "compass set",
    ],
    description: [
      "All-in-one exam kit with 10 items: transparent clipboard, geometry box, 30cm scale, mechanical pencil, graphite pencil, long eraser, ink eraser, canister sharpener, and magic stone.",
      "Die-casted rounder in the geometry box for precision compass work in exams.",
      "Unbreakable 30cm scale and ergonomic pens for comfortable, fatigue-free writing.",
      "Premium quality materials that work for daily and regular use throughout the school year.",
      "Everything in one box — stop worrying about finding stationery before exams.",
    ],
  },
  {
    id: 62,
    name: "Swilak A4 Mesh Zipper File Folder (Set of 2)",
    category: "stationery",
    benefit:
      "3-layer dustproof document bag with label pocket — organize notes, projects, and files",
    price: "₹416",
    tag: "Student Favorite",
    image: "https://m.media-amazon.com/images/I/51eGFVrTrNL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/3QfOx20?tag=curifyystore-21",
    rating: 4.0,
    reviewCount: 212,
    keywords: [
      "file folder",
      "document folder",
      "mesh folder",
      "a4 folder",
      "file organizer",
      "zipper folder",
      "stationery",
    ],
    description: [
      "3 separate compartments keep A4 documents, notebooks, and stationery organized by subject.",
      "Waterproof mesh and PVC material protects documents from spills, dust, and wear.",
      "Clear label pocket on each folder for easy identification — no digging through papers.",
      "Slim and lightweight with a fabric handle — slides into any backpack or suitcase easily.",
      "Set of 2 in pastel colors for color-coded organization — Amazon's Choice with 400+ buys.",
    ],
  },
  {
    id: 63,
    name: "Advanced CNS Kit for Medical Students",
    category: "student",
    benefit:
      "Complete neurological exam toolkit with reflex hammer, tuning forks, pen torch & more",
    price: "₹799",
    tag: "Student Favorite",
    image: "https://m.media-amazon.com/images/I/41vPODl7RDL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4c1dzsV?tag=curifyystore-21",
    rating: 3.7,
    reviewCount: 22,
    keywords: [
      "protractor",
      "ruler",
      "drawing ruler",
      "geometry",
      "drafting tool",
      "stationery",
      "math tools",
      "compass",
    ],
    description: [
      "Customized neurological exam kit for medical students doing CNS practicals and OSCE exams.",
      "Includes knee hammer, tuning forks, pen torch, measuring tape, cotton balls, and tongue depressor.",
      "Also contains Snellen chart, colour vision chart, thermometer, needle, salt/sugar/coffee/asafoetida containers.",
      "Comes in a transparent portable pouch for easy carrying to labs and clinical postings.",
      "Packaged for medical, paramedical, and B.Sc. students with human neurological assessment.",
    ],
  },
  {
    id: 64,
    name: "360° Protractor & Multifunctional Drawing Ruler",
    category: "stationery",
    benefit:
      "All-in-one geometry ruler set with 360° protractor and angle templates — Amazon's Choice",
    price: "₹189",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/41sL5tFX8YL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/41v5KqV?tag=curifyystore-21",
    rating: 4.3,
    reviewCount: 5350,
    keywords: [
      "selfie stick",
      "tripod",
      "selfie tripod",
      "ring light",
      "phone tripod",
      "kratos",
      "photography",
      "vlog",
    ],
    description: [
      "Combines a 360° protractor, straightedge ruler, and angle templates into one compact tool.",
      "Smooth rotating mechanism for effortless drawing of circles, arcs, and precise angles.",
      "Clear transparent plastic allows visibility of underlying work for accurate measurements.",
      "Amazon's Choice with 5,350+ reviews — trusted by students, architects, and engineers.",
      "Ideal for geometry class, technical drawing, and DIY projects — lightweight and durable.",
    ],
  },
  {
    id: 65,
    name: "Onpalm Kawaii Pencil Pouch with Push-Pull Eraser",
    category: "stationery",
    benefit:
      "Cute Panda-design canvas pencil pouch with an innovative push-pull eraser — gift-ready combo",
    price: "₹473",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/51CqH6P+3UL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/3PLa4zy?tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 85,
    keywords: [
      "medical kit",
      "cns kit",
      "nursing kit",
      "clinical kit",
      "medical student",
      "stethoscope",
      "bp apparatus",
      "health",
    ],
    description: [
      "Adorable Panda cartoon design makes this set a standout stationery pick for kids and teens.",
      "Multi-compartment canvas pouch holds pens, pencils, sharpeners, and more with ease.",
      "Innovative push-pull eraser with retract mechanism keeps the tip clean and ready.",
      "Durable canvas fabric with smooth zippers — built to withstand everyday school use.",
      "100+ buys per month — a perfect birthday or return gift for school-age kids.",
    ],
  },
  {
    id: 66,
    name: "Hansaplast Fast Aid Kit 38 Pieces",
    category: "survival",
    benefit:
      "Emergency first aid kit with gauze, antiseptic swabs, plasters & more — compact travel pouch",
    price: "₹374",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/41E9zb7WKML._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B0F4D8VRWP?linkCode=ml1&tag=curifyystore-21",
    rating: 4.3,
    reviewCount: 586,
    keywords: [
      "first aid kit",
      "aid kit",
      "bandage",
      "medical kit",
      "emergency kit",
      "hansaplast",
      "health kit",
    ],
    description: [
      "38-piece kit with everything for immediate wound care: gauze swabs, alcohol swabs, cotton pads, bandages, tape, and 5 types of Hansaplast plasters.",
      "Compact reusable pouch fits in a bag, car, drawer, or gym bag for always-ready access.",
      "Suitable for all ages — hypoallergenic options make it safe for children and adults.",
      "Amazon's Choice with 1K+ monthly buys — a trusted brand with 91% positive ratings.",
      "Lightweight and airline-friendly — an essential companion for every student and traveler.",
    ],
  },
  {
    id: 67,
    name: "Silver Shark Plastic Medicine Box",
    category: "survival",
    benefit:
      "Transparent portable medicine cabinet with detachable tray and lockable lid — home essential",
    price: "₹149",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/41ZoC7fxXsL._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B0FJ7BB73C?linkCode=ml1&tag=curifyystore-21",
    rating: 4.0,
    reviewCount: 161,
    keywords: [
      "medicine box",
      "pill organizer",
      "tablet box",
      "medicine organizer",
      "pharmacy box",
      "health",
      "pill box",
    ],
    description: [
      "Transparent lid lets you see contents at a glance without opening — saves time.",
      "Detachable inner tray and 2-compartment design organizes medicines, bandages, and tools.",
      "Durable latch seals tightly to prevent accidental spills or exposure of medicines.",
      "BPA-free, reusable plastic with an integrated carry handle for easy portability.",
      "Amazon's Choice with 700+ monthly buys — a budget-friendly home safety essential at ₹149.",
    ],
  },
  {
    id: 68,
    name: "House of Quirk Multifunctional Storage Box",
    category: "storage",
    benefit:
      "Large white plastic organizer with handle for stationery, medical tools, and desk items",
    price: "₹575",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/41o68PNFCNL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4tJT8Z5?tag=curifyystore-21",
    rating: 3.9,
    reviewCount: 72,
    keywords: [
      "writing tablet",
      "lcd tablet",
      "drawing tablet",
      "e-writer",
      "digital board",
      "kids tablet",
      "doodle board",
      "writing pad",
    ],
    description: [
      "Spacious 29.5 × 19 × 20.5 cm box holds stationery, books, medical tools, and household sundries.",
      "Convenient carry handle makes it easy to move between rooms — no permanent installation needed.",
      "Smooth wipeable surface stays clean and hygienic — great for medical or cosmetic storage.",
      "No assembly required — open out of the box and start organizing immediately.",
      "100+ buys per month from House of Quirk — a trusted home and desk organizer brand.",
    ],
  },
  {
    id: 69,
    name: "boAt Airdopes Plus 311 TWS Earbuds",
    category: "audio",
    benefit:
      "50hrs battery, glass design, ENx dual mics, ASAP charge — immersive boAt Signature Sound",
    price: "₹899",
    tag: "Trending",
    image: "https://m.media-amazon.com/images/I/41PtQWO3UQL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4cbeOpQ?tag=curifyystore-21",
    rating: 3.6,
    reviewCount: 5830,
    keywords: [
      "writing tablet",
      "lcd tablet",
      "rainbow tablet",
      "digital notepad",
      "drawing board",
      "e-writer",
      "doodle board",
    ],
    description: [
      "50 hours of total playback with ASAP Charge — 10 minutes charges 150 minutes of music.",
      "Dual ENx-powered microphones eliminate background noise for crystal-clear calls.",
      "Sleek glass design with 10mm drivers delivering boAt's signature bass-rich sound.",
      "Insta Wake N' Pair (IWP) for instant connectivity — just open the case and connect.",
      "2K+ monthly buys with 1-year warranty — a feature-packed earbud under ₹900.",
    ],
  },
  {
    id: 70,
    name: "Fire-Boltt Aero Fit TWS Earbuds",
    category: "audio",
    benefit:
      "50hrs playtime, Custom EQ app, Quad Mic ENC, 50ms gaming mode — 12 months warranty",
    price: "₹899",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/41ESJZ-YYNL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/3NE2whu?tag=curifyystore-21",
    rating: 4.0,
    reviewCount: 134,
    keywords: [
      "pencil pouch",
      "kawaii pouch",
      "cute pencil case",
      "eraser pouch",
      "stationery bag",
      "kawaii stationery",
    ],
    description: [
      "FirePods app lets you customize EQ, touch controls, and themes from your phone.",
      "Quad-mic ENC technology reduces surrounding noise for smooth calls and virtual meetings.",
      "50ms ultra-low latency mode for lag-free gaming, video streaming, and real-time audio.",
      "FireCharge fast charging gives 300 minutes of playback in just 5 minutes.",
      "Premium charging case design with a comfortable half in-ear fit — 12-month warranty.",
    ],
  },
  {
    id: 71,
    name: "GOBOULT x Mustang Torq Wireless Earbuds",
    category: "audio",
    benefit:
      "60hrs battery, Mustang-inspired design, Quad Mic ENC, 45ms gaming mode & Made in India",
    price: "₹1,799",
    tag: "Trending",
    image: "https://m.media-amazon.com/images/I/41c7-pJFCJL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4sOOclh?tag=curifyystore-21",
    rating: 4.0,
    reviewCount: 13126,
    keywords: [
      "usb hub",
      "usb c hub",
      "type c hub",
      "amkette",
      "4 port hub",
      "laptop accessories",
      "hub",
    ],
    description: [
      "GOBOULT x Mustang collaboration — iconic racing aesthetics fused with audiophile performance.",
      "60 hours total playtime with a breathing LED case — charge once, use all week.",
      "Quad Mic Zen ENC eliminates background noise during calls even in noisy environments.",
      "45ms low latency gaming mode for real-time audio sync in competitive games.",
      "Amp App for personalized EQ, touch gestures, and quick cleanup — Made in India.",
    ],
  },
  {
    id: 72,
    name: "truke Crystal Dyno TWS Earbuds",
    category: "audio",
    benefit:
      "Leather finish earbuds with 70hrs battery, 360° Spatial Audio, 40ms latency & IPX5",
    price: "₹999",
    tag: "Viral",
    image: "https://m.media-amazon.com/images/I/41yGJyXhjaL._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B0F1YCF29P?linkCode=ml1&tag=curifyystore-21",
    rating: 4.1,
    reviewCount: 1426,
    keywords: [
      "storage organizer",
      "multi purpose organizer",
      "desk organizer",
      "storage box",
      "organizer",
    ],
    description: [
      "Leather finish with 360° Spatial Audio places you in the center of your soundscape.",
      "70 hours of total playtime with rapid charging — spend more time listening, less charging.",
      "13mm Titanium drivers deliver rich bass and crisp highs for exceptional audio clarity.",
      "40ms ultra-low latency gives you a competitive edge in gaming without audio lag.",
      "IPX5 water resistance and 12-month warranty — built for active, everyday use.",
    ],
  },
  {
    id: 73,
    name: "Amazon Basics Multi-Purpose Storage Organizer 2pc",
    category: "storage",
    benefit:
      "#1 Best Seller collapsible plastic organizer with magnetic door — stackable wardrobe cabinet",
    price: "₹1,299",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/41lF6amIKpL._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B0DNW58M1T?linkCode=ml1&tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 18107,
    keywords: [
      "storage organizer",
      "2 piece organizer",
      "desk organizer",
      "storage box",
      "multi purpose",
    ],
    description: [
      "2-piece set of durable PPCP plastic organizers — each holds 33 liters for versatile storage.",
      "Secure magnetic door lock keeps contents dust-free and prevents items from shifting.",
      "Stackable and collapsible design saves space when not in use — dismantle in seconds.",
      "Works for clothes, toys, books, kitchen items, and more — perfect for any room.",
      "Lab-tested durability meeting global quality standards — 300+ monthly buys.",
    ],
  },
  {
    id: 74,
    name: "Solimo 2-Door Foldable Wardrobe 5 Racks",
    category: "storage",
    benefit:
      "Collapsible 2-door wardrobe with steel frame, 5 racks & zipper cover — hostel essential",
    price: "₹1,468",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/31xnzWxGmtL._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B07QVL49RC?linkCode=ml1&tag=curifyystore-21",
    rating: 4.1,
    reviewCount: 14223,
    keywords: [
      "wardrobe",
      "foldable wardrobe",
      "clothes storage",
      "solimo",
      "portable wardrobe",
      "closet",
    ],
    description: [
      "2-door foldable wardrobe with sturdy steel frame and corrosion-free metal parts.",
      "5 non-woven beige shelves each hold up to 10kg — spacious for a full wardrobe.",
      "Premium zippers and side pockets for small accessories — organized and accessible.",
      "Easy to assemble and move — ideal for hostel rooms, PGs, or small apartments.",
      "Amazon's Choice with 14,000+ reviews — one of India's most trusted portable wardrobes.",
    ],
  },
  {
    id: 75,
    name: "GTC 12 Shelves Collapsible Wardrobe",
    category: "storage",
    benefit:
      "12-shelf foldable almirah with clothes hanging rod — 145cm tall space-saving cupboard",
    price: "₹1,371",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/41kaSyNYjBL._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B0BN8BDTGK?linkCode=ml1&tag=curifyystore-21",
    rating: 3.6,
    reviewCount: 1308,
    keywords: [
      "wardrobe",
      "collapsible wardrobe",
      "foldable wardrobe",
      "clothes storage",
      "gtc",
      "portable wardrobe",
      "shelf wardrobe",
    ],
    description: [
      "12 shelves plus a movable hanging rod gives you ample space for both folded and hanging clothes.",
      "Non-rustable iron pipe with PP plastic connectors — built for long-term storage needs.",
      "145 × 38 × 145 cm size fits perfectly in small rooms, hostel corners, or walk-in closets.",
      "Up to 50kg weight capacity — stronger than most collapsible wardrobes in this price range.",
      "800+ monthly buys — a space-efficient wardrobe solution for students and young adults.",
    ],
  },
  {
    id: 76,
    name: "Portronics My Buddy Plus Laptop Table with Fan",
    category: "productivity",
    benefit:
      "Aluminum adjustable laptop table with built-in USB cooling fan and foldable legs",
    price: "₹1,999",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/41X3bS1kPJL._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B00BQT6LAW?linkCode=ml1&tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 22123,
    keywords: [
      "laptop table",
      "laptop stand",
      "foldable table",
      "bed table",
      "portronics",
      "laptop desk",
      "study table",
      "with fan",
    ],
    description: [
      "Built-in USB cooling fan keeps your laptop cool during long gaming or study sessions.",
      "Adjustable tilt angle and foldable legs let you set the perfect ergonomic position.",
      "52 × 30 cm aluminum surface is spacious enough for 15-inch laptops with room to spare.",
      "Amazon's Choice with 22,000+ reviews and 500+ monthly buys — India's most reviewed laptop table.",
      "1-year warranty and lightweight design — perfect for bed, sofa, office, and travel.",
    ],
  },
  {
    id: 77,
    name: "DIVIJA STORE Foldable Laptop Table with Cup Holder",
    category: "productivity",
    benefit:
      "MDF wood laptop bed table with cup holder, non-slip legs — multipurpose study table",
    price: "₹299",
    tag: "Student Favorite",
    image: "https://m.media-amazon.com/images/I/41tSN1xk7UL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/3NV5ONo?tag=curifyystore-21",
    rating: 4.0,
    reviewCount: 1720,
    keywords: [
      "laptop table",
      "foldable table",
      "bed table",
      "laptop desk",
      "cup holder table",
      "study table",
      "portable table",
    ],
    description: [
      "Made from MDF solid wood — smooth, moisture-proof, scratch-resistant, and eco-friendly.",
      "Built-in cup holder keeps your drink secure while you work, study, or watch shows.",
      "Non-slip leg pads prevent sliding on any surface — safe on beds, sofas, and floors.",
      "Folds flat for storage behind a door or under the bed — no assembly required.",
      "1K+ monthly buys at just ₹299 — the most affordable multifunctional laptop table available.",
    ],
  },
  {
    id: 78,
    name: "PRETTY KRAFTS Mesh Shower Caddy Tote Bag",
    category: "bags",
    benefit:
      "8-pocket hanging mesh shower bag for college dorms, gyms, and travel — quick-dry design",
    price: "₹262",
    tag: "Student Favorite",
    image: "https://m.media-amazon.com/images/I/41u0cEoxl2L._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B09PJ73NC8?linkCode=ml1&tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 78,
    keywords: [
      "shower bag",
      "caddy bag",
      "mesh bag",
      "bathroom bag",
      "college bag",
      "hostel bag",
      "tote bag",
    ],
    description: [
      "8 roomy pockets organize shampoo, conditioner, soap, razor, toothbrush, comb, and more.",
      "Quick-dry waterproof mesh prevents mildew and keeps everything fresh and accessible.",
      "Hangs on shower doors, hooks, or rods — hands-free and always within reach.",
      "Foldable and collapsible — fits into any locker, luggage, or gym bag when not in use.",
      "Amazon's Choice — a must-have for hostel students, gym-goers, and frequent travelers.",
    ],
  },
  {
    id: 79,
    name: "Kawn Knitted Heart Pattern Tote Bag",
    category: "bags",
    benefit:
      "Eco-friendly knitted heart-pattern cotton tote — a romantic, reusable everyday bag",
    price: "₹612",
    tag: "Trending",
    image: "https://m.media-amazon.com/images/I/41Qhdb2VB+L._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4e5COwO?tag=curifyystore-21",
    rating: 4.3,
    reviewCount: 269,
    keywords: [
      "tote bag",
      "knitted bag",
      "heart bag",
      "aesthetic bag",
      "shoulder bag",
      "cute bag",
    ],
    description: [
      "Charming heart-shaped knit pattern adds a sweet, romantic touch to any outfit.",
      "Lightweight breathable cotton — comfortable to carry even when fully loaded.",
      "Sturdy ergonomic straps provide a secure grip for daily errands or weekend outings.",
      "Eco-friendly and reusable — a sustainable alternative to plastic bags.",
      "300+ monthly buys — thoughtful gift for birthdays, Valentine's Day, or Mother's Day.",
    ],
  },
  {
    id: 80,
    name: "MAKABEE Large Mesh Beach Bag",
    category: "bags",
    benefit:
      "Holds 4-6 beach towels — reinforced ripstop mesh family beach tote with 8 pockets",
    price: "₹529",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/416DfK36EoL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4bT5t5y?tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 10,
    keywords: [
      "beach bag",
      "mesh bag",
      "large bag",
      "tote bag",
      "makabee",
      "shopping bag",
    ],
    description: [
      '17.9" × 15" × 9" — large enough for 4-6 beach towels plus water bottles and sunblock.',
      "8 outer mesh pockets plus 1 inner zip pocket keeps valuables safe and organized.",
      "Withstands up to 160 lbs with reinforced trims — lightweight at less than 1 lb.",
      "Strong ripstop mesh lets sand fall through easily — no more sand in your bag.",
      "4 convenient rings to hang keys, bottles, or caps — the ultimate beach day companion.",
    ],
  },
  {
    id: 81,
    name: "waqif Clear Hair Accessories Storage Box",
    category: "storage",
    benefit:
      "Transparent acrylic organizer for hair ties, clips, headbands, and small accessories",
    price: "₹449",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/41i5TGN8nWL._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B0FRMRTTDP?linkCode=ml1&tag=curifyystore-21",
    rating: 4.0,
    reviewCount: 5,
    keywords: [
      "hair accessories",
      "storage box",
      "hair organizer",
      "clear box",
      "jewelry box",
      "accessories box",
    ],
    description: [
      "Clear PP material lets you instantly see all your hair accessories without opening.",
      "15 × 15 × 8 cm compact size fits on any dresser, shelf, or bathroom counter.",
      "Dustproof with a press-open lid that seals securely — keeps accessories clean and tidy.",
      "Sturdy acrylic construction won't warp or break — built for long-term daily use.",
      "100+ monthly buys — works equally well for stationery, cosmetics, and jewelry storage.",
    ],
  },
  {
    id: 82,
    name: "MAKABEE Beach Nylon Mesh Tote Bag 23L",
    category: "bags",
    benefit:
      "23L foldable shoulder tote for beach, shopping, gym, and vacation — colorful and durable",
    price: "₹569",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/41gbHJFpNRL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4s4kfMV?tag=curifyystore-21",
    rating: 4.0,
    reviewCount: 22,
    keywords: [
      "beach bag",
      "mesh tote",
      "nylon bag",
      "tote bag",
      "makabee",
      "large tote",
      "23l bag",
    ],
    description: [
      "23L capacity carries towels, water bottles, glasses, toys, and all beach day essentials.",
      "Anti-tear nylon mesh — passed 400 swings with a 5kg load, built to last all summer.",
      "1 inner zip pocket and 1 outer pocket for secure, organized access to valuables.",
      "Foldable and machine washable — packs small for travel and dries quickly after beach use.",
      "Bright true colors stand out in the sun — find your bag on a crowded beach instantly.",
    ],
  },
  {
    id: 83,
    name: "HONGID Clear Mesh Organizer Bag",
    category: "bags",
    benefit:
      "Transparent mesh tote with handle for books, stationery, and documents — exam-ready",
    price: "₹249",
    tag: "Student Favorite",
    image: "https://m.media-amazon.com/images/I/41F-Mv-9X2L._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4suU2rn?tag=curifyystore-21",
    rating: 4.0,
    reviewCount: 0,
    keywords: [
      "organizer bag",
      "clear bag",
      "mesh bag",
      "transparent bag",
      "travel bag",
      "toiletry bag",
    ],
    description: [
      "See-through PVC design lets you identify contents without opening — saves time in class.",
      "Multiple mesh pockets and dividers keep notebooks, pens, and documents neatly separated.",
      "Durable mesh and PVC construction with reinforced green trim edges for long-term use.",
      "Carry handle makes it easy to move between home, classroom, and the library.",
      "Suitable for exam halls where transparent bags are required — a practical school essential.",
    ],
  },
  {
    id: 84,
    name: "PALAY Crochet Mesh Beach Tote with Flower Brooch",
    category: "bags",
    benefit:
      "Boho hollow-out knitted tote with decorative flower accent — summer aesthetic statement bag",
    price: "₹729",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/41BGVHV4uQL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4dw7XJT?tag=curifyystore-21",
    rating: 5.0,
    reviewCount: 1,
    keywords: [
      "crochet bag",
      "beach tote",
      "flower bag",
      "mesh tote",
      "palay",
      "aesthetic bag",
      "handmade bag",
    ],
    description: [
      "Hollow-out crochet pattern adds natural texture and a relaxed boho charm to any outfit.",
      "Charming flower accent elevates the look — a feminine, eye-catching accessory.",
      "Lightweight cotton linen construction is breathable and comfortable for warm weather.",
      "Spacious enough for groceries, beach towels, books, and daily essentials.",
      "Doubles as a beach bag, shopping bag, or casual handbag — versatile year-round.",
    ],
  },
  {
    id: 85,
    name: "PALAY Bow Crochet Shoulder Bag",
    category: "bags",
    benefit:
      "Coquette-aesthetic knitted shoulder bag with pink bow ornaments — cute everyday tote",
    price: "₹799",
    tag: "Trending",
    image: "https://m.media-amazon.com/images/I/41Ky+3YOFSL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/47CHvua?tag=curifyystore-21",
    rating: 4.3,
    reviewCount: 10,
    keywords: [
      "crochet bag",
      "bow bag",
      "shoulder bag",
      "aesthetic bag",
      "palay",
      "handmade bag",
      "knit bag",
    ],
    description: [
      "Hollow-out crochet design with pink bow ornaments gives a playful, coquette aesthetic.",
      "Approximately 13 × 15 inches — spacious for groceries, books, towels, and personal items.",
      "Lightweight open-top design adapts easily as a shopping bag, beach bag, or daily tote.",
      "Soft and breathable knit material stays comfortable on the shoulder all day.",
      "A sweet gift idea for fashion-forward people who love trendy accessories.",
    ],
  },
  {
    id: 86,
    name: "amazon basics Magnetic Whiteboard 1.96×1.47ft",
    category: "productivity",
    benefit:
      "Dry-erase magnetic whiteboard with pen tray, 6 magnets, 1 eraser, and 2 markers included",
    price: "₹1,139",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/41K3NmG4-jL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4e0pVEl?tag=curifyystore-21",
    rating: 4.0,
    reviewCount: 34803,
    keywords: [
      "whiteboard",
      "magnetic whiteboard",
      "dry erase board",
      "notice board",
      "mini whiteboard",
      "desk whiteboard",
    ],
    description: [
      "Magnetic dry-wipe surface — stick notes with magnets and write reminders with markers.",
      "Durable aluminium frame with pen tray keeps markers and eraser within easy reach.",
      "Includes 6 magnets, 1 eraser, and 2 dry-erase markers — ready to use right away.",
      "Wall-mountable with included kit — perfect for home, office, or study room.",
      "Amazon's Choice with 34,000+ reviews and 600+ monthly buys — 1-year limited warranty.",
    ],
  },
  {
    id: 87,
    name: "Pragati Systems Genius Magnetic Whiteboard 2×3ft",
    category: "productivity",
    benefit:
      "100% smooth resin-coated steel whiteboard with aluminium frame — no ghosting, no glare",
    price: "₹2,200",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/41QNoQ9RWSL._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B01N2MN71B?linkCode=ml1&tag=curifyystore-21",
    rating: 4.3,
    reviewCount: 12689,
    keywords: [
      "whiteboard",
      "magnetic whiteboard",
      "dry erase board",
      "office whiteboard",
      "large whiteboard",
      "notice board",
    ],
    description: [
      "Resin-coated steel surface is 100% smooth, scratch-free, and warp-free for easy writing.",
      "Magnet-friendly — attach notes, schedules, and reminders directly on the board.",
      "Zero ghosting and zero glare — every angle is readable and cleaning is effortless.",
      "Lightweight aluminium alloy 6063-T6 frame with satin anodizing for premium aesthetics.",
      "Amazon's Choice with 12,000+ reviews and built-in wall-hanging clips — 12-month warranty.",
    ],
  },
  {
    id: 88,
    name: "Funstars Magnetic Rubber Whiteboard Set of 2 A4",
    category: "productivity",
    benefit:
      "Flexible, rollable A4 magnetic whiteboard sheets that stick to any metal surface",
    price: "₹375",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/41CeV8P7lQL._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B0DHVF8N5S?linkCode=ml1&tag=curifyystore-21",
    rating: 3.9,
    reviewCount: 11,
    keywords: [
      "whiteboard",
      "a4 whiteboard",
      "rubber whiteboard",
      "magnetic whiteboard",
      "small whiteboard",
      "memo board",
    ],
    description: [
      "Set of 2 A4 rubber whiteboard sheets with magnetic backing — stick to any metal surface.",
      "Flexible and rollable for compact storage and portability — carry them anywhere.",
      "Water-resistant smooth surface wipes clean easily with the included duster.",
      "Includes 2 magnetic marker pens and 1 duster — a complete writing solution.",
      "Eco-friendly and reusable — reduces paper waste and saves money over time.",
    ],
  },
  {
    id: 89,
    name: 'Sumiko Small Dry Erase Whiteboard 11×14"',
    category: "productivity",
    benefit:
      "Portable lightweight whiteboard with marker — perfect for home, school, and study notes",
    price: "₹289",
    tag: "Student Favorite",
    image: "https://m.media-amazon.com/images/I/41hkm3c8XGL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4cl4Z9L?tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 29,
    keywords: [
      "whiteboard",
      "dry erase board",
      "small whiteboard",
      "mini whiteboard",
      "desk whiteboard",
      "sumiko",
    ],
    description: [
      "Compact 11×14 inch whiteboard with smooth, ghost-free writing surface.",
      "Comes with a dry-erase marker with eraser cap — write, erase, and repeat endlessly.",
      "Lightweight and freestanding — place on a desk, hold in hand, or lean on any surface.",
      "Suitable for students, kids, teachers, and office planners — multi-purpose utility.",
      "Amazon's Choice with 100+ monthly buys — a no-fuss portable writing board under ₹300.",
    ],
  },
  {
    id: 90,
    name: "Cubelelo Drift Infinity Cube",
    category: "fun",
    benefit:
      "Endless flip-fold fidget toy for stress, ADHD, and anxiety relief — pocket-sized fun",
    price: "₹299",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/41bS+1eIrdL._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B09QMNCWYG?linkCode=ml1&tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 850,
    keywords: [
      "infinity cube",
      "fidget cube",
      "stress toy",
      "fidget toy",
      "cube",
      "cubelelo",
      "anxiety relief",
    ],
    description: [
      "#1 Best Seller in Fidget Cubes with 200+ monthly buys — a desk toy that actually helps focus.",
      "Endless flipping and folding provides a soothing tactile feedback to calm the mind.",
      "Ideal for ADHD, anxiety, boredom, and staying mentally engaged during calls or travel.",
      "Compact pocket size — carry it to class, meetings, or anywhere you need a mental reset.",
      "Premium ABS plastic with smooth, sturdy hinges — built to withstand continuous use.",
    ],
  },
  {
    id: 91,
    name: "GIRGIT TOYS Rotobee Fidget Spinner & Skill Toy",
    category: "fun",
    benefit:
      "Multi-trick fidget spinner with dual spin mode, hidden storage — Made in India",
    price: "₹474",
    tag: "Trending",
    image: "https://m.media-amazon.com/images/I/41K9GcBt9tL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/48qZIeu?tag=curifyystore-21",
    rating: 4.0,
    reviewCount: 303,
    keywords: [
      "fidget spinner",
      "spinner",
      "stress toy",
      "fidget toy",
      "skill toy",
      "girgit",
      "rotobee",
    ],
    description: [
      "Multi-link design allows countless tricks: dual spin, one-wing rotation, and more.",
      "Improves focus, hand-eye coordination, and concentration — ideal for ADHD and autism.",
      "Hidden storage compartment adds a surprise element — great for engagement and curiosity.",
      "Pocket-friendly and durable — use it at your desk, during commutes, or study breaks.",
      "Made in India with attractive packaging — great birthday and return gift for all ages.",
    ],
  },
  {
    id: 92,
    name: "TRU TOYS Rainbow Gyro Crab Fidget Spinner",
    category: "fun",
    benefit:
      "Four-sided ninja spinner with long rotation and rainbow gyro design — EDC stress toy",
    price: "₹499",
    tag: "Trending",
    image: "https://m.media-amazon.com/images/I/51U6i3T7z2L._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B0BLDSKKWW?linkCode=ml1&tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 754,
    keywords: [
      "fidget spinner",
      "gyro spinner",
      "crab spinner",
      "rainbow spinner",
      "stress toy",
      "fidget toy",
    ],
    description: [
      "Four-sided ninja-style fidget spinner with a rainbow metallic gyro crab design — looks as cool as it spins.",
      "Ultra-quiet high-speed rotation using durable steel ball bearings — spins for a long, satisfying time.",
      "Compact EDC (everyday carry) size fits easily in any pocket, bag, or pencil case.",
      "Helps reduce stress, anxiety, and fidgeting during study sessions, exams, or long commutes.",
      "Amazon's Choice at ₹499 — a reliable, affordable stress toy for teens, students, and adults alike.",
    ],
  },
  {
    id: 93,
    name: "ANAB GI Fidget Cube Stress Reliever",
    category: "fun",
    benefit:
      "6-sided fidget cube with click, glide, flip, breathe, roll & spin — soft material",
    price: "₹399",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/41JrJGGzN+L._SL1500_.jpg",
    amazonUrl: "https://amzn.to/3PIXnoY?tag=curifyystore-21",
    rating: 3.5,
    reviewCount: 33,
    keywords: [
      "fidget cube",
      "stress cube",
      "anxiety relief",
      "fidget toy",
      "stress reliever",
      "sensory toy",
    ],
    description: [
      "6 unique features on 6 sides: Click, Glide, Flip, Breathe, Roll, and Spin.",
      "Soft material construction is gentle on fingers during extended fidgeting sessions.",
      "Helps reduce anxiety, stress, and pressure for both adults and children.",
      "Compact cube design fits comfortably in any hand — use it discreetly anywhere.",
      "50+ monthly buys — a thoughtful stress relief gift idea for kids and office workers.",
    ],
  },
  {
    id: 94,
    name: "Infinity Cube Fidget Toy Black",
    category: "fun",
    benefit:
      "Classic black infinity cube for ADHD, anxiety relief — flip, fold, and focus endlessly",
    price: "₹299",
    tag: "Trending",
    image: "https://m.media-amazon.com/images/I/41cM3bRdIFL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4sNRqWh?tag=curifyystore-21",
    rating: 3.9,
    reviewCount: 1100,
    keywords: [
      "infinity cube",
      "fidget cube",
      "stress toy",
      "fidget toy",
      "black cube",
      "anxiety relief",
    ],
    description: [
      "Classic black infinity cube with smooth, satisfying flip-and-fold motion for stress relief.",
      "Designed for ADD, ADHD, anxiety, and autism — helps channel restless energy positively.",
      "Compact and pocket-friendly — take it to class, work, or anywhere you need calm focus.",
      "100+ buys per month — a trusted, affordable fidget toy with 1,000+ community reviews.",
      "Simple, minimal design that doesn't distract others while keeping your hands busy.",
    ],
  },
  {
    id: 95,
    name: "Amkette USB-A Hub 4 Port",
    category: "tech",
    benefit:
      "Compact USB-A 4-port hub for expanding laptop ports — plug and play compatibility",
    price: "₹249",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/31EiOu3HHIL._SL1500_.jpg",
    amazonUrl:
      "https://www.amazon.in/dp/B09PNCBTSP/ref=cm_sw_r_as_gl_apa_gl_i_dl_?linkCode=ml1&tag=curifyystore-21",
    rating: 4.3,
    reviewCount: 1004,
    keywords: [
      "usb hub",
      "usb a hub",
      "4 port usb",
      "amkette",
      "laptop accessories",
      "hub",
      "usb splitter",
    ],
    description: [
      "Instantly expand your USB ports with a compact plug-and-play hub.",
      "Compatible with Windows, Mac, and Linux for universal device connectivity.",
      "Lightweight aluminum build with 1 USB 3.0 and 3 USB 2.0 ports.",
      "No driver installation needed — just plug in and start using immediately.",
      "1-year warranty — a budget-friendly connectivity upgrade for students and professionals.",
    ],
  },
  {
    id: 96,
    name: "Fashion Frill Couple Bracelets",
    category: "fashion",
    benefit:
      "Magnetic heart onyx stone bracelets for couples — black & white pair",
    price: "₹139",
    tag: "Viral",
    image: "https://m.media-amazon.com/images/I/51yOQpoxO-L._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4v7Xrid?tag=curifyystore-21",
    rating: 4.0,
    reviewCount: 741,
    keywords: [
      "bracelet",
      "couple bracelet",
      "friendship bracelet",
      "fashion frill",
      "jewelry",
      "bangles",
      "wristband",
    ],
    description: [
      "Natural onyx stone beaded bracelets with a magnetic heart connector — one black, one white.",
      "When the two bracelets come together, the half-hearts form one complete heart — a symbol of connection.",
      "Stretchable band fits all wrist sizes comfortably; the stones feel smooth and grounding to wear.",
      "400+ buys per month — a popular gifting choice for couples, best friends, and long-distance pairs.",
      "Made in India with high-quality natural stone beads — lightweight, durable, and skin-friendly.",
    ],
  },
  {
    id: 97,
    name: 'Redmi Pad 2 WiFi Tablet 11"',
    category: "tech",
    benefit:
      "2.5K display, 9000mAh battery, AI features & Dolby Atmos — best tablet under ₹20K",
    price: "₹16,999",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/51q0oBnFO5L._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4bPsg3z?tag=curifyystore-21",
    rating: 4.3,
    reviewCount: 334,
    keywords: [
      "tablet",
      "redmi pad",
      "ipad",
      "android tablet",
      "redmi",
      "xiaomi",
      "wifi tablet",
      "tab",
      "redmi tablet",
    ],
    description: [
      "2.5K Sharp & Clear Display with 90Hz refresh rate — crystal clear for classes, binge-watching, and reading.",
      "9000mAh battery delivers all-day power with 18W fast charging so you're never caught dead.",
      "AI features including Circle to Search and Gemini AI built-in for smarter studying and note-taking.",
      "Dolby Atmos with quad speakers — audio that actually feels cinematic for a budget tablet.",
      "Active stylus support (sold separately) for sketching, annotating PDFs, and precision navigation.",
    ],
  },
  {
    id: 98,
    name: "Desidiya Crystal Fairy LED Curtain Lights",
    category: "fun",
    benefit:
      "Crystal bead warm white LED curtain lights — magical ambiance for your room",
    price: "₹944",
    tag: "Trending",
    image: "https://m.media-amazon.com/images/I/71sPwJMc2jL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4vdnzZ6?tag=curifyystore-21",
    rating: 3.7,
    reviewCount: 551,
    keywords: [
      "fairy lights",
      "led lights",
      "curtain lights",
      "room decor",
      "string lights",
      "aesthetic lights",
      "crystal lights",
    ],
    description: [
      "Beautiful crystal bead LED curtain that creates a starburst, sparkling effect in any room.",
      "Warm white light (2700K) casts a cozy, golden glow — perfect for ambient bedroom lighting.",
      "Energy-efficient LEDs with a safe plastic wire housing — no shock risk, no overheating.",
      "Indoor and outdoor use: perfect for Diwali, Christmas, birthday backdrops, or everyday decor.",
      "Easy to hang, bendable copper-style wire — shape it however you want your dream room to look.",
    ],
  },
  {
    id: 99,
    name: "KHAMOSH TRADERS Purple Erasable Gel Pens (Set of 4)",
    category: "stationery",
    benefit:
      "Cute cartoon erasable gel pens with built-in eraser cap — 0.5mm fine tip, blue ink",
    price: "₹129",
    tag: "New",
    image: "https://m.media-amazon.com/images/I/51wLRJ7vJRL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/3O1A1du?tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 8,
    keywords: [
      "erasable pen",
      "gel pen",
      "purple pen",
      "pen",
      "stationery",
      "khamosh",
      "writing pen",
      "erasable",
    ],
    description: [
      "Erasable blue ink with a built-in elastic eraser cap — erase cleanly without damaging the paper.",
      "0.5mm fine tip delivers smooth, consistent lines — great for detailed notes and creative writing.",
      "Soft cartoon-themed grip reduces hand fatigue during long study or exam sessions.",
      "Click-action retractable design keeps the tip protected — no losing caps mid-study session.",
      "Amazon's Choice — set of 4 purple-themed pens, a fun stationery upgrade for any student.",
    ],
  },
  {
    id: 100,
    name: "Hauser XO 0.7mm Ball Pen (Pack of 50)",
    category: "stationery",
    benefit:
      "Sleek matte finish ballpoint pens with low-viscosity ink — ultra-smooth writing",
    price: "₹199",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/61i3pU5BcoL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4maKfoE?tag=curifyystore-21",
    rating: 4.1,
    reviewCount: 1240,
    keywords: [
      "ballpoint pen",
      "ball pen",
      "pen",
      "hauser",
      "pack of pens",
      "writing pen",
      "stationery",
      "bulk pens",
    ],
    description: [
      "0.7mm ultra-durable tip with low-viscosity ink writes smoothly without skipping or smearing.",
      "Sleek matte finish solid body with minimalistic design — looks premium, writes even better.",
      "Available in blue, black, and red ink — a practical pack that covers all exam and classwork needs.",
      "Designed in Germany, built for Indian students — long-lasting and reliable for daily use.",
      "Pack of 50 pens — enough to last you the entire semester and share with friends.",
    ],
  },
  {
    id: 101,
    name: "Venzina Couple Necklace Sun & Moon (2 Pcs)",
    category: "fashion",
    benefit:
      "Magnetic sun & moon pendant necklaces that project 'I love you' in 100 languages",
    price: "₹269",
    tag: "Viral",
    image: "https://m.media-amazon.com/images/I/61UdmDdKECL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/3O78UOa?tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 86,
    keywords: [
      "necklace",
      "couple necklace",
      "sun moon necklace",
      "venzina",
      "jewelry",
      "pendant",
      "friendship necklace",
    ],
    description: [
      "Magnetic sun and moon pendants that connect together — symbolizing warmth and calming love.",
      "Using your phone's flashlight, the pendant projects 'I love you' in 100 different languages.",
      "Rhinestone-studded sun pendant with a delicate hollow crescent moon — elegant and meaningful.",
      "100+ buys per month — a best-seller gifted for birthdays, Valentine's Day, and anniversaries.",
      "Comes as a set of 2 — perfect for couples or best friends who want to share something special.",
    ],
  },
  {
    id: 102,
    name: "ascension Heart Shape Cushion Pillow",
    category: "fun",
    benefit:
      "Soft plush heart-shaped cushion — the sweetest gift for your person",
    price: "₹132",
    tag: "Trending",
    image: "https://m.media-amazon.com/images/I/61YeEKMX6BL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4cjqVSN?tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 397,
    keywords: [
      "cushion",
      "pillow",
      "heart pillow",
      "soft cushion",
      "room decor",
      "heart cushion",
      "cute pillow",
    ],
    description: [
      "Amazon's Choice heart-shaped cushion in a rich multicolor fur cover — soft, plush, and huggable.",
      '12"×12" size is the perfect lap-cuddle size for bedtime, study breaks, or room decor.',
      "Machine washable in cold water — easy to keep clean and fresh looking.",
      "Makes an ideal Valentine's Day, birthday, or 'just because' gift for someone you love.",
      "100+ buys per month at under ₹135 — the most affordable way to make someone smile.",
    ],
  },
  {
    id: 103,
    name: "Fashion Frill Jhumka Earrings Combo (Set of 4)",
    category: "fashion",
    benefit:
      "4 pairs of multicolor oxidised traditional jhumki earrings — for every outfit",
    price: "₹169",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/71tQMJ6WNsL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4bU1Wny?tag=curifyystore-21",
    rating: 4.2,
    reviewCount: 320,
    keywords: [
      "earrings",
      "jhumka",
      "combo earrings",
      "fashion frill",
      "jewelry",
      "gold earrings",
      "ethnic earrings",
    ],
    description: [
      "Combo of 4 pairs of multicolor oxidised jhumki earrings — one set for every mood and occasion.",
      "Traditional Indian design with sparkling color and intricate detailing — party, college, or festive wear.",
      "Made from high-quality brass — lightweight, lead-free, nickel-free, and skin-friendly.",
      "300+ buys per month — a top-rated fashion pick that works with kurtas, jeans, or ethnic outfits.",
      "Comes in an elegant ready-to-gift box — makes a thoughtful birthday or friendship gift.",
    ],
  },
  {
    id: 104,
    name: "The Purple Tree Amber Glass Vase",
    category: "fun",
    benefit:
      "Tapered amber glass vase for home decor — adds warmth to any room or shelf",
    price: "₹289",
    tag: "Student Favorite",
    image: "https://m.media-amazon.com/images/I/51xqYfDC+IL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4e1kIw1?tag=curifyystore-21",
    rating: 4.1,
    reviewCount: 1135,
    keywords: [
      "vase",
      "glass vase",
      "amber vase",
      "room decor",
      "flower vase",
      "purple tree",
      "desk decor",
    ],
    description: [
      "Luster amber glass vase with a tapered round shape — warm, earthy, and Instagram-worthy.",
      "21cm × 8cm size is perfect for a study desk, shelf, or center table — not too big, not too small.",
      "Works beautifully with dried flowers, pampas grass, or just as a standalone decorative piece.",
      "1,135+ reviews with 4.1 stars — one of the best-reviewed home decor vases on Amazon India.",
      "A great housewarming, hostel move-in, or dorm room gift under ₹300.",
    ],
  },
  {
    id: 105,
    name: "Yellow Chimes BFF Heart Necklace (3 Pcs)",
    category: "fashion",
    benefit:
      "3-piece best friends forever heart necklace set — one heart split into 3",
    price: "₹194",
    tag: "Viral",
    image: "https://m.media-amazon.com/images/I/61tFAEX0Z0L._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4sioF2Z?tag=curifyystore-21",
    rating: 3.8,
    reviewCount: 4363,
    keywords: [
      "necklace",
      "bff necklace",
      "heart necklace",
      "yellow chimes",
      "jewelry",
      "friendship necklace",
      "bestie necklace",
    ],
    description: [
      "One heart split into 3 perfectly fitting pendant pieces — the ultimate BFF necklace set.",
      "Each pendant fits onto a delicate silver chain — wear separately and let your bond speak.",
      "4,363+ reviews — the most reviewed best-friend necklace set on Amazon India.",
      "Arrives in a Yellow Chimes gift box — ready to wrap and give with no extra effort.",
      "Silver tone finish that pairs with any outfit — casual, ethnic, or formal.",
    ],
  },
  {
    id: 106,
    name: "Shining Diva 6 Pairs Hoop & Stud Earrings (Gold)",
    category: "fashion",
    benefit:
      "6-pair combo of gold hoop and crystal stud earrings — 5-layer micro gold plating",
    price: "₹294",
    tag: "Best Seller",
    image: "https://m.media-amazon.com/images/I/61WG-k3NecL._SL1500_.jpg",
    amazonUrl: "https://amzn.to/4drQ0fq?tag=curifyystore-21",
    rating: 3.9,
    reviewCount: 629,
    keywords: [
      "earrings",
      "hoop earrings",
      "stud earrings",
      "combo earrings",
      "shining diva",
      "jewelry",
      "gold earrings",
      "set of earrings",
    ],
    description: [
      "6 pairs in one pack — a mix of hoop earrings and crystal pearl studs for everyday styling.",
      "5-layer micro gold plating for high durability — nickel-free and lead-free per international standards.",
      "Suitable for daily wear or party outfits — versatile enough for college, dates, or weddings.",
      "Skin-friendly and comfortable — lightweight design won't tire your ears even after hours of wear.",
      "Ideal Valentine's, birthday, or festive gift — comes in an elegant box ready to give.",
    ],
  },
];

const TRENDING_PRODUCTS = PRODUCTS.filter((p) =>
  ["Viral", "Best Seller", "Trending"].includes(p.tag),
).slice(0, 6);

const GIFTS_UNDER_500 = PRODUCTS.filter(
  (p) => getPriceMin(p.price) < 500,
).slice(0, 4);

const GIFTS_UNDER_1000 = PRODUCTS.filter(
  (p) => getPriceMin(p.price) < 1000 && getPriceMin(p.price) >= 500,
).slice(0, 4);

const TAG_STYLES: Record<string, string> = {
  Viral: "bg-[oklch(0.79_0.10_291)] text-[oklch(0.3_0.12_291)]",
  "Best Seller": "bg-[oklch(0.91_0.07_90)] text-[oklch(0.4_0.09_90)]",
  "Student Favorite": "bg-[oklch(0.85_0.07_291)] text-[oklch(0.35_0.10_291)]",
  Trending: "bg-[oklch(0.85_0.07_291)] text-[oklch(0.35_0.10_291)]",
  New: "bg-[oklch(0.88_0.04_72)] text-[oklch(0.4_0.05_72)]",
};

const CATEGORIES_DATA = [
  {
    key: "all" as const,
    label: "Trending & Viral",
    icon: Flame,
    desc: "Everyone's talking about these",
    color: "bg-[oklch(0.90_0.06_20)]",
  },
  {
    key: "stationery" as const,
    label: "Stationery & Writing",
    icon: BookOpen,
    desc: "Notebooks, pens, planners & more",
    color: "bg-[oklch(0.88_0.06_291)]",
  },
  {
    key: "student" as const,
    label: "Student Must-Haves",
    icon: ShoppingBag,
    desc: "Everything a student needs",
    color: "bg-[oklch(0.91_0.07_90)]",
  },
  {
    key: "tech" as const,
    label: "Budget Tech Gadgets",
    icon: Cpu,
    desc: "Smart tech, student prices",
    color: "bg-[oklch(0.85_0.05_240)]",
  },
  {
    key: "electrical" as const,
    label: "Electrical & Lighting",
    icon: Zap,
    desc: "Lamps, chargers, fans & coolers",
    color: "bg-[oklch(0.87_0.08_60)]",
  },
  {
    key: "audio" as const,
    label: "Audio & Sound",
    icon: Music,
    desc: "Earbuds, headphones & speakers",
    color: "bg-[oklch(0.88_0.07_320)]",
  },
  {
    key: "storage" as const,
    label: "Storage & Organisation",
    icon: Box,
    desc: "Desk organizers, cable & wardrobe",
    color: "bg-[oklch(0.88_0.04_72)]",
  },
  {
    key: "bags" as const,
    label: "Bags & Carry",
    icon: Backpack,
    desc: "Totes, duffles, mesh & beach bags",
    color: "bg-[oklch(0.87_0.05_150)]",
  },
  {
    key: "fun" as const,
    label: "Gifts & Fun Finds",
    icon: Gift,
    desc: "Treat yourself or a friend",
    color: "bg-[oklch(0.87_0.06_10)]",
  },
  {
    key: "productivity" as const,
    label: "Productivity & Study",
    icon: Target,
    desc: "Timers, whiteboards & laptop tables",
    color: "bg-[oklch(0.87_0.06_180)]",
  },
  {
    key: "survival" as const,
    label: "Everyday Survival",
    icon: Heart,
    desc: "Medical kits, umbrellas & essentials",
    color: "bg-[oklch(0.88_0.05_140)]",
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatReviews(n: number): string {
  return n.toLocaleString("en-IN");
}

function getPriceMin(price: string): number {
  return Number.parseInt(price.replace(/[₹,]/g, ""), 10);
}

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const arr = [...products];
  switch (sort) {
    case "best-rated":
      return arr.sort((a, b) => b.rating - a.rating);
    case "most-reviewed":
      return arr.sort((a, b) => b.reviewCount - a.reviewCount);
    case "price-low":
      return arr.sort((a, b) => getPriceMin(a.price) - getPriceMin(b.price));
    case "price-high":
      return arr.sort((a, b) => getPriceMin(b.price) - getPriceMin(a.price));
    default:
      return arr;
  }
}

// ─── Scroll Reveal Hook ───────────────────────────────────────────────────────

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    const elements = document.querySelectorAll(".reveal");
    for (const el of elements) observer.observe(el);

    return () => observer.disconnect();
  });
}

// ─── Star Rating ─────────────────────────────────────────────────────────────

function StarRating({
  rating,
  reviewCount,
}: { rating: number; reviewCount: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      <span className="flex items-center gap-0.5">
        {Array.from({ length: 5 }, (_, i) => i).map((i) => (
          <Star
            key={`star-pos-${i}`}
            size={11}
            className={
              i < full
                ? "fill-[oklch(0.78_0.15_85)] text-[oklch(0.78_0.15_85)]"
                : i === full && half
                  ? "fill-[oklch(0.78_0.15_85)]/50 text-[oklch(0.78_0.15_85)]"
                  : "fill-none text-[oklch(0.75_0.05_85)]"
            }
          />
        ))}
      </span>
      <span className="text-[11px] font-bold text-[oklch(0.55_0.05_85)]">
        {rating}
      </span>
      <span className="text-[10px] text-muted-foreground">
        ({formatReviews(reviewCount)})
      </span>
    </div>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────

function makeImageFallback(name: string, _category: string): string {
  const AI_IMAGES: Record<string, string> = {
    "Cello Puro Steel-X Benz 900ml":
      "/assets/generated/product-cello-benz-bottle.dim_400x300.jpg",
    "Perch Zenith 1L Vacuum Flask":
      "/assets/generated/product-perch-zenith-bottle.dim_400x300.jpg",
    "Pexpo Amaze 940ml Thermos":
      "/assets/generated/product-pexpo-amaze-bottle.dim_400x300.jpg",
    "Classmate Pulse 6 Subject Spiral Notebook":
      "/assets/generated/product-classmate-pulse-notebook.dim_400x300.jpg",
    "Luxor 5 Subject Single Ruled Notebook":
      "/assets/generated/product-5-luxor-notebook-transparent.dim_600x600.png",
    "KALP 2026 Dated Planner Kit":
      "/assets/generated/product-6-kalp-planner-transparent.dim_600x600.png",
    "House of Quirk 1200ML Stainless Steel Tumbler":
      "/assets/generated/product-house-of-quirk-tumbler.dim_400x300.jpg",
    "BURRDOFF Insulated Tumbler with Bear Straw Cover":
      "/assets/generated/product-bear-tumbler.dim_400x400.jpg",
    "Nestasia PickSip40 Tumbler with Straw & Top Handle":
      "/assets/generated/product-nestasia-picksip40-tumbler.dim_400x300.jpg",
    "The Umbrella Store Anti Hero Glass Tumbler":
      "/assets/generated/product-10-antihero-glass-tumbler-v2-transparent.dim_600x600.png",
    "Sunchhaya Book Stand & Laptop Stand":
      "/assets/generated/product-11-sunchhaya-book-laptop-stand-v2.dim_600x600.png",
    "APPUCOCO Adjustable Metal Bookend with Pen Holder":
      "/assets/generated/product-bookend-pen.dim_400x400.jpg",
    "Metal Book Stand - Portable Cookbook & Study Holder":
      "/assets/generated/product-cookbook-stand.dim_400x400.jpg",
    "Metawood Superman Bookend":
      "/assets/generated/product-superman-bookend.dim_400x400.jpg",
    "Canvas 3-Layer Pencil Pouch":
      "/assets/generated/product-canvas-pencil-case.dim_400x400.jpg",
    "GadgetBite Hard Shell Pen Case":
      "/assets/generated/product-16-gadgetbite-pen-case-transparent.dim_600x600.png",
    "Supreme Deals Canvas Pencil Case":
      "/assets/generated/product-supreme-deals-pencil-case-transparent.dim_400x400.png",
    "Aesthetic Grid Journal Notebook":
      "/assets/generated/product-18-aesthetic-grid-journal-v2.dim_600x600.png",
    "boAt Rockerz 411 Wireless Headphones":
      "/assets/generated/product-boat-411.dim_400x400.jpg",
    "pTron Studio Pro Headphones":
      "/assets/generated/product-ptron-headphones.dim_400x400.jpg",
    "Post-it Super Sticky Notes (Neon)":
      "/assets/generated/product-postit-neon.dim_400x400.jpg",
    "boAt Rockerz 113 Neckband":
      "/assets/generated/product-boat-neckband.dim_400x400.jpg",
    "Magnetic Cable Clips Organizer":
      "/assets/generated/product-cable-clips.dim_400x400.jpg",
    "DME Pastel Sticky Notes Set":
      "/assets/generated/product-pastel-sticky.dim_400x400.jpg",
    "MeeTo Mini Travel Sewing Kit":
      "/assets/generated/product-sewing-kit.dim_400x400.jpg",
    "Retractable Gel Pen Set":
      "/assets/generated/product-27-retractable-gel-pen-set-v2.dim_600x600.png",
    "Macaron Sticky Notes (400 Sheets)":
      "/assets/generated/product-macaron-sticky.dim_400x400.jpg",
    "WeCool T1 Mobile Stand for Desk":
      "/assets/generated/product-phone-stand.dim_400x400.jpg",
    "Soko Cable Management Box with Mobile Stand":
      "/assets/generated/product-cable-box.dim_400x400.jpg",
    "Picozon Magnetic Cable Clip Organizer (Pack of 6)":
      "/assets/generated/product-picozon-clips.dim_400x400.jpg",
    "DR VAKU Unity 15W Fast Wireless Charger":
      "/assets/generated/product-wireless-charger.dim_400x400.jpg",
    "Deskart Pen Holder with Clock & Infinity Calendar":
      "/assets/generated/product-pen-clock-holder.dim_400x400.jpg",
    "Amazon Basics Desk Organiser 7 Compartments (Pack of 2)":
      "/assets/generated/product-desk-organizer.dim_400x400.jpg",
    "UCRAVO Desk Organiser with 5 Compartments & 2 Drawers":
      "/assets/generated/product-desk-drawer.dim_400x400.jpg",
    "Fujifilm Instax Mini Link 3 Smartphone Printer":
      "/assets/generated/product-instax-printer.dim_400x400.jpg",
    "Epson PictureMate PM-520 Compact Photo Printer":
      "/assets/generated/product-37-epson-pm520-transparent.dim_600x600.png",
    "SEZNIK Mini Portable Thermal Pocket Printer":
      "/assets/generated/product-38-seznik-thermal-printer-v2.dim_600x600.png",
    "One94Store LED Desk Lamp with Touch Sensor":
      "/assets/generated/product-led-desk-lamp.dim_400x400.jpg",
    "WEIRD WOLF Rechargeable Study Table Lamp":
      "/assets/generated/product-study-lamp.dim_400x400.jpg",
    "Dayalu Double Head Desk Lamp with Fan & Display":
      "/assets/generated/product-lamp-fan.dim_400x400.jpg",
    "eo Digital Magnetic Timer with Whiteboard":
      "/assets/generated/product-digital-timer.dim_400x400.jpg",
    "Milgeo Gravity Pomodoro Timer":
      "/assets/generated/product-pomodoro-timer.dim_400x400.jpg",
    "Amkette USB-C Hub 4 Port":
      "/assets/generated/product-usbc-hub.dim_400x400.jpg",
    "Honeywell 7-in-1 TypeC Docking Station 4K HDMI":
      "/assets/generated/product-docking-station.dim_400x400.jpg",
    "Portronics Mport 4D USB Hub":
      "/assets/generated/product-usb-hub.dim_400x400.jpg",
    "HOME CUBE 7-Compartment Cable Organizer Box":
      "/assets/generated/product-cable-org-box.dim_400x400.jpg",
    "Neomate Cable Management Box":
      "/assets/generated/product-neomate-box.dim_400x400.jpg",
    "Bowiemall Reusable Cable Ties 20pcs":
      "/assets/generated/product-cable-ties.dim_400x400.jpg",
    "Portronics SoundDrum P 20W Bluetooth Speaker":
      "/assets/generated/product-bt-speaker.dim_400x400.jpg",
    "pTron Fusion Tunes 10W Speaker with Karaoke Mic":
      "/assets/generated/product-karaoke-speaker.dim_400x400.jpg",
    'Kratos K9 Selfie Stick Tripod with Light 67"':
      "/assets/generated/product-selfie-stick.dim_400x400.jpg",
    "One94Store Handheld Rechargeable Fan":
      "/assets/generated/product-handheld-fan.dim_400x400.jpg",
    "Gaiatop Mini Handheld Folding Fan":
      "/assets/generated/product-folding-fan.dim_400x400.jpg",
    "Wazdorf 41L Expandable Travel Duffle Bag":
      "/assets/generated/product-duffle-bag.dim_400x400.jpg",
    "TEKCOOL Mini Folding Umbrella with Case":
      "/assets/generated/product-compact-umbrella.dim_400x400.jpg",
    "TEKCOOL UV Umbrella with Carabiner Handle":
      "/assets/generated/product-uv-umbrella.dim_400x400.jpg",
    'Toy Imagine LCD Writing Tablet 12"':
      "/assets/generated/product-lcd-tablet.dim_400x400.jpg",
    'Amazon Basics 15" Rainbow LCD Writing Tablet':
      "/assets/generated/product-rainbow-tablet.dim_400x400.jpg",
    "Maped All The Best Exam Kit 10-piece":
      "/assets/generated/product-exam-kit.dim_400x400.jpg",
    "Swilak A4 Mesh Zipper File Folder (Set of 2)":
      "/assets/generated/product-file-folder.dim_400x400.jpg",
    "Advanced CNS Kit for Medical Students":
      "/assets/generated/product-cns-kit.dim_400x400.jpg",
    "360° Protractor & Multifunctional Drawing Ruler":
      "/assets/generated/product-protractor-ruler.dim_400x400.jpg",
    "Onpalm Kawaii Pencil Pouch with Push-Pull Eraser":
      "/assets/generated/product-kawaii-pouch.dim_400x400.jpg",
    "Hansaplast Fast Aid Kit 38 Pieces":
      "/assets/generated/product-first-aid-kit.dim_400x400.jpg",
    "Silver Shark Plastic Medicine Box":
      "/assets/generated/product-medicine-box.dim_400x400.jpg",
    "House of Quirk Multifunctional Storage Box":
      "/assets/generated/product-storage-box.dim_400x400.jpg",
    "boAt Airdopes Plus 311 TWS Earbuds":
      "/assets/generated/product-boat-earbuds.dim_400x400.jpg",
    "Fire-Boltt Aero Fit TWS Earbuds":
      "/assets/generated/product-fireboltt-earbuds.dim_400x400.jpg",
    "GOBOULT x Mustang Torq Wireless Earbuds":
      "/assets/generated/product-goboult-earbuds.dim_400x400.jpg",
    "truke Crystal Dyno TWS Earbuds":
      "/assets/generated/product-truke-earbuds.dim_400x400.jpg",
    "Amazon Basics Multi-Purpose Storage Organizer 2pc":
      "/assets/generated/product-storage-organizer.dim_400x400.jpg",
    "Solimo 2-Door Foldable Wardrobe 5 Racks":
      "/assets/generated/product-foldable-wardrobe.dim_400x400.jpg",
    "GTC 12 Shelves Collapsible Wardrobe":
      "/assets/generated/product-collapsible-wardrobe.dim_400x400.jpg",
    "Portronics My Buddy Plus Laptop Table with Fan":
      "/assets/generated/product-laptop-table.dim_400x400.jpg",
    "DIVIJA STORE Foldable Laptop Table with Cup Holder":
      "/assets/generated/product-laptop-bed-desk.dim_400x400.jpg",
    "PRETTY KRAFTS Mesh Shower Caddy Tote Bag":
      "/assets/generated/product-shower-caddy.dim_400x400.jpg",
    "Kawn Knitted Heart Pattern Tote Bag":
      "/assets/generated/product-heart-tote.dim_400x400.jpg",
    "MAKABEE Large Mesh Beach Bag":
      "/assets/generated/product-mesh-beach-bag.dim_400x400.jpg",
    "waqif Clear Hair Accessories Storage Box":
      "/assets/generated/product-hair-storage.dim_400x400.jpg",
    "MAKABEE Beach Nylon Mesh Tote Bag 23L":
      "/assets/generated/product-nylon-tote.dim_400x400.jpg",
    "HONGID Clear Mesh Organizer Bag":
      "/assets/generated/product-clear-mesh-bag.dim_400x400.jpg",
    "PALAY Crochet Mesh Beach Tote with Flower Brooch":
      "/assets/generated/product-crochet-tote.dim_400x400.jpg",
    "PALAY Bow Crochet Shoulder Bag":
      "/assets/generated/product-bow-crochet-bag.dim_400x400.jpg",
    "amazon basics Magnetic Whiteboard 1.96×1.47ft":
      "/assets/generated/product-whiteboard-small.dim_400x400.jpg",
    "Pragati Systems Genius Magnetic Whiteboard 2×3ft":
      "/assets/generated/product-whiteboard-large.dim_400x400.jpg",
    "Funstars Magnetic Rubber Whiteboard Set of 2 A4":
      "/assets/generated/product-rubber-whiteboard.dim_400x400.jpg",
    'Sumiko Small Dry Erase Whiteboard 11×14"':
      "/assets/generated/product-mini-whiteboard.dim_400x400.jpg",
    "Cubelelo Drift Infinity Cube":
      "/assets/generated/product-infinity-cube.dim_400x400.jpg",
    "GIRGIT TOYS Rotobee Fidget Spinner & Skill Toy":
      "/assets/generated/product-rotobee-spinner.dim_400x400.jpg",
    "TRU TOYS Rainbow Gyro Crab Fidget Spinner":
      "/assets/generated/product-92-rainbow-gyro-crab-fidget-v2.dim_600x600.png",
    "ANAB GI Fidget Cube Stress Reliever":
      "/assets/generated/product-fidget-cube.dim_400x400.jpg",
    "Infinity Cube Fidget Toy Black":
      "/assets/generated/product-black-infinity-cube.dim_400x400.jpg",
    "Amkette USB-A Hub 4 Port":
      "/assets/generated/product-usba-hub.dim_400x400.jpg",
    "Fashion Frill Couple Bracelets":
      "/assets/generated/product-couple-bracelets.dim_400x400.jpg",
    'Redmi Pad 2 WiFi Tablet 11"':
      "/assets/generated/product-redmi-pad2-tablet.dim_400x400.jpg",
    "Desidiya Crystal Fairy LED Curtain Lights":
      "/assets/generated/product-crystal-fairy-lights.dim_400x400.jpg",
    "KHAMOSH TRADERS Purple Erasable Gel Pens (Set of 4)":
      "/assets/generated/product-purple-erasable-pens.dim_400x400.jpg",
    "Hauser XO 0.7mm Ball Pen (Pack of 50)":
      "/assets/generated/product-hauser-xo-ballpens.dim_400x400.jpg",
    "Venzina Couple Necklace Sun & Moon (2 Pcs)":
      "/assets/generated/product-sun-moon-necklace.dim_400x400.jpg",
    "ascension Heart Shape Cushion Pillow":
      "/assets/generated/product-heart-cushion-pillow.dim_400x400.jpg",
    "Fashion Frill Jhumka Earrings Combo (Set of 4)":
      "/assets/generated/product-jhumka-earrings-set.dim_400x400.jpg",
    "The Purple Tree Amber Glass Vase":
      "/assets/generated/product-amber-glass-vase.dim_400x400.jpg",
    "Yellow Chimes BFF Heart Necklace (3 Pcs)":
      "/assets/generated/product-bff-heart-necklace.dim_400x400.jpg",
    "Shining Diva 6 Pairs Hoop & Stud Earrings (Gold)":
      "/assets/generated/product-hoop-stud-earrings.dim_400x400.jpg",
  };
  return (
    AI_IMAGES[name] ??
    "/assets/generated/product-desk-organizer.dim_400x400.jpg"
  );
}

function ProductCard({
  product,
  index,
  isWishlisted,
  onWishlistToggle,
  onViewDetail,
}: {
  product: Product;
  index: number;
  isWishlisted: boolean;
  onWishlistToggle: (id: number) => void;
  onViewDetail: (id: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    window.location.hash = `#product-${product.id}`;
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`reveal reveal-delay-${Math.min((index % 4) + 1, 6)} group bg-card border border-border rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 flex flex-col`}
      data-ocid={`product.item.${index + 1}`}
    >
      <div className="relative overflow-hidden aspect-[4/3]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
          crossOrigin="anonymous"
          onError={(e) => {
            (e.target as HTMLImageElement).src = makeImageFallback(
              product.name,
              product.category,
            );
          }}
        />
        <div className="absolute top-3 left-3">
          <span
            className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TAG_STYLES[product.tag]}`}
          >
            {product.tag}
          </span>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onWishlistToggle(product.id);
          }}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-sm hover:scale-110 transition-transform duration-200"
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          data-ocid={`product.toggle.${index + 1}`}
        >
          <Heart
            size={15}
            className={
              isWishlisted
                ? "fill-red-500 text-red-500"
                : "text-muted-foreground"
            }
          />
        </button>
        {/* Quick View button on hover */}
        <button
          type="button"
          onClick={() => onViewDetail(product.id)}
          className="absolute inset-x-0 bottom-0 py-2 bg-black/60 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-1"
          data-ocid={`product.open_modal_button.${index + 1}`}
        >
          <ExternalLink size={12} /> Quick View
        </button>
      </div>
      <div className="p-4 flex flex-col flex-1 gap-2">
        <h3 className="font-semibold text-[15px] text-foreground leading-snug">
          {product.name}
        </h3>
        <p className="text-xs italic text-rose-400 leading-snug -mt-0.5">
          {product.benefit}
        </p>
        <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        {product.description && (
          <div className="flex-1">
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="text-[10px] font-semibold text-[oklch(0.52_0.12_291)] hover:text-[oklch(0.42_0.12_291)] transition-colors duration-150 flex items-center gap-0.5 mt-0.5"
            >
              {expanded ? "Show less ▲" : "Read more ▼"}
            </button>
            {expanded && (
              <ul className="mt-1.5 space-y-0.5 list-disc list-inside pl-0.5">
                {product.description.map((line) => (
                  <li
                    key={line}
                    className="text-[10px] text-muted-foreground leading-relaxed"
                  >
                    {line}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <div className="flex items-center justify-between mt-2 gap-2">
          <span className="font-bold text-sm text-foreground flex-shrink-0">
            {product.price}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={handleShare}
              className="flex items-center gap-1 text-[9px] font-semibold text-muted-foreground hover:text-lavender transition-colors px-1.5 py-1 rounded-lg hover:bg-lavender/10"
              title="Copy shareable link"
              data-ocid={`product.share_button.${index + 1}`}
            >
              {copied ? (
                <span className="text-[oklch(0.52_0.12_163)] text-[9px] font-bold">
                  ✓ Copied!
                </span>
              ) : (
                <Share2 size={11} />
              )}
            </button>
            <span className="text-[9px] font-bold text-[oklch(0.55_0.08_40)] bg-[oklch(0.93_0.04_40)] px-1.5 py-0.5 rounded-md uppercase tracking-wide flex-shrink-0">
              Amazon
            </span>
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`product.buy_button.${index + 1}`}
            >
              <Button
                size="sm"
                className="bg-deep-purple hover:bg-deep-purple/90 text-white rounded-xl text-xs px-4 h-8 font-semibold transition-all duration-200 hover:scale-105"
              >
                bring it home ♡
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Product Detail Modal ─────────────────────────────────────────────────────

function ProductModal({
  productId,
  onClose,
}: {
  productId: number | null;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const product =
    productId !== null ? PRODUCTS.find((p) => p.id === productId) : null;

  const handleShare = () => {
    window.location.hash = `#product-${productId}`;
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClose = () => {
    window.location.hash = "";
    onClose();
  };

  useEffect(() => {
    if (!product) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  if (!product) return null;

  return (
    <Dialog
      open={productId !== null}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <DialogContent
        className="max-w-lg w-full p-0 overflow-hidden rounded-3xl border-border"
        data-ocid="product.modal"
      >
        {/* Image */}
        <div className="relative w-full aspect-[4/3] bg-[oklch(0.95_0.02_84)] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain"
            referrerPolicy="no-referrer"
            crossOrigin="anonymous"
            onError={(e) => {
              (e.target as HTMLImageElement).src = makeImageFallback(
                product.name,
                product.category,
              );
            }}
          />
          <div className="absolute top-4 left-4">
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TAG_STYLES[product.tag]}`}
            >
              {product.tag}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-3 max-h-[60vh] overflow-y-auto">
          <h2 className="font-bold text-lg text-foreground leading-snug">
            {product.name}
          </h2>
          <div className="flex items-center gap-3">
            <StarRating
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
            <span className="font-extrabold text-base text-foreground">
              {product.price}
            </span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {product.benefit}
          </p>

          {product.description.length > 0 && (
            <ul className="space-y-1.5 mt-1">
              {product.description.map((line) => (
                <li
                  key={line}
                  className="flex items-start gap-2 text-sm text-muted-foreground leading-relaxed"
                >
                  <span className="mt-0.5 w-4 h-4 flex-shrink-0 rounded-full bg-lavender/15 text-lavender flex items-center justify-center text-[9px] font-bold">
                    ✓
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          )}

          <div className="flex items-center gap-3 mt-2 pt-4 border-t border-border">
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
              data-ocid="product.modal.buy_button"
            >
              <Button className="w-full bg-deep-purple hover:bg-deep-purple/90 text-white rounded-xl font-semibold h-11 flex items-center gap-2">
                <ExternalLink size={15} />
                bring it home ♡
              </Button>
            </a>
            <Button
              type="button"
              variant="outline"
              className="h-11 px-4 rounded-xl flex items-center gap-2 border-lavender/30 hover:bg-lavender/10 text-lavender font-semibold"
              onClick={handleShare}
              data-ocid="product.modal.share_button"
            >
              {copied ? (
                <span className="text-xs text-[oklch(0.52_0.12_163)]">
                  ✓ Copied!
                </span>
              ) : (
                <>
                  <Share2 size={14} />
                  <span className="text-xs">Share</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [sortBy, setSortBy] = useState<SortOption>("best-rated");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [wishlist, setWishlist] = useState<Set<number>>(
    () =>
      new Set<number>(JSON.parse(localStorage.getItem("sf-wishlist") || "[]")),
  );
  const [wishlistOnly, setWishlistOnly] = useState(false);
  const [openProductId, setOpenProductId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const featuredRef = useRef<HTMLDivElement>(null);

  useScrollReveal();

  // Hash-based product linking
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#product-(\d+)$/);
      if (match) {
        setOpenProductId(Number(match[1]));
      } else {
        setOpenProductId(null);
      }
    };
    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const toggleWishlist = (id: number) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem("sf-wishlist", JSON.stringify([...next]));
      return next;
    });
  };

  const baseProducts =
    activeFilter === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === activeFilter);

  const afterWishlist = wishlistOnly
    ? baseProducts.filter((p) => wishlist.has(p.id))
    : baseProducts;

  const searchLower = searchQuery.trim().toLowerCase();

  // When searching, search ALL products regardless of category filter
  const searchBase = searchLower
    ? wishlistOnly
      ? PRODUCTS.filter((p) => wishlist.has(p.id))
      : PRODUCTS
    : afterWishlist;

  const afterSearch = searchLower
    ? searchBase.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.keywords.some((k) => k.toLowerCase().includes(searchLower)),
      )
    : afterWishlist;
  const filteredProducts = sortProducts(afterSearch, sortBy);

  const scrollToFeatured = () => {
    featuredRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Categories", href: "#categories" },
    { label: "Trending", href: "#trending" },
    { label: "Gifts", href: "#gifts" },
    { label: "Why Us", href: "#why" },
  ];

  return (
    <div
      className="min-h-screen bg-background font-sans"
      style={{
        background:
          "linear-gradient(160deg, oklch(0.962 0.022 163) 0%, oklch(0.953 0.019 84) 35%, oklch(0.952 0.030 40) 70%, oklch(0.958 0.016 72) 100%)",
      }}
    >
      {/* ── Header ─────────────────────────────────────────── */}
      <header
        className="sticky top-0 z-50 backdrop-blur-sm border-b-2 border-lavender/30"
        style={{ backgroundColor: "oklch(0.975 0.018 163 / 0.95)" }}
      >
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <a href="#home" className="flex-shrink-0" data-ocid="nav.link">
            <span
              className="font-display text-lavender text-2xl font-bold tracking-tight"
              style={{ letterSpacing: "-0.01em" }}
            >
              curify ♡
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button
              onClick={scrollToFeatured}
              className="hidden sm:flex bg-lavender hover:bg-lavender/90 text-white text-sm font-semibold rounded-xl px-5 h-9"
              data-ocid="nav.primary_button"
            >
              explore ♡
            </Button>
            <button
              type="button"
              onClick={() => {
                setWishlistOnly((v) => !v);
                scrollToFeatured();
              }}
              className="flex items-center gap-1.5 bg-white/80 border border-border shadow-sm rounded-full px-3 py-1.5 text-sm font-semibold hover:bg-red-50 transition-colors duration-200"
              data-ocid="wishlist.toggle"
              title={wishlistOnly ? "Show all products" : "Show saved items"}
            >
              <Heart
                size={15}
                className={
                  wishlist.size > 0
                    ? "fill-red-500 text-red-500"
                    : "text-muted-foreground"
                }
              />
              {wishlist.size > 0 && (
                <span className="text-red-500 text-xs font-bold">
                  {wishlist.size}
                </span>
              )}
            </button>
            <button
              type="button"
              className="md:hidden p-2 rounded-lg text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="block py-2.5 text-sm font-medium text-foreground border-b border-border/50 last:border-0"
                onClick={() => setMobileMenuOpen(false)}
                data-ocid="nav.link"
              >
                {link.label}
              </a>
            ))}
            <Button
              onClick={() => {
                scrollToFeatured();
                setMobileMenuOpen(false);
              }}
              className="mt-3 w-full bg-lavender hover:bg-lavender/90 text-white font-semibold rounded-xl"
              data-ocid="nav.primary_button"
            >
              explore ♡
            </Button>
          </div>
        )}
      </header>

      <main>
        {/* ── Hero ───────────────────────────────────────────── */}
        <section id="home" className="py-12 sm:py-16 px-4 sm:px-6">
          <div className="max-w-[1200px] mx-auto">
            <div className="bg-card border border-border rounded-3xl shadow-hero overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-8 sm:p-12 flex flex-col justify-center gap-6">
                  <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
                    for those who
                    <br />
                    <span className="text-lavender">feel everything</span>{" "}
                    <span className="text-2xl">♡</span>
                  </h1>
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-md">
                    a curated space for soft moments, quiet rituals, and the
                    people who matter most
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={scrollToFeatured}
                      className="bg-lavender hover:bg-lavender/90 text-white font-bold rounded-2xl px-10 h-14 text-base shadow-[0_8px_32px_oklch(0.6_0.19_293/0.45)] transition-all hover:scale-105 hover:shadow-[0_12px_40px_oklch(0.6_0.19_293/0.55)]"
                      data-ocid="hero.primary_button"
                    >
                      explore softly ♡
                    </Button>
                    <a href="#trending">
                      <Button
                        variant="outline"
                        className="h-14 px-6 rounded-2xl text-sm font-medium border-lavender/30 text-lavender/70 hover:bg-lavender/10 hover:text-lavender"
                        data-ocid="hero.secondary_button"
                      >
                        See What's Trending
                      </Button>
                    </a>
                  </div>
                  <div className="flex items-center gap-6 pt-2">
                    <div className="text-center">
                      <div className="text-xl font-extrabold text-foreground">
                        {PRODUCTS.length}+
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Curated Items
                      </div>
                    </div>
                    <div className="h-8 w-px bg-border" />
                    <div className="text-center">
                      <div className="text-xl font-extrabold text-foreground">
                        ₹129+
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Starting Price
                      </div>
                    </div>
                    <div className="h-8 w-px bg-border" />
                    <div className="text-center">
                      <div className="text-xl font-extrabold text-foreground">
                        100%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Student Tested
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative overflow-hidden min-h-[280px] md:min-h-[420px]">
                  <img
                    src="/assets/generated/hero-student.dim_800x500.jpg"
                    alt="Student desk setup"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-card/10" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Brand Feeling ─────────────────────────────────── */}
        <section className="py-10 px-4 sm:px-6">
          <div className="max-w-[760px] mx-auto text-center reveal">
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed font-light italic">
              "slow down. notice the small things. the morning light, the warmth
              of your favourite mug, the right pen for a good day. we believe in
              romanticizing every quiet ritual — and finding the little objects
              that make ordinary moments feel like yours."
            </p>
            <span className="block mt-4 text-lavender text-sm font-semibold tracking-widest uppercase">
              — curify ♡
            </span>
          </div>
        </section>

        {/* ── Categories ─────────────────────────────────────── */}
        <section
          id="categories"
          className="py-12 sm:py-16 px-4 sm:px-6 bg-mint-light"
        >
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10 reveal">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
                for your soft days ♡
              </h2>
              <p className="text-foreground/80 text-base max-w-xl mx-auto font-semibold">
                everything you need, sorted by feeling
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {CATEGORIES_DATA.map((cat, i) => (
                <button
                  type="button"
                  key={cat.key}
                  onClick={() => {
                    setActiveFilter(cat.key);
                    setWishlistOnly(false);
                    featuredRef.current?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`reveal reveal-delay-${i + 1} group flex flex-col items-center gap-3 p-5 rounded-2xl border border-border bg-card shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 cursor-pointer text-center`}
                  data-ocid={`categories.item.${i + 1}`}
                >
                  <div
                    className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 duration-300`}
                  >
                    <cat.icon size={22} className="text-foreground/70" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-foreground leading-snug">
                      {cat.label}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-0.5 leading-tight hidden sm:block">
                      {cat.desc}
                    </div>
                  </div>
                  <span className="text-lavender text-xs font-semibold flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore <ChevronRight size={12} />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ── Featured Products ───────────────────────────────── */}
        <section
          id="featured"
          ref={featuredRef}
          className="py-12 sm:py-16 px-4 sm:px-6 bg-peach"
        >
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-8 reveal">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
                {wishlistOnly ? "❤️ Your Saved Items" : "finds for you"}
              </h2>
              <p className="text-muted-foreground text-base max-w-xl mx-auto">
                {wishlistOnly
                  ? `${wishlist.size} item${wishlist.size !== 1 ? "s" : ""} saved — all links go directly to Amazon`
                  : "no useless stuff. only what actually helps."}
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative mb-4">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-10 rounded-xl border-border bg-card text-sm"
              />
            </div>

            {/* Filter Tabs + Sort */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div
                className="flex items-center gap-2 flex-wrap"
                data-ocid="product.filter.tab"
              >
                {(
                  [
                    "all",
                    "stationery",
                    "student",
                    "tech",
                    "electrical",
                    "audio",
                    "storage",
                    "bags",
                    "productivity",
                    "fun",
                    "survival",
                    "fashion",
                  ] as Category[]
                ).map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => {
                      setActiveFilter(cat);
                      setWishlistOnly(false);
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 capitalize ${
                      activeFilter === cat && !wishlistOnly
                        ? "bg-lavender text-white shadow-md"
                        : "bg-card border border-border text-muted-foreground hover:border-lavender/50 hover:text-foreground"
                    }`}
                    data-ocid="filter.tab"
                  >
                    {cat === "all"
                      ? "All Products"
                      : cat === "stationery"
                        ? "Stationery"
                        : cat === "electrical"
                          ? "Electrical"
                          : cat === "audio"
                            ? "Audio"
                            : cat === "storage"
                              ? "Storage"
                              : cat === "bags"
                                ? "Bags"
                                : cat === "productivity"
                                  ? "Productivity"
                                  : cat === "survival"
                                    ? "Survival"
                                    : cat.charAt(0).toUpperCase() +
                                      cat.slice(1)}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-muted-foreground font-medium whitespace-nowrap">
                  Sort by:
                </span>
                <Select
                  value={sortBy}
                  onValueChange={(v) => setSortBy(v as SortOption)}
                >
                  <SelectTrigger
                    className="w-44 h-9 text-sm rounded-xl border-border"
                    data-ocid="product.select"
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="best-rated">⭐ Best Rated</SelectItem>
                    <SelectItem value="most-reviewed">
                      🔥 Most Reviewed
                    </SelectItem>
                    <SelectItem value="price-low">
                      💰 Price: Low → High
                    </SelectItem>
                    <SelectItem value="price-high">
                      💎 Price: High → Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Empty Wishlist State */}
            {wishlistOnly && filteredProducts.length === 0 && (
              <div
                className="text-center py-20 text-muted-foreground"
                data-ocid="product.empty_state"
              >
                <Heart
                  size={40}
                  className="mx-auto mb-4 text-muted-foreground/40"
                />
                <p className="font-semibold text-base">No saved items yet</p>
                <p className="text-sm mt-1">
                  Tap the heart on any product to save it here
                </p>
                <Button
                  onClick={() => setWishlistOnly(false)}
                  className="mt-4 bg-lavender text-white rounded-xl"
                >
                  Browse All Products
                </Button>
              </div>
            )}

            {/* Search No-Results State */}
            {filteredProducts.length === 0 && searchQuery.trim() && (
              <div className="col-span-full text-center py-16">
                <div className="text-4xl mb-4">🔍</div>
                <p className="text-lg font-semibold text-foreground mb-2">
                  No products found
                </p>
                <p className="text-muted-foreground text-sm">
                  Try searching for "headphones", "bottle", "lamp", "bag",
                  "speaker", or any product keyword
                </p>
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="mt-4 text-sm text-lavender underline underline-offset-2"
                >
                  Clear search
                </button>
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {filteredProducts.map((product, i) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={i}
                    isWishlisted={wishlist.has(product.id)}
                    onWishlistToggle={toggleWishlist}
                    onViewDetail={setOpenProductId}
                  />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── Why These Products ─────────────────────────────── */}
        <section id="why" className="py-12 sm:py-16 px-4 sm:px-6 bg-mint">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10 reveal">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
                Why These Products?
              </h2>
              <p className="text-muted-foreground text-base max-w-xl mx-auto">
                Every item is thoughtfully chosen with the student in mind.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  icon: CheckCircle,
                  color: "text-lavender bg-lavender/10",
                  title: "Makes Life Easier",
                  desc: "Every item solves a real problem you face daily as a student.",
                },
                {
                  icon: Star,
                  color: "text-[oklch(0.7_0.15_90)] bg-[oklch(0.91_0.07_90)]",
                  title: "Student-Friendly Prices",
                  desc: "Starting from ₹129 — no need to break the bank to upgrade your life.",
                },
                {
                  icon: Sparkles,
                  color:
                    "text-[oklch(0.55_0.12_291)] bg-[oklch(0.88_0.06_291)]",
                  title: "Aesthetic & Trendy",
                  desc: "Looks great on your desk and your feed. Pinterest-worthy every time.",
                },
                {
                  icon: Heart,
                  color: "text-[oklch(0.6_0.2_20)] bg-[oklch(0.90_0.06_20)]",
                  title: "Practical Daily Use",
                  desc: "These aren't impulse buys. You'll reach for them every single day.",
                },
              ].map((item, i) => (
                <div
                  key={item.title}
                  className={`reveal reveal-delay-${i + 1} bg-card border border-border rounded-2xl p-6 shadow-card flex flex-col items-start gap-4`}
                  data-ocid={`why.item.${i + 1}`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}
                  >
                    <item.icon size={22} />
                  </div>
                  <div>
                    <h3 className="font-bold text-base text-foreground mb-1.5">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Trending ───────────────────────────────────────── */}
        <section
          id="trending"
          className="py-12 sm:py-16 px-4 sm:px-6 bg-pastel-beige"
        >
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-center justify-between mb-8 reveal">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Flame size={18} className="text-[oklch(0.65_0.2_20)]" />
                  <span className="text-sm font-semibold text-[oklch(0.65_0.2_20)] uppercase tracking-widest">
                    Hot Right Now
                  </span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
                  Most Popular Right Now
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  setActiveFilter("all");
                  setWishlistOnly(false);
                  featuredRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hidden sm:flex items-center gap-1 text-sm font-semibold text-lavender hover:text-lavender/80 transition-colors"
                data-ocid="trending.secondary_button"
              >
                View All <ChevronRight size={16} />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {TRENDING_PRODUCTS.map((product, i) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={i}
                  isWishlisted={wishlist.has(product.id)}
                  onWishlistToggle={toggleWishlist}
                  onViewDetail={setOpenProductId}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── Gifts ──────────────────────────────────────────── */}
        <section
          id="gifts"
          className="py-12 sm:py-16 px-4 sm:px-6 bg-peach-light"
        >
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-10 reveal">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground mb-3">
                Perfect Gift Ideas 🎁
              </h2>
              <p className="text-muted-foreground text-base max-w-xl mx-auto">
                Thoughtful, aesthetic, and under budget — because the best gifts
                are practical too.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Under ₹500 */}
              <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card reveal">
                <div className="p-6 border-b border-border flex items-center gap-3">
                  <div className="w-10 h-10 bg-[oklch(0.91_0.07_90)] rounded-xl flex items-center justify-center">
                    <Gift size={18} className="text-[oklch(0.5_0.1_90)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-foreground">
                      Under ₹500
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      Budget-friendly picks that still feel premium
                    </p>
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {GIFTS_UNDER_500.map((item, i) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 hover:bg-background/60 transition-colors"
                      data-ocid={`gifts.item.${i + 1}`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            makeImageFallback(item.name, item.category);
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-foreground">
                          {item.name}
                        </div>
                        <StarRating
                          rating={item.rating}
                          reviewCount={item.reviewCount}
                        />
                        <div className="font-bold text-xs text-foreground mt-0.5">
                          {item.price}
                        </div>
                      </div>
                      <a
                        href={item.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button
                          size="sm"
                          className="bg-deep-purple hover:bg-deep-purple/90 text-white rounded-xl text-xs px-3 h-7 font-semibold"
                          data-ocid={`gifts.buy_button.${i + 1}`}
                        >
                          Buy
                        </Button>
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Under ₹1000 + Image */}
              <div className="flex flex-col gap-4">
                <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-card reveal reveal-delay-2">
                  <div className="p-6 border-b border-border flex items-center gap-3">
                    <div className="w-10 h-10 bg-lavender/15 rounded-xl flex items-center justify-center">
                      <Gift size={18} className="text-lavender" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-foreground">
                        Under ₹1000
                      </h3>
                      <p className="text-xs text-muted-foreground">
                        A little more love, still totally worth it
                      </p>
                    </div>
                  </div>
                  <div className="divide-y divide-border">
                    {GIFTS_UNDER_1000.map((item, i) => (
                      <div
                        key={item.id}
                        className="flex items-center gap-4 p-4 hover:bg-background/60 transition-colors"
                        data-ocid={`gifts.item.${i + 5}`}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-14 h-14 rounded-xl object-cover flex-shrink-0"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              makeImageFallback(item.name, item.category);
                          }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-sm text-foreground">
                            {item.name}
                          </div>
                          <StarRating
                            rating={item.rating}
                            reviewCount={item.reviewCount}
                          />
                          <div className="font-bold text-xs text-foreground mt-0.5">
                            {item.price}
                          </div>
                        </div>
                        <a
                          href={item.amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            size="sm"
                            className="bg-deep-purple hover:bg-deep-purple/90 text-white rounded-xl text-xs px-3 h-7 font-semibold"
                            data-ocid={`gifts.buy_button.${i + 5}`}
                          >
                            Buy
                          </Button>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-card reveal reveal-delay-3 aspect-video">
                  <img
                    src="/assets/generated/gifts-section.dim_600x400.jpg"
                    alt="Gift ideas"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ────────────────────────────────────────────── */}
        <section className="py-16 sm:py-20 px-4 sm:px-6 bg-mint-light">
          <div className="max-w-[1200px] mx-auto">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[oklch(0.73_0.115_293)] to-[oklch(0.525_0.188_292)] p-12 sm:p-16 text-center shadow-hero reveal">
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              <div className="relative z-10">
                <h2 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                  Upgrade Your Everyday Life
                </h2>
                <p className="text-white/80 text-base sm:text-lg max-w-xl mx-auto mb-8">
                  Stop scrolling. Start discovering. Every item on curify ♡ is
                  here because it genuinely makes student life better.
                </p>
                <Button
                  onClick={scrollToFeatured}
                  className="bg-white text-[oklch(0.525_0.188_292)] hover:bg-white/90 font-extrabold text-base rounded-2xl px-10 h-14 shadow-lg hover:scale-105 transition-all duration-200"
                  data-ocid="cta.primary_button"
                >
                  explore softly ♡
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Product Detail Modal ────────────────────────────── */}
      <ProductModal
        productId={openProductId}
        onClose={() => setOpenProductId(null)}
      />

      {/* ── Footer ─────────────────────────────────────────── */}
      <footer className="pt-12 pb-6 px-4 sm:px-6 bg-mint">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
            <div>
              <span className="font-display text-2xl font-semibold text-lavender block mb-3">
                curify ♡
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                A curated collection of smart, aesthetic, and affordable
                products for students and young adults. Because you deserve
                things that actually work.
              </p>
              <p className="text-xs text-muted-foreground mt-4 italic">
                More social links coming soon ♡
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm text-foreground uppercase tracking-widest mb-4">
                Categories
              </h4>
              <ul className="space-y-2">
                {[
                  "Stationery & Writing",
                  "Student Must-Haves",
                  "Budget Tech",
                  "Electrical & Lighting",
                  "Audio & Sound",
                  "Storage & Organisation",
                  "Bags & Carry",
                  "Gifts & Fun",
                  "Productivity & Study",
                  "Everyday Survival",
                  "Fashion & Accessories",
                ].map((cat) => (
                  <li key={cat}>
                    <a
                      href="#categories"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      data-ocid="footer.link"
                    >
                      {cat}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-sm text-foreground uppercase tracking-widest mb-4">
                Connect
              </h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Social links coming soon ♡
              </p>
              <p className="text-sm text-muted-foreground mt-3">
                <a
                  href="mailto:hello@smartfinds.in"
                  className="hover:text-foreground transition-colors underline"
                  data-ocid="footer.link"
                >
                  Email Us
                </a>
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm text-foreground uppercase tracking-widest mb-4">
                Affiliate Disclosure
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                As an Amazon Associate, we earn from qualifying purchases. All
                links are Amazon affiliate links. This is at no extra cost to
                you — all recommendations are based on genuine usefulness and
                student value.
              </p>
              <Badge className="mt-3 bg-lavender/15 text-lavender border-lavender/20 text-xs">
                #ad · Amazon Affiliate
              </Badge>
            </div>
          </div>

          <div className="border-t border-lavender/20 pt-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>
              © {new Date().getFullYear()} curify ♡. Curated with ❤️ for
              students.
            </span>
            <span>
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lavender hover:underline font-medium"
                data-ocid="footer.link"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
