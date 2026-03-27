"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  bikeBrands,
  brands,
  categories,
  products,
  vehicleData,
  categoryHierarchy,
  type Product,
  type ProductCategory,
  type CategoryNode,
} from "./data";
import {
  ArrowRightIcon,
  CartIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  FacebookIcon,
  FilterIcon,
  HeartIcon,
  InstagramIcon,
  MenuIcon,
  SearchIcon,
  StarIcon,
  TwitterIcon,
  UserIcon,
  YoutubeIcon,
} from "./icons";
import NavbarSearch from "./navbar-search";
import {
  Header,
  Footer,
  Drawer,
  CollapsibleSection,
  MobileMenuFilters,
  CartDrawerContent,
  ProductRating
} from "./layout-components";

type CartItem = Product & { quantity: number };
type CategoryFilter = "all" | ProductCategory;



type StorefrontProps = {
  initialCategory?: string;
  initialSearch?: string;
  make?: string;
  model?: string;
  year?: string;
  engine?: string;
};

export default function Storefront({
  initialCategory = "all",
  initialSearch = "",
  make = "",
  model = "",
  year = "",
  engine = "",
}: StorefrontProps) {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>(
    initialCategory === "brakes" ||
      initialCategory === "engine" ||
      initialCategory === "transmission" ||
      initialCategory === "suspension" ||
      initialCategory === "electrical" ||
      initialCategory === "wheels"
      ? initialCategory
      : "all",
  );
  const [search, setSearch] = useState(initialSearch);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({ "brakes-root": true });
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedMake, setSelectedMake] = useState(make);
  const [selectedModel, setSelectedModel] = useState(model);
  const [selectedYear, setSelectedYear] = useState(year);
  const [selectedBikeBrand, setSelectedBikeBrand] = useState<"all" | Product["bikeBrand"]>("all");
  const [selectedSupplierBrand, setSelectedSupplierBrand] = useState("all");
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(true);
  const [isBikeBrandsExpanded, setIsBikeBrandsExpanded] = useState(true);
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(true);
  const [mobileBikeBrandOpen, setMobileBikeBrandOpen] = useState(false);
  const [mobileSupplierBrandOpen, setMobileSupplierBrandOpen] = useState(false);
  const [mobileOffersOpen, setMobileOffersOpen] = useState(false);
 
  // Load initial state from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem("wm-cart");
    const savedWishlist = localStorage.getItem("wm-wishlist");
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem("wm-cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wm-wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const supplierBrands = useMemo(
    () => Array.from(new Set(products.map((product) => product.brand))).sort(),
    [],
  );

  const filteredProducts = useMemo(() => {
    const q = search.toLowerCase();
    return products.filter((product) => {
      const matchesCategory =
        activeFilter === "all" ? true : product.category === activeFilter;
      const matchesSubCategory =
        !activeSubCategory || product.subCategory === activeSubCategory;
      const matchesBikeBrand =
        selectedBikeBrand === "all" || product.bikeBrand === selectedBikeBrand;
      const matchesSupplierBrand =
        selectedSupplierBrand === "all" || product.brand === selectedSupplierBrand;
      const matchesSearch =
        q.length === 0 ||
        product.title.toLowerCase().includes(q) ||
        product.category.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.partNumber.toLowerCase().includes(q) ||
        product.oemNumber.toLowerCase().includes(q);

      return (
        matchesCategory &&
        matchesSubCategory &&
        matchesBikeBrand &&
        matchesSupplierBrand &&
        matchesSearch
      );
    });
  }, [activeFilter, activeSubCategory, search, selectedBikeBrand, selectedSupplierBrand]);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const currentMakeData = selectedMake
    ? (vehicleData[selectedMake as keyof typeof vehicleData] as unknown as {
        models: Record<string, { years: readonly string[]; engines: readonly string[] }>;
      })
    : null;
  const currentModelData =
    currentMakeData && selectedModel ? currentMakeData.models[selectedModel] : null;
  const availableModels = currentMakeData ? Object.keys(currentMakeData.models) : [];
  const availableYears = currentModelData ? currentModelData.years : [];
  const selectedVehicleSummary = [selectedMake, selectedModel, selectedYear]
    .filter(Boolean)
    .join(" / ");

  const applyFinderFilters = () => {
    const params = new URLSearchParams();
    if (selectedMake) params.set("make", selectedMake);
    if (selectedModel) params.set("model", selectedModel);
    if (selectedYear) params.set("year", selectedYear);

    router.push(params.toString() ? `/finder?${params.toString()}` : "/finder");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);

    onScroll();
    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const addToCart = (product: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (!existing) {
        return [...current, { ...product, quantity: 1 }];
      }

      return current.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
      );
    });
    setCartOpen(true);
  };

  const addToWishlist = (product: Product) => {
    setWishlist((current) =>
      current.some((item) => item.id === product.id) ? current : [...current, product],
    );
    setWishlistOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-700">
      <Header
        transparent={!scrolled}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenCart={() => setCartOpen(true)}
        onToggleMenu={() => setMobileMenuOpen((value) => !value)}
        cartCount={totalItems}
        wishlistCount={wishlist.length}
        search={search}
        setSearch={setSearch}
      />

      <main className="relative">
        {/* ── Product Finder Hero ── */}
        <section id="home" className="relative overflow-hidden bg-slate-950">
          <img
            src="/hero-motorbike-bg.png"
            alt=""
            className="absolute inset-0 h-full w-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
          <div className="relative mx-auto flex max-w-[1400px] flex-col items-start justify-center px-4 pb-50 pt-40 sm:pb-40 lg:min-h-[600px] lg:px-6 lg:pb-36 lg:pt-30">
            
            <h1
              className="max-w-2xl font-heading text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.6rem]"
              style={{ animation: "fade-in-up .6s .15s ease both" }}
            >
              Find Parts for{" "}
              <span className="bg-gradient-to-r from-[#dc2626] to-[#f87171] bg-clip-text text-transparent">
                Your Bike
              </span>
            </h1>
            <p
              className="mt-5 max-w-lg text-lg leading-relaxed text-slate-300"
              style={{ animation: "fade-in-up .6s .3s ease both" }}
            >
              Select your motorbike to find the exact OEM and aftermarket parts that fit guaranteed compatibility.
            </p>

            <div
              className="mt-10 flex flex-wrap items-center gap-8 text-sm text-slate-400"
              style={{ animation: "fade-in-up .6s .6s ease both" }}
            >
              {[
                { value: "1000+", label: "Products" },
                { value: "20+", label: "Top Brands" },
                { value: "Easy", label: "Returns" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-2">
                  <span className="text-xl font-extrabold text-white">{stat.value}</span>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 w-full mb-[-100px]">
              <h2 className="mx-auto  font-heading text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Product <span className="bg-gradient-to-r from-[#dc2626] to-[#f87171] bg-clip-text text-transparent">Finder</span>
              </h2>
            </div>
          </div>

          {/* ── Vehicle Finder Form (Transparent Bar at Bottom) ── */}
          <div
            className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-slate-950/40 py-4 backdrop-blur-xl sm:py-6"
            style={{ animation: "fade-in-up 1s .6s ease both" }}
          >
            <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
              <div className="flex flex-col gap-3 sm:gap-4 lg:flex-row lg:items-center lg:gap-6">
                <div className="grid flex-1 gap-3 sm:grid-cols-3 lg:gap-4">
                  {/* Make */}
                  <div className="relative">
                    <select
                      value={selectedMake}
                      onChange={(e) => {
                        setSelectedMake(e.target.value);
                        setSelectedModel("");
                        setSelectedYear("");
                      }}
                      className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-bold text-white outline-none transition hover:bg-white/10 focus:ring-2 focus:ring-[#dc2626]/40"
                    >
                      <option value="" className="bg-slate-900">Select Make</option>
                      {Object.keys(vehicleData).map((m) => (
                        <option key={m} value={m} className="bg-slate-900">{m}</option>
                      ))}
                    </select>
                    <ChevronDownIcon size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50" />
                  </div>

                  {/* Model */}
                  <div className="relative">
                    <select
                      value={selectedModel}
                      onChange={(e) => {
                        setSelectedModel(e.target.value);
                        setSelectedYear("");
                      }}
                      disabled={!selectedMake}
                      className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-bold text-white outline-none transition enabled:hover:bg-white/10 disabled:opacity-30 focus:ring-2 focus:ring-[#dc2626]/40"
                    >
                      <option value="" className="bg-slate-900">Select Model</option>
                      {availableModels.map((m) => (
                        <option key={m} value={m} className="bg-slate-900">{m}</option>
                      ))}
                    </select>
                    <ChevronDownIcon size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50" />
                  </div>

                  {/* Year */}
                  <div className="relative">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      disabled={!selectedModel}
                      className="h-12 w-full appearance-none rounded-xl border border-white/10 bg-white/5 px-4 text-sm font-bold text-white outline-none transition enabled:hover:bg-white/10 disabled:opacity-30 focus:ring-2 focus:ring-[#dc2626]/40"
                    >
                      <option value="" className="bg-slate-900">Year</option>
                      {availableYears.map((y) => (
                        <option key={y} value={y} className="bg-slate-900">{y}</option>
                      ))}
                    </select>
                    <ChevronDownIcon size={14} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/50" />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {selectedVehicleSummary && (
                    <div className="hidden whitespace-nowrap text-xs font-bold uppercase tracking-widest text-[#fca5a5] xl:block">
                      {selectedVehicleSummary}
                    </div>
                  )}
                  <button
                    onClick={applyFinderFilters}
                    disabled={!selectedYear}
                    className="flex h-12 items-center justify-center gap-2 rounded-xl bg-[#dc2626] px-8 text-sm font-bold text-white shadow-lg transition hover:bg-[#b91c1c] disabled:bg-white/10 disabled:text-white/40 lg:px-10"
                  >
                    <SearchIcon size={18} />
                    <span>FIND PARTS</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Brand Marquee ── */}
        <section className="overflow-hidden border-b border-slate-100 bg-slate-50 py-20">
          <div className="flex min-w-max animate-[marquee_28s_linear_infinite] gap-16 px-4 text-base font-bold uppercase tracking-[0.22em] text-slate-300">
            {[...brands, ...brands].map((brand, index) => (
              <span key={`${brand}-${index}`} className="transition hover:text-[#e47231]">{brand}</span>
            ))}
          </div>
        </section>

        <section id="categories" className="bg-gradient-to-b from-slate-50 to-white py-2">
          <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
            <div className="mb-12 text-center">
              <h2 className="font-heading text-4xl font-extrabold text-slate-950">
                Browse by <span className="text-[#dc2626]">Category</span>
              </h2>
              <p className="mt-3 text-slate-500">Find the exact parts you need for your motorbike</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
              {categories.map((category) => (
                <button
                  key={category.title}
                  onClick={() => {
                    setActiveFilter(category.filter as CategoryFilter);
                    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="group overflow-hidden rounded-[28px] bg-white text-left shadow-[0_20px_50px_rgba(15,23,42,0.08)] transition hover:-translate-y-1"
                >
                  <div className="space-y-3 p-6">
                    <h3 className="font-heading text-2xl font-bold text-slate-950">{category.title}</h3>
                    <p className="text-sm text-slate-500">{category.copy}</p>
                    <span className="text-sm font-semibold text-[#dc2626]">{category.cta}</span>
                  </div>
                  <div className="bg-[radial-gradient(circle_at_top,#fee2e2,transparent_70%)] px-6 pb-6">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="h-48 w-full object-contain transition duration-300 group-hover:scale-105"
                    />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        <section id="shop" className="bg-white py-12 lg:py-16">
          <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
              {/* Sidebar — hidden on mobile, filter drawer replaces it */}
              <aside className="hidden w-full shrink-0 lg:block lg:w-[280px]">
                <div className="sticky top-28 space-y-6">
                  {/* Product Categories */}
                  <div className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm">
                    <CollapsibleSection
                      title="Product Categories"
                      isOpen={isCategoriesExpanded}
                      onToggle={() => setIsCategoriesExpanded(!isCategoriesExpanded)}
                    >
                      <ul className="space-y-4">
                        <li>
                          <label className="flex items-center gap-3 group cursor-pointer">
                            <input
                              type="checkbox"
                              checked={activeFilter === "all"}
                              onChange={() => {
                                setActiveFilter("all");
                                setActiveSubCategory(null);
                              }}
                              className="h-4 w-4 rounded border-slate-300 text-[#e47231] focus:ring-[#e47231]"
                            />
                            <span className={`text-[14px] transition ${activeFilter === "all" ? "font-bold text-slate-900" : "text-slate-600 group-hover:text-slate-900"}`}>All Products</span>
                          </label>
                        </li>
                        {categoryHierarchy.map((cat) => (
                          <li key={cat.id}>
                            <div className="flex items-center justify-between group">
                              <label className="flex items-center gap-3 cursor-pointer">
                                <input
                                  type="checkbox"
                                  checked={activeFilter === cat.filter && !activeSubCategory}
                                  onChange={() => {
                                    setActiveFilter(cat.filter);
                                    setActiveSubCategory(null);
                                  }}
                                  className="h-4 w-4 rounded border-slate-300 text-[#e47231] focus:ring-[#e47231]"
                                />
                                <span className={`text-[14px] transition ${activeFilter === cat.filter && !activeSubCategory ? "font-bold text-slate-900" : "text-slate-600 group-hover:text-slate-900"}`}>{cat.label}</span>
                              </label>
                              {cat.children && (
                                <button
                                  onClick={() => setExpandedCategories(prev => ({ ...prev, [cat.id]: !prev[cat.id] }))}
                                  className="text-slate-400 hover:text-[#e47231] transition-colors p-1"
                                >
                                  {expandedCategories[cat.id] ? "−" : "+"}
                                </button>
                              )}
                            </div>
                            {cat.children && expandedCategories[cat.id] && (
                              <ul className="mt-3 ml-7 space-y-3">
                                {cat.children.map((sub) => (
                                  <li key={sub.id}>
                                    <label className="flex items-center gap-3 group cursor-pointer">
                                      <input
                                        type="checkbox"
                                        checked={activeSubCategory === sub.label}
                                        onChange={() => {
                                          setActiveFilter(sub.filter as ProductCategory);
                                          setActiveSubCategory(sub.label);
                                        }}
                                        className="h-4 w-4 rounded border-slate-300 text-[#e47231] focus:ring-[#e47231]"
                                      />
                                      <span className={`text-[14px] transition ${activeSubCategory === sub.label ? "font-bold text-slate-900" : "text-slate-600 group-hover:text-slate-900"}`}>{sub.label}</span>
                                    </label>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </li>
                        ))}
                      </ul>
                    </CollapsibleSection>
                  </div>

                  {/* Filter by Model (using Bike Brand for now as Model) */}
                  <div className="rounded-[24px] border border-slate-100 bg-white p-6 shadow-sm">
                    <CollapsibleSection
                      title="Filter by Brand"
                      isOpen={isBikeBrandsExpanded}
                      onToggle={() => setIsBikeBrandsExpanded(!isBikeBrandsExpanded)}
                    >
                      <ul className="space-y-4">
                        {bikeBrands.map((item) => (
                          <li key={item.label} className="flex items-center justify-between">
                            <label className="flex items-center gap-3 group cursor-pointer">
                              <input
                                type="checkbox"
                                checked={selectedBikeBrand === item.slug}
                                onChange={() => setSelectedBikeBrand(prev => prev === item.slug ? "all" : item.slug)}
                                className="h-4 w-4 rounded border-slate-300 text-[#e47231] focus:ring-[#e47231]"
                              />
                              <span className={`text-[14px] transition ${selectedBikeBrand === item.slug ? "font-bold text-slate-900" : "text-slate-600 group-hover:text-slate-900"}`}>{item.label}</span>
                            </label>
                            <span className="text-[12px] text-slate-400 font-medium">{products.filter(p => p.bikeBrand === item.slug).length}</span>
                          </li>
                        ))}
                      </ul>
                    </CollapsibleSection>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
                <div className="flex-1">
                  <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
                    <div>
                      <h2 className="font-heading text-3xl font-extrabold text-slate-950 sm:text-4xl">
                        {activeFilter === "all" ? "Our Selection" : categories.find(c => c.filter === activeFilter)?.title || "Products"}
                      </h2>
                      <p className="mt-1 text-sm font-medium text-slate-500">
                        Showing <span className="text-[#dc2626] font-bold">{filteredProducts.length}</span> {filteredProducts.length === 1 ? "premium component" : "premium components"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* Mobile filter trigger */}
                      <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="group flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-bold text-slate-700 transition hover:border-[#dc2626] hover:text-[#dc2626] lg:hidden"
                      >
                        <FilterIcon size={18} className="transition-transform group-hover:rotate-12" />
                        Filters
                      </button>
                      <div className="relative">
                        <select
                          value={selectedSupplierBrand}
                          onChange={(e) => setSelectedSupplierBrand(e.target.value)}
                          className="h-12 appearance-none rounded-2xl border border-slate-200 bg-white pl-5 pr-12 text-sm font-bold text-slate-700 outline-none transition hover:border-[#dc2626] focus:ring-4 focus:ring-[#dc2626]/10"
                        >
                          <option value="all">All Product Brands</option>
                          {supplierBrands.map((b) => (
                            <option key={b} value={b}>{b}</option>
                          ))}
                        </select>
                        <ChevronDownIcon size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {filteredProducts.length === 0 ? (
                      <div className="col-span-full flex flex-col items-center rounded-3xl border-2 border-dashed border-slate-100 bg-slate-50/50 py-24 text-center">
                        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white text-slate-300 shadow-sm">
                          <SearchIcon size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">No matching parts found</h3>
                        <p className="mt-2 max-w-xs text-sm text-slate-500">
                          Try adjusting your filters or search terms. We're constantly adding new parts to our catalog.
                        </p>
                        <button
                          onClick={() => {
                            setActiveFilter("all");
                            setSearch("");
                            setSelectedBikeBrand("all");
                            setSelectedSupplierBrand("all");
                            setActiveSubCategory(null);
                          }}
                          className="mt-8 rounded-full bg-[#dc2626] px-8 py-3 text-sm font-bold text-white shadow-[0_8px_20px_-4px_rgba(220,38,38,0.4)] transition hover:bg-[#b91c1c] hover:scale-105 active:scale-95"
                        >
                          Clear all filters
                        </button>
                      </div>
                    ) : (
                      filteredProducts.map((product) => (
                        <article
                          key={product.id}
                          className="group relative flex flex-col overflow-hidden rounded-[32px] border border-slate-100 bg-white transition-all duration-500 hover:-translate-y-1 hover:border-[#dc2626]/20 hover:shadow-[0_25px_60px_-15px_rgba(15,23,42,0.12)]"
                        >
                          <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-slate-50 to-white/50 p-6">
                            {product.badge && (
                              <span className="absolute left-4 top-4 z-10 rounded-full bg-slate-950 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-white">
                                {product.badge}
                              </span>
                            )}
                            {product.oldPrice && (
                              <span className="absolute right-4 top-4 z-10 rounded-full bg-[#fa5252] px-2.5 py-1 text-[10px] font-bold text-white shadow-lg shadow-rose-500/20">
                                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                              </span>
                            )}
                            <Link href={`/sparepart/${product.id}`} className="block h-full w-full">
                              <img
                                src={product.image}
                                alt={product.title}
                                className="h-full w-full object-contain transition duration-700 group-hover:scale-110"
                              />
                            </Link>
                            <div className="absolute bottom-5 right-5 flex flex-col gap-2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                              <button
                                onClick={() => addToWishlist(product)}
                                className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-400 shadow-xl transition hover:bg-rose-500 hover:text-white"
                                aria-label="Add to wishlist"
                              >
                                <HeartIcon size={20} />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-1 flex-col p-6 pt-5">
                            <div className="mb-2">
                              <ProductRating rating={product.rating} reviews={product.reviews} />
                            </div>
                            <Link
                              href={`/sparepart/${product.id}`}
                              className="mb-1.5 line-clamp-2 font-heading text-[18px] font-bold leading-tight text-slate-950 transition hover:text-[#dc2626]"
                            >
                              {product.title}
                            </Link>
                            <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-slate-400">
                              {product.brand} · {product.partNumber}
                            </p>
                            <div className="mt-auto flex items-center justify-between pt-5 border-t border-slate-100">
                              <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-black text-slate-950">${product.price.toFixed(2)}</span>
                                {product.oldPrice && (
                                  <span className="text-sm font-medium text-slate-400 line-through">
                                    ${product.oldPrice.toFixed(2)}
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => addToCart(product)}
                                className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dc2626] text-white shadow-[0_12px_24px_-8px_rgba(220,38,38,0.5)] transition hover:bg-[#b91c1c] hover:scale-110 active:scale-95"
                                aria-label="Add to cart"
                              >
                                <CartIcon size={20} />
                              </button>
                            </div>
                          </div>
                        </article>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </section>

        {/* ── Trust Features ── */}
        <section className="border-y border-slate-100 bg-white py-14">
          <div className="mx-auto grid max-w-[1400px] gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
            {[
              { icon: "🚚", title: "Free Shipping", desc: "On orders over $99" },
              { icon: "🛡️", title: "5 Year Warranty", desc: "Hassle-free coverage" },
              { icon: "↩️", title: "Easy Returns", desc: "30-day return policy" },
              { icon: "💬", title: "Expert Support", desc: "Dedicated riders team" },
            ].map((item) => (
              <div key={item.title} className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/50 p-5 transition hover:border-[#dc2626]/30 hover:bg-[#dc2626]/5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-2xl shadow-sm">{item.icon}</span>
                <div>
                  <p className="text-sm font-bold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Campaign Banners ── */}
        <section id="campaigns" className="bg-slate-50 py-20">
          <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
            <div className="mb-10 text-center">
              <h2 className="font-heading text-3xl font-extrabold text-slate-950 sm:text-4xl">
                Featured <span className="text-[#dc2626]">Collections</span>
              </h2>
              <p className="mt-3 text-slate-500">Curated selections for performance and value</p>
            </div>
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="group relative overflow-hidden rounded-[28px]">
                <img src="/motorbike_wheel_banner.png" alt="Motorbike Wheel" className="h-[380px] w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8 ">
                  <span className="mb-4 inline-flex w-fit rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] backdrop-blur-sm text-white">
                    New Arrival
                  </span>
                  <h3 className="max-w-sm font-heading text-3xl font-extrabold lg:text-4xl text-white">Premium Alloy Wheels</h3>
                  <a href="#shop" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#dc2626] hover:text-white">
                    See Collection <ArrowRightIcon size={16} />
                  </a>
                </div>
              </div>
              <div className="group relative overflow-hidden rounded-[28px]">
                <img src="/motorbike_brakes_banner.png" alt="Brakes" className="h-[380px] w-full object-cover transition duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <span className="mb-4 inline-flex w-fit rounded-full border border-[#dc2626] bg-[#dc2626]/20 px-4 py-2 text-xs font-bold uppercase tracking-[0.24em] text-[#fca5a5] backdrop-blur-sm">
                    Sale 15%
                  </span>
                  <h3 className="max-w-sm font-heading text-3xl font-extrabold lg:text-4xl text-white">Brake & Disk Parts</h3>
                  <a href="#shop" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-slate-900 transition hover:bg-[#dc2626] hover:text-white">
                    View Offers <ArrowRightIcon size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ── Mobile Menu & Filter Drawer (Combined for Hamburger) ── */}
      <Drawer open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} title="Menu & Filters">
        <MobileMenuFilters
          onClose={() => setMobileMenuOpen(false)}
          onOpenWishlist={() => setWishlistOpen(true)}
          onOpenCart={() => setCartOpen(true)}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          activeSubCategory={activeSubCategory}
          setActiveSubCategory={setActiveSubCategory}
          selectedBikeBrand={selectedBikeBrand}
          setSelectedBikeBrand={setSelectedBikeBrand}
          selectedSupplierBrand={selectedSupplierBrand}
          setSelectedSupplierBrand={setSelectedSupplierBrand}
          expandedCategories={expandedCategories}
          setExpandedCategories={setExpandedCategories}
          mobileCategoriesOpen={mobileCategoriesOpen}
          setMobileCategoriesOpen={setMobileCategoriesOpen}
          mobileBikeBrandOpen={mobileBikeBrandOpen}
          setMobileBikeBrandOpen={setMobileBikeBrandOpen}
          mobileSupplierBrandOpen={mobileSupplierBrandOpen}
          setMobileSupplierBrandOpen={setMobileSupplierBrandOpen}
          mobileOffersOpen={mobileOffersOpen}
          setMobileOffersOpen={setMobileOffersOpen}
          productsCountByBrand={useMemo(() => {
            const counts: Record<string, number> = {};
            bikeBrands.forEach(brand => {
              counts[brand.slug] = products.filter(p => p.bikeBrand === brand.slug).length;
            });
            return counts;
          }, [])}
        />
      </Drawer>

      <Drawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} title="Your Wishlist">
        <div className="flex flex-1 flex-col overflow-y-auto p-6">
          {wishlist.length === 0 ? (
            <div className="my-auto text-center text-slate-500">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <HeartIcon size={24} />
              </div>
              <p>Your wishlist is empty.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlist.map((item) => (
                <div key={item.id} className="flex gap-4 rounded-[22px] border border-slate-200 p-4">
                  <img src={item.image} alt={item.title} className="h-20 w-20 rounded-2xl bg-slate-50 object-contain p-2" />
                  <div className="min-w-0 flex-1">
                    <p className="font-heading text-lg font-bold text-slate-950">{item.title}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                      {item.partNumber} / {item.oemNumber}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-600">${item.price.toFixed(2)}</p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => addToCart(item)}
                        className="rounded-full bg-[#dc2626] px-4 py-2 text-xs font-semibold text-white"
                      >
                        Move to Cart
                      </button>
                      <button
                        onClick={() => setWishlist((current) => current.filter((product) => product.id !== item.id))}
                        className="rounded-full bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Drawer>

      <Drawer open={cartOpen} onClose={() => setCartOpen(false)} title="Your Cart">
        <CartDrawerContent
          cart={cart}
          formatMoney={(v) => `$${v.toFixed(2)}`}
          onUpdateQuantity={(id, delta) => {
            setCart((current) =>
              current.flatMap((product) =>
                product.id === id
                  ? product.quantity + delta <= 0
                    ? []
                    : [{ ...product, quantity: product.quantity + delta }]
                  : [product],
              ),
            );
          }}
          onRemove={(id) => setCart((current) => current.filter((product) => product.id !== id))}
          totalAmount={totalAmount}
          onClose={() => setCartOpen(false)}
        />
      </Drawer>
    </div>
  );
}
