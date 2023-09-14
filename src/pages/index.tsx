import { useEffect, useState } from "react";
import Filters from "~/components/Filters";
import Offer from "~/components/Offer";
import type { OfferFilter } from "~/types";
import { api } from "~/utils/api";

export default function Home() {
  const [filters, setFilters] = useState<OfferFilter>({ name: "", genre: "" });
  const offers = api.offer.getFiltered.useQuery(filters);

  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <main className="flex">
      <Filters setFilter={setFilters} className="bg-slate-800 p-4 shadow-lg" />
      <div className="flex grow flex-col gap-2 bg-slate-850 p-4 shadow-lg">
        {offers.data?.map((offer) => <Offer key={offer.id} offer={offer} />)}
      </div>
    </main>
  );
}
