import { useRouter } from "next/router";
import { api } from "~/utils/api";

export default function Profile() {
  const router = useRouter();
  const user = api.user.get.useQuery({ id: router.query.id as string });

  return (
    <main className="flex gap-2 py-4">
      <img src={user.data?.image as string} alt="Logo" />
      <div className="flex flex-col gap-2">
        <h1 className="text-4xl">{user.data?.name}</h1>
        <p className="text-slate-300">{user.data?.email}</p>
      </div>
    </main>
  );
}
