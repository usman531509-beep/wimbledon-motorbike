import FinderResultsPage from "@/components/store/finder-results-page";
import { getProductsByVehicleSelection } from "@/components/store/data";

type FinderPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function FinderPage({ searchParams }: FinderPageProps) {
  const params = await searchParams;
  const getValue = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  const selection = {
    make: getValue(params.make),
    model: getValue(params.model),
    year: getValue(params.year),
    engine: getValue(params.engine),
  };

  const products = getProductsByVehicleSelection(selection);

  return <FinderResultsPage products={products} selection={selection} />;
}
