import Filters from "~/components/Filters";
import { api } from "~/utils/api";

export default function Home() {
  const offers = api.offer.getAll.useQuery();

  return (
    <main className="flex">
      <Filters className="bg-slate-800 p-4 shadow-lg" />
      <div className="bg-slate-850 grow p-4 shadow-lg">
        {offers.data?.map((offer) => (
          <div key={offer.id} className="flex flex-col gap-2 bg-slate-800 p-2">
            <p>{offer.name}</p>
            <p>{offer.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
