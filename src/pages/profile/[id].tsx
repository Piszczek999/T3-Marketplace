import { useRouter } from "next/router";
import Offer from "~/components/Offer";
import { api } from "~/utils/api";

export default function Profile() {
  const router = useRouter();
  const user = api.user.get.useQuery({ id: router.query.id as string });

  if (!user.data) return;
  const offers = api.offer.getUser.useQuery({ id: user.data.id });

  return (
    <main className="flex flex-col">
      <div className="flex grow gap-2 bg-slate-800 p-4 py-4 shadow-lg">
        <img src={user.data.image!} alt="Logo" />
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl">{user.data.name}</h1>
          <p className="text-slate-300">{user.data.email}</p>
        </div>
      </div>
      <div className="grow bg-slate-850 p-4 shadow-lg">
        <p className="mb-2 border-b-2 border-slate-700 text-xl">{`${user.data.name}'s offers:`}</p>
        <div className="flex max-h-[60vh] flex-col gap-2 overflow-y-scroll ">
          {offers.isLoading && <p>Loading...</p>}
          {offers.data?.map((offer) => <Offer key={offer.id} offer={offer} />)}
        </div>
      </div>
    </main>
  );
}
