import { getProductById, products } from "@/components/store/data";
import ProductDetail from "@/components/store/product-detail";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return products.map((product) => ({
    id: String(product.id),
  }));
}

type ProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = getProductById(Number(id));

  if (!product) {
    notFound();
  }

  return <ProductDetail product={product} />;
}
