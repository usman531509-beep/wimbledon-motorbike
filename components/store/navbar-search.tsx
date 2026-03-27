"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { getProductSearchSuggestions } from "./data";
import { SearchIcon } from "./icons";

export default function NavbarSearch({
  value,
  onChange,
  placeholder,
  className,
  inputClassName,
  iconClassName,
  searchTargetHref,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className: string;
  inputClassName: string;
  iconClassName: string;
  searchTargetHref?: (query: string) => string;
}) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [focused, setFocused] = useState(false);
  const trimmedValue = value.trim();

  const suggestions = useMemo(
    () => getProductSearchSuggestions(trimmedValue),
    [trimmedValue],
  );

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setFocused(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const showSuggestions = focused && trimmedValue.length > 0;

  return (
    <div ref={containerRef} className="relative">
      <label className={className}>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={(event) => {
            if (event.key !== "Enter" || !trimmedValue) {
              return;
            }

            event.preventDefault();

            if (suggestions[0]) {
              setFocused(false);
              router.push(`/sparepart/${suggestions[0].id}`);
              return;
            }

            if (searchTargetHref) {
              setFocused(false);
              router.push(searchTargetHref(trimmedValue));
            }
          }}
          placeholder={placeholder}
          className={inputClassName}
        />
        <SearchIcon size={18} className={iconClassName} />
      </label>

      {showSuggestions ? (
        <div className="absolute left-0 right-0 top-[calc(100%+12px)] z-50 overflow-hidden rounded-[24px] border border-slate-200 bg-white/95 shadow-[0_24px_60px_rgba(15,23,42,0.14)] backdrop-blur-xl w-[300px]">
          {suggestions.length > 0 ? (
            <>
              <div className="border-b border-slate-100 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                Matching Products
              </div>
              <div className="max-h-[400px] overflow-y-auto py-2">
                {suggestions.map((product) => (
                  <Link
                    key={product.id}
                    href={`/sparepart/${product.id}`}
                    onClick={() => setFocused(false)}
                    className="flex items-center gap-4 px-4 py-3 transition hover:bg-slate-50"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-50 p-2">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={product.image} alt={product.title} className="h-full w-full object-contain" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-heading text-sm font-semibold text-slate-900">
                        {product.title}
                      </p>
                      <p className="mt-1 truncate text-xs uppercase tracking-[0.16em] text-slate-400">
                        Part No: {product.partNumber}
                      </p>
                      <p className="truncate text-xs text-slate-500">OEM: {product.oemNumber}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="px-5 py-4 text-sm text-slate-500">
              No matching products found for this search.
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
