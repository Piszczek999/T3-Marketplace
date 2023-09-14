import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { type SubmitHandler, useForm } from "react-hook-form";
import { genres } from "~/constants";
import type { OfferInput } from "~/types";
import { api } from "~/utils/api";

export default function NewOffer() {
  const session = useSession();
  const router = useRouter();
  const { register, handleSubmit } = useForm<OfferInput>();
  const createOffer = api.offer.create.useMutation();

  if (!session.data) return <p className="text-center">Access Denied</p>;

  const onSubmit: SubmitHandler<OfferInput> = (data) => {
    createOffer.mutate({
      ...data,
      price: parseFloat(data.price),
    });
    router.push("/");
  };

  return (
    <main className="flex justify-center">
      <form
        className="flex basis-[400px] flex-col gap-2 bg-slate-850 p-4 shadow-lg"
        onSubmit={handleSubmit(onSubmit)}
      >
        <label htmlFor="genre">Genre: </label>
        <select {...register("genre")}>
          {genres.map((genre, r) => (
            <option key={r} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <label htmlFor="name">Name: </label>
        <input placeholder="Example name" {...register("name")} />
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
          {...register("price")}
        />
        <input type="submit" className="btn" />
      </form>
    </main>
  );
}
