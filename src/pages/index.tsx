import { useRouter } from "next/router";
import Filters from "~/components/Filters";
import Offer from "~/components/Offer";
import { api } from "~/utils/api";

export default function Home() {
  const router = useRouter();
  const name = (router.query.name as string) || "";
  const genre = (router.query.genre as string) || "";

  const offers = api.offer.getFiltered.useQuery({ name, genre });

  return (
    <main className="flex">
      <Filters className="bg-slate-800 p-4 shadow-lg" />
      <div className="grow bg-slate-850 p-4 shadow-lg">
        <h1 className="mb-2 border-b-2 border-slate-700 text-xl">Offers:</h1>
        <div className="flex max-h-[80vh] flex-col gap-2 overflow-y-scroll ">
          {offers.isLoading && <p>Loading...</p>}
          {offers.data?.map((offer) => <Offer key={offer.id} offer={offer} />)}
        </div>
      </div>
    </main>
  );
}
