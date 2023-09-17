import { useEffect, useState } from "react";
import Filters from "~/components/Filters";
import Offer from "~/components/Offer";
import type { OfferFilter } from "~/types";
import { api } from "~/utils/api";

export default function Home() {
  const [filters, setFilters] = useState<OfferFilter>({ name: "", genre: "" });
  const offers = api.offer.getFiltered.useQuery(filters);

  return (
    <main className="flex">
      <Filters setFilter={setFilters} className="bg-slate-800 p-4 shadow-lg" />
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
