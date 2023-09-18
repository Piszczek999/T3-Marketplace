import { useRouter } from "next/router";
import Offer from "~/components/Offer";
import { api } from "~/utils/api";

export default function Profile() {
  const router = useRouter();
  const userId = router.query.id as string;

  // user data
  const { data: user, isLoading: userLoading } = api.user.get.useQuery({
    id: userId,
  });

  // user's offers
  const { data: offers, isLoading: offersLoading } = api.offer.getUser.useQuery(
    { id: userId },
  );

  if (userLoading) {
    return <p>Loading...</p>;
  }

  if (!user) return null;

  return (
    <main className="flex flex-col">
      <div className="flex grow gap-2 bg-slate-800 p-4 py-4 shadow-lg">
        <img src={user.image!} alt="Logo" />
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl">{user.name}</h1>
          <p className="text-slate-300">{user.email}</p>
        </div>
      </div>
      <div className="grow bg-slate-850 p-4 shadow-lg">
        <p className="mb-2 border-b-2 border-slate-700 text-xl">{`${user.name}'s offers:`}</p>
        <div className="flex max-h-[60vh] flex-col gap-2 overflow-y-scroll ">
          {offersLoading ? <p>Loading...</p> : null}
          {offers?.map((offer) => <Offer key={offer.id} offer={offer} />)}
        </div>
      </div>
    </main>
  );
}
