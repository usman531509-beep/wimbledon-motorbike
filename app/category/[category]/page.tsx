import CategoryPage from "@/components/store/category-page";
import {
  getProductsByCategory,
  type ProductCategory,
} from "@/components/store/data";
import { notFound } from "next/navigation";

const validCategories: ProductCategory[] = [
  "brakes",
  "engine",
  "transmission",
  "suspension",
  "electrical",
  "wheels",
];

export function generateStaticParams() {
  return validCategories.map((category) => ({ category }));
}

type CategoryRouteProps = {
  params: Promise<{ category: string }>;
};

export default async function CategoryRoute({ params }: CategoryRouteProps) {
  const { category } = await params;

  if (!validCategories.includes(category as ProductCategory)) {
    notFound();
  }

  const items = getProductsByCategory(category as ProductCategory);

  return <CategoryPage category={category as ProductCategory} products={items} />;
}
