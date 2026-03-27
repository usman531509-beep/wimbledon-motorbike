import BrandPage from "@/components/store/brand-page";
import {
  bikeBrands,
  getProductsByBikeBrand,
  type BikeBrand,
} from "@/components/store/data";
import { notFound } from "next/navigation";

const validBrands: BikeBrand[] = bikeBrands.map((item) => item.slug);

export function generateStaticParams() {
  return validBrands.map((brand) => ({ brand }));
}

type BrandRouteProps = {
  params: Promise<{ brand: string }>;
};

export default async function BrandRoute({ params }: BrandRouteProps) {
  const { brand } = await params;

  if (!validBrands.includes(brand as BikeBrand)) {
    notFound();
  }

  const items = getProductsByBikeBrand(brand as BikeBrand);

  return <BrandPage brand={brand as BikeBrand} products={items} />;
}
