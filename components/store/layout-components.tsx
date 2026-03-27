"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import NavbarSearch from "./navbar-search";
import { bikeBrands, categories, categoryHierarchy, type ProductCategory } from "./data";
import {
  CartIcon,
  ChevronDownIcon,
  CloseIcon,
  FacebookIcon,
  HeartIcon,
  InstagramIcon,
  MenuIcon,
  TwitterIcon,
  UserIcon,
  YoutubeIcon,
  ArrowRightIcon,
  SearchIcon,
  StarIcon,
} from "./icons";

/* ── Reusable Drawer ── */
export function Drawer({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <button
        onClick={onClose}
        className={`fixed inset-0 z-[60] bg-slate-950/45 transition-opacity duration-300 ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        aria-label={`Close ${title}`}
      />
      <aside
        className={`fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
          <h3 className="font-heading text-xl font-bold text-slate-950">{title}</h3>
          <button onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-700 transition hover:bg-slate-200">
            <CloseIcon size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          {children}
        </div>
      </aside>
    </>
  );
}

/* ── Collapsible Section (for Drawer) ── */
export function CollapsibleSection({
  title,
  isOpen,
  onToggle,
  children,
  count,
}: {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  count?: number;
}) {
  return (
    <div className="border-b border-slate-100 py-4 last:border-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between text-left group"
      >
        <div className="flex items-center gap-2">
          <span className="font-heading text-[15px] font-bold tracking-tight text-slate-900 group-hover:text-[#dc2626] transition-colors">{title}</span>
          {count !== undefined && (
            <span className="text-[11px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-md">{count}</span>
          )}
        </div>
        <span className={`text-slate-400 group-hover:text-[#dc2626] transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}>
           <ChevronDownIcon size={14} />
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "mt-4 max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
        {children}
      </div>
    </div>
  );
}

/* ── Header ── */
export function Header({
  transparent = false,
  onOpenWishlist,
  onOpenCart,
  onToggleMenu,
  cartCount = 0,
  wishlistCount = 0,
  search = "",
  setSearch = () => {},
}: {
  transparent?: boolean;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  onToggleMenu: () => void;
  cartCount?: number;
  wishlistCount?: number;
  search?: string;
  setSearch?: (v: string) => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const isHeaderTransparent = transparent && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navSurfaceClass = isHeaderTransparent
    ? "border-white/15 bg-white/10 text-white placeholder:text-white/70"
    : "border-slate-200 bg-white/75 text-slate-700 placeholder:text-slate-400";

  const navButtonClass = isHeaderTransparent
    ? "bg-white/10 text-white hover:bg-[#dc2626]"
    : "bg-white/70 text-slate-700 hover:bg-[#dc2626] hover:text-white";

  const desktopShopRef = useRef<HTMLDivElement | null>(null);
  const desktopOffersRef = useRef<HTMLDivElement | null>(null);
  const [desktopShopOpen, setDesktopShopOpen] = useState(false);
  const [desktopShopSection, setDesktopShopSection] = useState<"none" | "categories" | "brands">("none");
  const [desktopOffersOpen, setDesktopOffersOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const mobileSearchRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!desktopShopRef.current?.contains(event.target as Node)) {
        setDesktopShopOpen(false);
        setDesktopShopSection("none");
      }
      if (!desktopOffersRef.current?.contains(event.target as Node)) {
        setDesktopOffersOpen(false);
      }
      if (!mobileSearchRef.current?.contains(event.target as Node)) {
        setMobileSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        isHeaderTransparent
          ? "bg-transparent text-white"
          : "border-b border-slate-200/80 bg-slate-50/95 shadow-[0_18px_45px_rgba(15,23,42,0.08)] backdrop-blur-xl"
      }`}
    >
      {/* Discount Bar */}
      <div className={`transition-all duration-500 ${isHeaderTransparent ? "bg-slate-950/20 py-2.5 backdrop-blur-md" : "h-0 overflow-hidden opacity-0"}`}>
        <div className="px-4 text-center text-[10px] font-bold uppercase tracking-[0.24em] text-white sm:text-xs">
          30% discount on all products special for this month!{" "}
          <Link href="/#shop" className="text-[#fca5a5] underline underline-offset-4 decoration-[#dc2626]/40 transition hover:text-[#dc2626] hover:decoration-[#dc2626]">
            Shop Now
          </Link>
        </div>
      </div>

      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-3 px-4 py-4 lg:gap-6 lg:px-6">
        {!mobileSearchOpen && (
          <Link href="/" className="shrink-0">
            <img src={isHeaderTransparent ? "/logo-wm.png" : "/logo-black.png"} alt="Wimbledon Motorbike" className="h-12 w-auto transition duration-300 sm:h-14" />
          </Link>
        )}

        <nav className="hidden flex-1 items-center justify-center gap-10 lg:flex">
          <div ref={desktopShopRef} className="relative">
            <button
              onClick={() => {
                setDesktopShopOpen((v) => {
                  const next = !v;
                  if (!next) setDesktopShopSection("none");
                  if (next) setDesktopOffersOpen(false);
                  return next;
                });
              }}
              className={`group flex items-center gap-2 py-3 font-heading text-[15px] font-bold uppercase tracking-[0.12em] transition hover:text-[#dc2626] ${
                isHeaderTransparent ? "text-white" : "text-slate-900"
              }`}
            >
              Shop <ChevronDownIcon size={14} className={`opacity-60 transition duration-300 group-hover:text-[#dc2626] ${desktopShopOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`absolute left-0 top-full pt-4 transition duration-200 ${desktopShopOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
              <div className="min-w-[320px] rounded-[24px] border border-white/50 bg-white/95 p-3 text-slate-800 shadow-[0_25px_70px_rgba(15,23,42,0.16)] backdrop-blur-xl">
                <div className="relative">
                  <button
                    onClick={() => setDesktopShopSection((v) => (v === "categories" ? "none" : "categories"))}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 font-heading text-[15px] font-medium text-slate-800 transition hover:bg-slate-100 hover:text-[#dc2626] tracking-[0.18em] transition ${desktopShopSection === "categories" ? "bg-slate-100 text-slate-600" : "text-slate-500"}`}
                  >
                    <span>Categories</span>
                    <span className="text-slate-400">›</span>
                  </button>
                  <div className={`absolute left-full top-0 ml-3 w-[300px] transition duration-200 ${desktopShopSection === "categories" ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
                    <div className="rounded-[24px] border border-white/50 bg-white/98 p-3 shadow-[0_25px_70px_rgba(15,23,42,0.16)]">
                      {categories.map((item) => (
                        <Link
                          key={item.filter}
                          href={`/category/${item.filter}`}
                          onClick={() => setDesktopShopOpen(false)}
                          className="block rounded-2xl px-4 py-3 font-heading text-[15px] font-medium text-slate-800 transition hover:bg-slate-100 hover:text-[#dc2626]"
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative mt-2">
                  <button
                    onClick={() => setDesktopShopSection((v) => (v === "brands" ? "none" : "brands"))}
                    className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 font-heading text-[15px] font-medium text-slate-800 transition hover:bg-slate-100 hover:text-[#dc2626] tracking-[0.18em] transition ${desktopShopSection === "brands" ? "bg-slate-100 text-slate-600" : "text-slate-500"}`}
                  >
                    <span>Search By Brand</span>
                    <span className="text-slate-400">›</span>
                  </button>
                  <div className={`absolute left-full top-0 ml-3 w-[260px] transition duration-200 ${desktopShopSection === "brands" ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
                    <div className="rounded-[24px] border border-white/50 bg-white/98 p-3 shadow-[0_25px_70px_rgba(15,23,42,0.16)]">
                      {bikeBrands.map((item) => (
                        <Link
                          key={item.slug}
                          href={`/brand/${item.slug}`}
                          onClick={() => setDesktopShopOpen(false)}
                          className="block rounded-2xl px-4 py-3 font-heading text-[15px] font-medium text-slate-800 transition hover:bg-slate-100 hover:text-[#dc2626]"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div ref={desktopOffersRef} className="relative">
            <button
              onClick={() => {
                setDesktopOffersOpen((v) => {
                  const next = !v;
                  if (next) { setDesktopShopOpen(false); setDesktopShopSection("none"); }
                  return next;
                });
              }}
              className={`group flex items-center gap-2 py-3 font-heading text-[15px] font-bold uppercase tracking-[0.12em] transition hover:text-[#dc2626] ${
                isHeaderTransparent ? "text-white" : "text-slate-900"
              }`}
            >
              Offers <ChevronDownIcon size={14} className={`opacity-60 transition duration-300 group-hover:text-[#dc2626] ${desktopOffersOpen ? "rotate-180" : ""}`} />
            </button>
            <div className={`absolute left-0 top-full pt-4 transition duration-200 ${desktopOffersOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
              <div className="min-w-[220px] rounded-[24px] border border-white/50 bg-white/95 p-3 text-slate-800 shadow-[0_25px_70px_rgba(15,23,42,0.16)] backdrop-blur-xl">
                {["Summer Sale", "Clearance"].map((item) => (
                  <Link
                    key={item}
                    href="/#campaigns"
                    onClick={() => setDesktopOffersOpen(false)}
                    className="block rounded-2xl px-4 py-3 font-heading text-[15px] font-medium text-slate-800 transition hover:bg-slate-100 hover:text-[#dc2626]"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <NavbarSearch
            value={search}
            onChange={setSearch}
            placeholder="Search for motorbike parts..."
            className={`flex items-center gap-3 rounded-full border transition-all duration-300 px-5 py-2.5 ${navSurfaceClass}`}
            inputClassName="w-56 bg-transparent text-sm outline-none placeholder:text-slate-400"
            iconClassName={`transition-colors duration-300 ${isHeaderTransparent ? "text-white/60" : "text-slate-400"}`}
            searchTargetHref={(query: string) => `/?q=${encodeURIComponent(query)}#shop`}
          />
          <Link href="/account" className={`rounded-full p-3 transition ${navButtonClass}`} aria-label="Account">
            <UserIcon size={18} />
          </Link>
          <button onClick={onOpenWishlist} className={`relative rounded-full p-3 transition ${navButtonClass}`} aria-label="Wishlist">
            <HeartIcon size={18} />
            {wishlistCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                {wishlistCount}
              </span>
            ) : null}
          </button>
          <button onClick={onOpenCart} className={`relative rounded-full p-3 transition ${navButtonClass}`} aria-label="Cart">
            <CartIcon size={18} />
            {cartCount > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>
        {mobileSearchOpen ? (
          <div ref={mobileSearchRef} className="flex-1 flex items-center gap-3 animate-in fade-in slide-in-from-right duration-300">
             <button 
              onClick={() => setMobileSearchOpen(false)}
              className="rounded-full bg-slate-100 p-2 text-slate-500 hover:bg-slate-200"
            >
              <ArrowRightIcon size={20} className="rotate-180" />
            </button>
            <NavbarSearch
              value={search}
              onChange={setSearch}
              placeholder="Search products..."
              className="flex flex-1 items-center gap-3 rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 shadow-sm"
              inputClassName="flex-1 bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400"
              iconClassName="text-slate-400"
              searchTargetHref={(query: string) => `/?q=${encodeURIComponent(query)}#shop`}
            />
          </div>
        ) : (
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              onClick={() => setMobileSearchOpen(true)}
              className={`rounded-full p-2.5 transition ${navButtonClass}`}
              aria-label="Search"
            >
              <SearchIcon size={20} />
            </button>
            
            <button
              onClick={onToggleMenu}
              className={`rounded-full p-2.5 transition ${navButtonClass}`}
              aria-label="Open menu"
            >
              <MenuIcon size={20} />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

/* ── Footer ── */
export function Footer() {
  return (
    <footer className="bg-[#161f34] text-white">
      <div className="mx-auto max-w-[1400px] px-4 py-16 lg:px-6">
        <div className="flex flex-col gap-10 border-b border-white/10 pb-12 md:flex-row md:flex-wrap xl:flex-nowrap xl:items-start xl:justify-between">
          <div className="space-y-7 xl:w-[32%]">
            <Link href="/">
              <img src="/logo-wm.png" alt="Wimbledon Motorbike" className="h-16 w-auto" />
            </Link>
            <p className="max-w-md text-[15px] leading-8 text-slate-400">
              Your premium destination for high-quality motorbike parts and accessories. We deliver unmatched performance and reliability.
            </p>
            <div className="flex gap-4">
              {[
                { icon: FacebookIcon, label: "Facebook" },
                { icon: TwitterIcon, label: "Twitter" },
                { icon: InstagramIcon, label: "Instagram" },
                { icon: YoutubeIcon, label: "YouTube" },
              ].map((item) => (
                <a
                  key={item.label}
                  href="#"
                  aria-label={item.label}
                  className="flex h-13 w-13 items-center justify-center rounded-full bg-white/10 text-slate-300 transition hover:bg-[#dc2626] hover:text-white"
                >
                  <item.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-5 xl:w-[16%]">
            <h3 className="font-heading text-[1.6rem] font-bold leading-none lg:text-[2rem]">Shop</h3>
            <ul className="space-y-4 text-[15px] text-slate-400">
              <li><Link href="/category/engine" className="transition hover:text-white">Engine Parts</Link></li>
              <li><Link href="/category/brakes" className="transition hover:text-white">Brakes & Suspension</Link></li>
              <li><Link href="/category/transmission" className="transition hover:text-white">Transmission</Link></li>
              <li><Link href="/category/electrical" className="transition hover:text-white">Accessories</Link></li>
            </ul>
          </div>

          <div className="space-y-5 xl:w-[16%]">
            <h3 className="font-heading text-[1.6rem] font-bold leading-none lg:text-[2rem]">Support</h3>
            <ul className="space-y-4 text-[15px] text-slate-400">
              <li><Link href="/contact" className="transition hover:text-white">Contact Us</Link></li>
              <li><Link href="/#shop" className="transition hover:text-white">Shipping Policy</Link></li>
              <li><Link href="/#campaigns" className="transition hover:text-white">Returns</Link></li>
              <li><Link href="/faq" className="transition hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          <div className="space-y-5 xl:w-[24%]">
            <h3 className="font-heading text-[1.6rem] font-bold leading-none lg:text-[2rem]">Subscribe</h3>
            <p className="max-w-md text-[15px] leading-8 text-slate-400">
              Get the latest updates on new products and upcoming sales
            </p>
            <form className="flex rounded-full bg-white/10 p-1">
              <input
                placeholder="Your email address"
                className="w-full bg-transparent px-5 py-4 text-sm text-white outline-none placeholder:text-slate-400"
              />
              <button
                type="button"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#dc2626] text-white shadow-[0_0_20px_rgba(220,38,38,0.35)] transition hover:bg-[#b91c1c]"
              >
                <ArrowRightIcon size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 text-center text-sm text-slate-400">
          © 2026 Wimbledon Motorbike. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

/* ── Unified Mobile Menu Content (Menu & Filters) ── */
export function MobileMenuFilters({
  onClose,
  onOpenWishlist,
  onOpenCart,
  activeFilter,
  setActiveFilter,
  activeSubCategory,
  setActiveSubCategory,
  selectedBikeBrand,
  setSelectedBikeBrand,
  selectedSupplierBrand,
  setSelectedSupplierBrand,
  expandedCategories,
  setExpandedCategories,
  mobileCategoriesOpen,
  setMobileCategoriesOpen,
  mobileBikeBrandOpen,
  setMobileBikeBrandOpen,
  mobileSupplierBrandOpen,
  setMobileSupplierBrandOpen,
  mobileOffersOpen,
  setMobileOffersOpen,
  productsCountByBrand = {},
}: {
  onClose: () => void;
  onOpenWishlist: () => void;
  onOpenCart: () => void;
  activeFilter: string | any;
  setActiveFilter: (v: any) => void;
  activeSubCategory: string | null;
  setActiveSubCategory: (v: string | null) => void;
  selectedBikeBrand: string;
  setSelectedBikeBrand: (v: any) => void;
  selectedSupplierBrand: string;
  setSelectedSupplierBrand: (v: any) => void;
  expandedCategories: Record<string, boolean>;
  setExpandedCategories: (v: any) => void;
  mobileCategoriesOpen: boolean;
  setMobileCategoriesOpen: (v: boolean) => void;
  mobileBikeBrandOpen: boolean;
  setMobileBikeBrandOpen: (v: boolean) => void;
  mobileSupplierBrandOpen: boolean;
  setMobileSupplierBrandOpen: (v: boolean) => void;
  mobileOffersOpen: boolean;
  setMobileOffersOpen: (v: boolean) => void;
  productsCountByBrand?: Record<string, number>;
}) {
  const [mobileShopOpenNew, setMobileShopOpenNew] = useState(true);
  const [mobileShopCatsOpen, setMobileShopCatsOpen] = useState(false);
  const [mobileShopBrandsOpen, setMobileShopBrandsOpen] = useState(false);
  const [mobileOffersOpenNew, setMobileOffersOpenNew] = useState(false);

  return (
    <div className="flex h-full flex-col bg-white">
      <div className="flex-1 overflow-y-auto">
        {/* Top Buttons Section */}
        <div className="space-y-6 p-6 pb-2">
          <div className="grid grid-cols-3 gap-3">
            <Link
              href="/account"
              onClick={onClose}
              className="group flex flex-col items-center justify-center gap-2 rounded-2xl bg-slate-100 px-2 py-4 text-center transition hover:bg-slate-200"
            >
              <UserIcon size={20} className="text-slate-600 group-hover:text-[#dc2626] transition-colors" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800">Account</span>
            </Link>
            <button
              onClick={() => { onClose(); onOpenWishlist(); }}
              className="group flex flex-col items-center justify-center gap-2 rounded-2xl bg-slate-100 px-2 py-4 text-center transition hover:bg-slate-200"
            >
              <HeartIcon size={20} className="text-slate-600 group-hover:text-[#dc2626] transition-colors" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800">Wishlist</span>
            </button>
            <button
              onClick={() => { onClose(); onOpenCart(); }}
              className="group flex flex-col items-center justify-center gap-2 rounded-2xl bg-slate-100 px-2 py-4 text-center transition hover:bg-slate-200"
            >
              <CartIcon size={20} className="text-slate-600 group-hover:text-[#dc2626] transition-colors" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800">Cart</span>
            </button>
          </div>
        </div>

        <div className="mt-4 border-t border-slate-100">
          <div className="p-6 space-y-4">
            {/* ── NAVIGATION SECTION ── */}
            <div className="space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 px-2">Navigation</p>
              
              {/* Shop Navigation Links */}
              <div className="rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden">
                <button
                  onClick={() => setMobileShopOpenNew(!mobileShopOpenNew)}
                  className="flex w-full items-center justify-between px-5 py-4 text-[15px] font-bold uppercase tracking-[0.12em] text-[#dc2626] transition hover:bg-slate-100/50"
                >
                  Shop
                  <ChevronDownIcon size={16} className={`transition-transform duration-300 ${mobileShopOpenNew ? "rotate-180" : ""}`} />
                </button>
                {mobileShopOpenNew && (
                  <div className="border-t border-slate-100 px-5 pb-5 pt-2 space-y-2">
                    <CollapsibleSection
                       title="Shop By Category"
                       isOpen={mobileShopCatsOpen}
                       onToggle={() => setMobileShopCatsOpen(!mobileShopCatsOpen)}
                    >
                       <ul className="space-y-1 mt-1">
                          {categories.map((item) => (
                             <li key={item.filter}>
                               <Link
                                 href={`/category/${item.filter}`}
                                 onClick={onClose}
                                 className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-[#dc2626]/5 hover:text-[#dc2626] transition-all"
                               >
                                 {item.title}
                               </Link>
                             </li>
                          ))}
                       </ul>
                    </CollapsibleSection>

                    <CollapsibleSection
                       title="Shop By Brand"
                       isOpen={mobileShopBrandsOpen}
                       onToggle={() => setMobileShopBrandsOpen(!mobileShopBrandsOpen)}
                    >
                       <ul className="space-y-1 mt-1">
                          {bikeBrands.map((item) => (
                             <li key={item.slug}>
                               <Link
                                 href={`/brand/${item.slug}`}
                                 onClick={onClose}
                                 className="block rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-[#dc2626]/5 hover:text-[#dc2626] transition-all"
                               >
                                 {item.label}
                               </Link>
                             </li>
                          ))}
                       </ul>
                    </CollapsibleSection>
                  </div>
                )}
              </div>

              {/* Offers Navigation */}
              <div className={`rounded-2xl border transition-all duration-300 ${mobileOffersOpenNew ? "bg-rose-50 border-rose-100" : "bg-white border-slate-100"}`}>
                <button
                  onClick={() => setMobileOffersOpenNew(!mobileOffersOpenNew)}
                  className={`flex w-full items-center justify-between px-5 py-4 text-[15px] font-bold uppercase tracking-[0.12em] transition ${mobileOffersOpenNew ? "text-[#dc2626]" : "text-slate-900 hover:text-[#dc2626]"}`}
                >
                  Special Offers
                  <ChevronDownIcon size={16} className={`transition-transform duration-300 ${mobileOffersOpenNew ? "rotate-180" : ""}`} />
                </button>
                {mobileOffersOpenNew && (
                  <div className="border-t border-rose-100 px-5 pb-5 pt-3 space-y-2">
                    {["Summer Sale", "Clearance"].map((item) => (
                      <Link
                        key={item}
                        href="/#campaigns"
                        onClick={() => {
                          onClose();
                          setMobileOffersOpenNew(false);
                        }}
                        className="flex items-center justify-between rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:text-[#dc2626] transition-all shadow-sm border border-rose-50 group"
                      >
                        {item}
                        <ArrowRightIcon size={14} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/"
                onClick={onClose}
                className="flex items-center justify-between w-full px-5 py-4 rounded-2xl border border-slate-100 text-[15px] font-bold uppercase tracking-[0.12em] text-slate-900 hover:text-[#dc2626] hover:bg-slate-50 transition-all"
              >
                Home
                <ArrowRightIcon size={16} className="text-slate-300" />
              </Link>
            </div>

            {/* ── FILTERS SECTION ── */}
            <div className="pt-6 border-t border-slate-100 space-y-4">
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 px-2">Filters</p>
              
              {/* Product Categories Filter (Checkboxes) */}
              <div className="rounded-2xl border border-slate-100 bg-white p-2">
                <CollapsibleSection
                  title="Product Categories"
                  isOpen={mobileCategoriesOpen}
                  onToggle={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                >
                  <ul className="space-y-4 p-3 pt-0">
                    <li>
                      <label className="flex items-center gap-3 group cursor-pointer">
                        <input
                          type="checkbox"
                          checked={activeFilter === "all"}
                          onChange={() => {
                            setActiveFilter("all");
                            setActiveSubCategory(null);
                          }}
                          className="h-4 w-4 rounded border-slate-300 text-[#dc2626] focus:ring-[#dc2626]"
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
                              className="h-4 w-4 rounded border-slate-300 text-[#dc2626] focus:ring-[#dc2626]"
                            />
                            <span className={`text-[14px] transition ${activeFilter === cat.filter && !activeSubCategory ? "font-bold text-slate-900" : "text-slate-600 group-hover:text-slate-900"}`}>{cat.label}</span>
                          </label>
                          {cat.children && (
                            <button
                              onClick={() => setExpandedCategories((prev: any) => ({ ...prev, [cat.id]: !prev[cat.id] }))}
                              className="text-slate-400 hover:text-[#dc2626] transition-colors p-1"
                            >
                              {expandedCategories[cat.id] ? "−" : "+"}
                            </button>
                          )}
                        </div>
                        {cat.children && expandedCategories[cat.id] && (
                          <ul className="mt-3 ml-7 space-y-3 border-l border-slate-100 pl-4">
                            {cat.children.map((sub) => (
                              <li key={sub.id}>
                                <label className="flex items-center gap-3 group cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={activeSubCategory === sub.label}
                                    onChange={() => {
                                      setActiveFilter(sub.filter || sub.label.toLowerCase());
                                      setActiveSubCategory(sub.label);
                                    }}
                                    className="h-4 w-4 rounded border-slate-300 text-[#dc2626] focus:ring-[#dc2626]"
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

              {/* Bike Brands Filter (Checkboxes) */}
              <div className="rounded-2xl border border-slate-100 bg-white p-2">
                <CollapsibleSection
                  title="Filter by Bike"
                  isOpen={mobileBikeBrandOpen}
                  onToggle={() => setMobileBikeBrandOpen(!mobileBikeBrandOpen)}
                >
                  <ul className="space-y-4 p-3 pt-0">
                    {bikeBrands.map((item) => (
                      <li key={item.label} className="flex items-center justify-between group">
                        <label className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedBikeBrand === item.slug}
                            onChange={() => setSelectedBikeBrand((prev: any) => prev === item.slug ? "all" : item.slug)}
                            className="h-4 w-4 rounded border-slate-300 text-[#dc2626] focus:ring-[#dc2626]"
                          />
                          <span className={`text-[14px] transition ${selectedBikeBrand === item.slug ? "font-bold text-slate-900" : "text-slate-600 group-hover:text-slate-900"}`}>{item.label}</span>
                        </label>
                        <span className="text-[12px] text-slate-400 font-medium">{productsCountByBrand[item.slug] || 0}</span>
                      </li>
                    ))}
                  </ul>
                </CollapsibleSection>
              </div>
            </div>
          </div>
        </div>
      </div>



      <div className="border-t border-slate-100 bg-white p-6 pb-8">
        <div className="flex flex-col gap-3">
          <button
            onClick={onClose}
            className="w-full rounded-full bg-slate-900 py-4 text-sm font-bold text-white transition hover:bg-slate-800"
          >
            Apply Filters
          </button>
          <button
            onClick={() => {
              setActiveFilter("all");
              setSelectedBikeBrand("all");
              setSelectedSupplierBrand("all");
              setActiveSubCategory(null);
              onClose();
            }}
            className="w-full rounded-full border border-slate-200 bg-white py-4 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
          >
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Cart/Wishlist Drawer Content ── */
export function CartDrawerContent({
  cart,
  formatMoney,
  onUpdateQuantity,
  onRemove,
  totalAmount,
  onClose,
}: {
  cart: any[];
  formatMoney: (v: number) => string;
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  totalAmount: number;
  onClose: () => void;
}) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        {cart.length === 0 ? (
          <div className="my-auto flex h-full flex-col items-center justify-center text-center text-slate-500">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-400">
              <CartIcon size={24} />
            </div>
            <p>Your cart is currently empty.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex gap-4 rounded-[22px] border border-slate-200 p-4">
                <img src={item.image} alt={item.title} className="h-20 w-20 rounded-2xl bg-slate-50 object-contain p-2" />
                <div className="min-w-0 flex-1">
                  <p className="font-heading text-lg font-bold text-slate-950 truncate">{item.title}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-slate-400">
                    {item.partNumber}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-slate-600">{formatMoney(item.price)}</p>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <div className="flex items-center rounded-full bg-slate-100 p-1">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="rounded-full px-3 py-1 text-slate-700"> - </button>
                      <span className="min-w-8 text-center text-sm font-semibold">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="rounded-full px-3 py-1 text-slate-700"> + </button>
                    </div>
                    <button onClick={() => onRemove(item.id)} className="text-sm font-semibold text-rose-500">Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="border-t border-slate-200 p-6">
        <div className="mb-4 flex items-center justify-between font-semibold text-slate-950">
          <span>Total</span>
          <span>{formatMoney(totalAmount)}</span>
        </div>
        <button className="w-full rounded-full bg-[#dc2626] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#b91c1c]">
          Checkout
        </button>
      </div>
    </div>
  );
}

/* ── Product Rating Component ── */
export function ProductRating({ rating, reviews }: { rating: number; reviews: number }) {
  return (
    <div className="flex items-center gap-1 text-amber-400">
      <StarIcon filled size={14} />
      <StarIcon filled size={14} />
      <StarIcon filled size={14} />
      <StarIcon filled size={14} />
      {rating >= 4.8 ? <StarIcon filled size={14} /> : <StarIcon half size={14} />}
      <span className="ml-1 text-xs font-medium text-slate-500">({reviews})</span>
    </div>
  );
}
