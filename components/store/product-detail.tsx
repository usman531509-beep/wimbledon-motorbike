"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { bikeBrands, categories, products, type Product } from "./data";
import {
  ArrowRightIcon,
  CartIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  CloseIcon,
  FacebookIcon,
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


/* ── ProductDetail ── */
export default function ProductDetail({ product }: { product: Product }) {
  const gallery = product.gallery?.length ? product.gallery : [product.image];
  const [activeImage, setActiveImage] = useState(gallery[0]);
  const [quantity, setQuantity] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"specs" | "fitment">("specs");

  const relatedProducts = useMemo(
    () =>
      products
        .filter((item) => item.id !== product.id && item.category === product.category)
        .slice(0, 4),
    [product.category, product.id],
  );

  const discountPercent = product.oldPrice
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
    : 0;

  const formatMoney = (v: number) => `$${v.toFixed(2)}`;
  const [activeFilter, setActiveFilter] = useState<any>("all");
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [selectedBikeBrand, setSelectedBikeBrand] = useState<string>("all");
  const [selectedSupplierBrand, setSelectedSupplierBrand] = useState<string>("all");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(true);
  const [mobileBikeBrandOpen, setMobileBikeBrandOpen] = useState(false);
  const [mobileSupplierBrandOpen, setMobileSupplierBrandOpen] = useState(false);
  const [mobileOffersOpen, setMobileOffersOpen] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  
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

  const addToCart = (p: Product, q: number = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === p.id);
      if (!existing) return [...current, { ...p, quantity: q }];
      return current.map((item) =>
        item.id === p.id ? { ...item, quantity: item.quantity + q } : item
      );
    });
    setCartOpen(true);
  };

  const addToWishlist = (p: Product) => {
    setWishlist((current) =>
      current.some((item) => item.id === p.id) ? current : [...current, p]
    );
    setWishlistOpen(true);
  };

  const onUpdateQuantity = (id: number, delta: number) => {
    setCart((current) =>
      current.flatMap((item) => {
        if (item.id === id) {
          const nextQ = item.quantity + delta;
          return nextQ > 0 ? [{ ...item, quantity: nextQ }] : [];
        }
        return [item];
      })
    );
  };

  const onRemoveCartItem = (id: number) => {
    setCart((current) => current.filter((item) => item.id !== id));
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);

  const productsCountByBrand = useMemo(() => {
    const counts: Record<string, number> = {};
    bikeBrands.forEach(brand => {
      counts[brand.slug] = products.filter(p => p.bikeBrand === brand.slug).length;
    });
    return counts;
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-700">
      <Header
        transparent={false}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onToggleMenu={() => setMobileMenuOpen((v) => !v)}
        cartCount={totalItems}
        wishlistCount={wishlist.length}
        search={search}
        setSearch={setSearch}
      />

      <main className="pt-30">
        {/* ── Breadcrumb ── */}
        <div className="border-b border-slate-100 bg-white">
          <div className="mx-auto flex max-w-[1400px] items-center gap-2 px-4 py-3 text-sm text-slate-500 lg:px-6">
            <Link href="/" className="transition hover:text-[#dc2626]">Home</Link>
            <ChevronRightIcon size={12} className="text-slate-300" />
            <Link href={`/category/${product.category}`} className="capitalize transition hover:text-[#dc2626]">{product.category}</Link>
            <ChevronRightIcon size={12} className="text-slate-300" />
            <span className="truncate font-medium text-slate-900">{product.title}</span>
          </div>
        </div>

        {/* ── Product Section ── */}
        <section className="py-8 sm:py-12 lg:py-16">
          <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-16">

              {/* ── Gallery ── */}
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-3xl bg-white p-4 shadow-sm sm:p-8">
                  {product.badge && (
                    <span className="absolute left-4 top-4 z-10 rounded-full bg-slate-950 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-white sm:left-6 sm:top-6">
                      {product.badge}
                    </span>
                  )}
                  {discountPercent > 0 && (
                    <span className="absolute right-4 top-4 z-10 rounded-full bg-[#fa5252] px-3 py-1.5 text-[10px] font-bold text-white sm:right-6 sm:top-6">
                      -{discountPercent}%
                    </span>
                  )}
                  <img
                    src={activeImage}
                    alt={product.title}
                    className="mx-auto h-64 w-full object-contain sm:h-80 md:h-96 lg:h-[440px]"
                  />
                </div>
                {gallery.length > 1 && (
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                    {gallery.map((image) => (
                      <button
                        key={image}
                        onClick={() => setActiveImage(image)}
                        className={`overflow-hidden rounded-2xl border-2 bg-white p-2 transition sm:p-3 ${
                          activeImage === image ? "border-[#dc2626] shadow-md" : "border-transparent hover:border-slate-200"
                        }`}
                      >
                        <img src={image} alt="thumbnail" className="h-16 w-full object-contain sm:h-20" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* ── Product Info ── */}
              <div className="flex flex-col gap-6">
                {/* Category + Title */}
                <div>
                  <p className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-[#dc2626]">
                    {product.category} parts
                  </p>
                  <h1 className="font-heading text-2xl font-extrabold leading-tight text-slate-950 sm:text-3xl lg:text-4xl">
                    {product.title}
                  </h1>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-3">
                  <ProductRating rating={product.rating} reviews={product.reviews} />
                </div>

                {/* Price */}
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-3xl font-black text-slate-950 sm:text-4xl">{formatMoney(product.price)}</span>
                  {product.oldPrice && (
                    <span className="text-lg text-slate-400 line-through">{formatMoney(product.oldPrice)}</span>
                  )}
                  {discountPercent > 0 && (
                    <span className="rounded-full bg-[#fee2e2] px-3 py-1.5 text-xs font-bold text-[#b91c1c]">
                      Save {discountPercent}%
                    </span>
                  )}
                </div>

                {/* Stock */}
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#fef2f2] px-4 py-2 text-sm font-semibold text-[#b91c1c]">
                  <span className="h-2 w-2 rounded-full bg-[#dc2626]" />
                  {product.stockStatus}
                </div>

                {/* Description */}
                <p className="text-[15px] leading-7 text-slate-600">{product.description}</p>

                {/* Key Info Pills */}
                <div className="flex flex-wrap gap-2">
                  <span className="rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700">
                    Brand: <span className="text-slate-950">{product.brand}</span>
                  </span>
                  <span className="rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700">
                    Part #: <span className="text-slate-950">{product.partNumber}</span>
                  </span>
                  <span className="rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700">
                    OEM #: <span className="text-slate-950">{product.oemNumber}</span>
                  </span>
                  <span className="rounded-xl bg-slate-100 px-4 py-2.5 text-xs font-bold text-slate-700">
                    SKU: <span className="text-slate-950">{product.sku}</span>
                  </span>
                </div>

                {/* Quantity + Actions */}
                <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-6">
                  <div className="flex items-center rounded-2xl bg-slate-100 p-1">
                    <button onClick={() => setQuantity((v) => Math.max(1, v - 1))} className="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold text-slate-700 transition hover:bg-white">
                      −
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-slate-950">{quantity}</span>
                    <button onClick={() => setQuantity((v) => v + 1)} className="flex h-11 w-11 items-center justify-center rounded-xl text-lg font-bold text-slate-700 transition hover:bg-white">
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => addToCart(product, quantity)}
                    className="flex items-center gap-2 rounded-2xl bg-[#dc2626] px-8 py-3.5 text-sm font-bold text-white shadow-[0_12px_24px_-8px_rgba(220,38,38,0.5)] transition hover:bg-[#b91c1c] hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <CartIcon size={18} />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => addToWishlist(product)}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500 transition hover:bg-rose-500 hover:text-white"
                    aria-label="Add to wishlist"
                  >
                    <HeartIcon size={20} />
                  </button>
                </div>

                {/* Fitment */}
                <div className="rounded-2xl border border-[#fecaca] bg-[#fef2f2] p-5">
                  <p className="mb-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#b91c1c]">Guaranteed Fitment</p>
                  <p className="text-sm text-slate-700">{product.fitment}</p>
                </div>
              </div>
            </div>

            {/* ── Tabs: Specs / Fitment ── */}
            <div className="mt-12 rounded-3xl bg-white p-5 shadow-sm sm:p-8">
              <div className="mb-6 flex gap-2 border-b border-slate-100 pb-4">
                <button
                  onClick={() => setActiveTab("specs")}
                  className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${activeTab === "specs" ? "bg-slate-950 text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}
                >
                  Specifications
                </button>
                <button
                  onClick={() => setActiveTab("fitment")}
                  className={`rounded-xl px-5 py-2.5 text-sm font-bold transition ${activeTab === "fitment" ? "bg-slate-950 text-white" : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"}`}
                >
                  Features & Fitment
                </button>
              </div>

              {activeTab === "specs" && (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {product.specs.map((spec) => (
                    <div key={spec.label} className="rounded-2xl bg-slate-50 px-5 py-4">
                      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">{spec.label}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-900">{spec.value}</p>
                    </div>
                  ))}
                  <div className="rounded-2xl bg-slate-50 px-5 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Part Number</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{product.partNumber}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-5 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">OEM Number</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{product.oemNumber}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 px-5 py-4">
                    <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-slate-400">Brand</p>
                    <p className="mt-1 text-sm font-semibold text-slate-900">{product.brand}</p>
                  </div>
                </div>
              )}

              {activeTab === "fitment" && (
                <div className="space-y-6">
                  {product.features.length > 0 && (
                    <div>
                      <h3 className="mb-3 font-heading text-lg font-bold text-slate-950">Key Features</h3>
                      <ul className="grid gap-2 sm:grid-cols-2">
                        {product.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2 rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-700">
                            <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#dc2626]" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div>
                    <h3 className="mb-3 font-heading text-lg font-bold text-slate-950">Vehicle Fitment</h3>
                    <p className="rounded-2xl bg-[#fef2f2] p-4 text-sm leading-7 text-slate-700">{product.fitment}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Related Products ── */}
        {relatedProducts.length > 0 && (
          <section className="border-t border-slate-100 bg-white py-12 sm:py-16">
            <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
              <div className="mb-8 flex items-center justify-between gap-4">
                <h2 className="font-heading text-2xl font-extrabold text-slate-950 sm:text-3xl">Related Parts</h2>
                <Link href="/" className="text-sm font-bold text-[#dc2626] transition hover:underline">
                  View all →
                </Link>
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {relatedProducts.map((item) => (
                  <Link
                    key={item.id}
                    href={`/sparepart/${item.id}`}
                    className="group flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-12px_rgba(15,23,42,0.12)]"
                  >
                    <div className="bg-gradient-to-b from-slate-50 to-white p-5">
                      <img src={item.image} alt={item.title} className="mx-auto h-40 w-full object-contain transition duration-500 group-hover:scale-105 sm:h-48" />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <div className="mb-2">
                        <ProductRating rating={item.rating} reviews={item.reviews} />
                      </div>
                      <p className="mb-1 line-clamp-2 text-sm font-bold text-slate-950">{item.title}</p>
                      <p className="mb-3 text-[11px] font-medium uppercase tracking-widest text-slate-400">{item.partNumber}</p>
                      <div className="mt-auto flex items-center justify-between border-t border-slate-50 pt-3">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-black text-slate-950">{formatMoney(item.price)}</span>
                          {item.oldPrice && <span className="text-xs text-slate-400 line-through">{formatMoney(item.oldPrice)}</span>}
                        </div>
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#dc2626] text-white transition group-hover:scale-110">
                          <CartIcon size={14} />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

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
          productsCountByBrand={productsCountByBrand}
          cartCount={totalItems}
          wishlistCount={wishlist.length}
        />
      </Drawer>

      {/* Wishlist Drawer */}
      <Drawer open={wishlistOpen} onClose={() => setWishlistOpen(false)} title="Your Wishlist">
        <div className="flex flex-1 flex-col overflow-y-auto p-6">
          {wishlist.length === 0 ? (
            <div className="m-auto text-center text-slate-500">
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
                    <p className="font-heading text-lg font-bold text-slate-950 truncate">{item.title}</p>
                    <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                      {item.partNumber} / {item.oemNumber}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-slate-600">${item.price.toFixed(2)}</p>
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => addToCart(item)}
                        className="rounded-full bg-[#dc2626] px-4 py-2 text-xs font-semibold text-white"
                      >
                        Add to Cart
                      </button>
                      <button
                        onClick={() => setWishlist((current) => current.filter((p) => p.id !== item.id))}
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

      {/* Cart Drawer */}
      <Drawer open={cartOpen} onClose={() => setCartOpen(false)} title="Your Cart">
        <CartDrawerContent
          cart={cart}
          formatMoney={formatMoney}
          onUpdateQuantity={onUpdateQuantity}
          onRemove={onRemoveCartItem}
          totalAmount={totalAmount}
          onClose={() => setCartOpen(false)}
        />
      </Drawer>
    </div>
  );
}
