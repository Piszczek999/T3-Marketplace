import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { genres } from "~/constants";
import type { OfferInput } from "~/types";
import { api } from "~/utils/api";

export default function NewOffer() {
  const session = useSession();
  const router = useRouter();
  const { register, handleSubmit } = useForm<OfferInput>();
  const createOffer = api.offer.create.useMutation({
    onSuccess: async () => {
      await router.push("/");
    },
  });

  if (!session.data) return <p className="text-center">Access Denied</p>;

  return (
    <main className="flex justify-center">
      <form
        className="flex basis-[400px] flex-col gap-2 bg-slate-850 p-4 shadow-lg"
        onSubmit={handleSubmit((data) => {
          createOffer.mutate({ ...data, price: parseFloat(data.price) });
        })}
      >
        <label htmlFor="genre">Genre: </label>
        <select {...register("genre", { required: "hello" })}>
          <option value="">{"<Select>"}</option>
          {genres.map((genre, r) => (
            <option key={r} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <label htmlFor="name">Name: </label>
        <input
          placeholder="Example name"
          {...register("name", { required: true })}
        />
        <label htmlFor="description">Description: </label>
        <textarea
          placeholder="Describe Your product..."
          rows={10}
          {...register("description")}
        />
        <label htmlFor="price">Price: </label>
        <input
          type="number"
          step={0.01}
          min={0.0}
          placeholder="0.00"
          {...register("price", { required: true })}
        />
        <input type="submit" className="btn" />
      </form>
    </main>
  );
}
