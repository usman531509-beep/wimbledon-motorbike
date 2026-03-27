"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  bikeBrands,
  getBikeBrandMeta,
  type ProductCategory,
  type BikeBrand,
  type Product,
} from "./data";
import {
  HeartIcon,
  SearchIcon,
  StarIcon,
  CartIcon,
  ChevronDownIcon,
} from "./icons";
import {
  Header,
  Footer,
  Drawer,
  MobileMenuFilters,
  CartDrawerContent,
  ProductRating
} from "./layout-components";
 
type CartItem = Product & { quantity: number };


export default function BrandPage({
  brand,
  products,
}: {
  brand: BikeBrand;
  products: Product[];
}) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedBikeBrand, setSelectedBikeBrand] = useState<string>("all");
  const [selectedSupplierBrand, setSelectedSupplierBrand] = useState<string>("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);

  // Mobile Menu Specific States
  const [activeFilter, setActiveFilter] = useState<any>("all");
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
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

  const addToCart = (p: Product) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === p.id);
      if (!existing) return [...current, { ...p, quantity: 1 }];
      return current.map((item) =>
        item.id === p.id ? { ...item, quantity: item.quantity + 1 } : item
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

  const formatMoney = (v: number) => `$${v.toFixed(2)}`;

  const productsCountByBrand = useMemo(() => {
    const counts: Record<string, number> = {};
    bikeBrands.forEach(b => {
      // For the brand page, we might want to show counts across all products or just this brand
      // Usually, consistent with home page, we show counts for all bike brands in the filter
      counts[b.slug] = 0; // Simple placeholder or calculation if needed
    });
    return counts;
  }, []);

  const meta = getBikeBrandMeta(brand);
  const supplierBrands = useMemo(() => Array.from(new Set(products.map((product) => product.brand))).sort(), [products]);

  const filtered = products.filter((product) => {
    const q = search.toLowerCase();
    return (
      (selectedCategory === "all" || product.category === selectedCategory) &&
      (selectedSupplierBrand === "all" || product.brand === selectedSupplierBrand) &&
      (q.length === 0 ||
        product.title.toLowerCase().includes(q) ||
        product.brand.toLowerCase().includes(q) ||
        product.partNumber.toLowerCase().includes(q) ||
        product.oemNumber.toLowerCase().includes(q))
    );
  });

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

      <main>
        <section className="bg-slate-950 py-18">
          <div className="mx-auto max-w-[1400px] px-4 py-16 text-white lg:px-6">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-[#fca5a5]">
              Bike Brand Catalog
            </p>
            <h1 className="font-heading text-4xl font-extrabold sm:text-5xl">
              {meta?.label ?? "Bike Brand"} Parts
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg sm:leading-8">
              All currently assigned parts to {meta?.label ?? brand} in our database.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
            <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
              <p className="text-sm font-medium text-slate-500">
                Showing {filtered.length} products for {meta?.label ?? brand}
              </p>
              <Link href="/" className="text-sm font-semibold text-[#dc2626]">
                Back to home
              </Link>
            </div>

            <div className="mb-8 grid gap-3 rounded-[28px] bg-white p-4 shadow-sm md:grid-cols-2">
              <label className="relative">

                <select
                  value={selectedCategory}
                  onChange={(event) =>
                    setSelectedCategory(event.target.value)
                  }
                  className="w-full appearance-none rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none"
                >
                  <option value="all">All Categories</option>
                  {[
                    { filter: "engine", title: "Engine" },
                    { filter: "brakes", title: "Brakes" },
                    { filter: "transmission", title: "Transmission" },
                    { filter: "suspension", title: "Suspension" },
                    { filter: "electrical", title: "Electrical" },
                    { filter: "wheels", title: "Wheels" },
                  ].map((category) => (
                    <option key={category.filter} value={category.filter}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </label>
              <label className="relative">
                <select
                  value={selectedSupplierBrand}
                  onChange={(event) => setSelectedSupplierBrand(event.target.value)}
                  className="w-full appearance-none rounded-full border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none"
                >
                  <option value="all">All Product Brands</option>
                  {supplierBrands.map((supplier) => (
                    <option key={supplier} value={supplier}>
                      {supplier}
                    </option>
                  ))}
                </select>
                <ChevronDownIcon size={16} className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" />
              </label>
            </div>

            <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
              {filtered.map((product) => (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-[28px] bg-white shadow-[0_18px_45px_rgba(15,23,42,0.08)]"
                >
                  <div className="relative bg-white p-5">
                    {product.badge ? (
                      <span className="absolute left-5 top-5 rounded-full bg-[#dc2626] px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                        {product.badge}
                      </span>
                    ) : null}
                    <Link href={`/sparepart/${product.id}`} className="block rounded-[22px] bg-slate-50 p-5">
                      <img src={product.image} alt={product.title} className="mx-auto h-56 w-full object-contain" />
                    </Link>
                  </div>
                  <div className="space-y-4 p-6 pt-1">
                    <ProductRating rating={product.rating} reviews={product.reviews} />
                    <Link href={`/sparepart/${product.id}`} className="block font-heading text-lg font-bold text-slate-950 sm:text-xl">
                      {product.title}
                    </Link>
                    <div className="space-y-1 text-xs uppercase tracking-[0.18em] text-slate-400">
                      <p>Part No: {product.partNumber}</p>
                      <p>OEM: {product.oemNumber}</p>
                    </div>
                    <p className="line-clamp-2 text-sm leading-6 text-slate-500">{product.shortDescription}</p>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-bold text-slate-950">{formatMoney(product.price)}</span>
                        {product.oldPrice ? (
                          <span className="text-sm text-slate-400 line-through">{formatMoney(product.oldPrice)}</span>
                        ) : null}
                      </div>
                       <button 
                        onClick={() => addToCart(product)}
                        className="rounded-full bg-[#dc2626] p-3 text-white transition hover:scale-110 active:scale-95 shadow-lg shadow-[#dc2626]/20"
                      >
                        <CartIcon size={16} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* ── Mobile Menu & Filter Drawer ── */}
      <Drawer open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} title="Menu & Filters">
        <MobileMenuFilters
          onClose={() => setMobileMenuOpen(false)}
          onOpenWishlist={() => setWishlistOpen(true)}
          onOpenCart={() => setCartOpen(true)}
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          activeSubCategory={activeSubCategory}
          setActiveSubCategory={setActiveSubCategory}
          selectedBikeBrand={brand} // Default to current brand
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
        />
      </Drawer>

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
                      {item.partNumber}
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
