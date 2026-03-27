import Storefront from "@/components/store/storefront";

type HomeProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Home({ searchParams }: HomeProps) {
  const params = await searchParams;
  const getValue = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;

  return (
    <Storefront
      initialCategory={getValue(params.category)}
      initialSearch={getValue(params.q)}
      make={getValue(params.make)}
      model={getValue(params.model)}
      year={getValue(params.year)}
      engine={getValue(params.engine)}
    />
  );
}
