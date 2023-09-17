import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { genres } from "~/constants";
import type { OfferInput } from "~/types";
import { api } from "~/utils/api";

export default function NewOffer() {
  const { status } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OfferInput>();
  const createOffer = api.offer.create.useMutation({
    onSuccess: async () => {
      await router.push("/");
    },
  });

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "unauthenticated") {
    void signIn();
  }

  return (
    <main className="flex justify-center">
      <form
        className="flex basis-[400px] flex-col gap-2 bg-slate-850 p-4 shadow-lg"
        onSubmit={handleSubmit((data) => {
          createOffer.mutate({ ...data, price: parseFloat(data.price) });
        })}
      >
        <label htmlFor="genre">Genre: </label>
        <select {...register("genre", { required: "This is required" })}>
          <option value="">{"<Select>"}</option>
          {genres.map((genre, r) => (
            <option key={r} value={genre} className="lowercase">
              {genre}
            </option>
          ))}
        </select>
        <p>{errors.genre?.message}</p>
        <label htmlFor="name">Name:</label>
        <input
          placeholder="Example name"
          {...register("name", {
            required: "This is required",
            maxLength: { value: 32, message: "Max length is 32 characters." },
          })}
        />
        <p>{errors.name?.message}</p>
        <label htmlFor="description">Description: </label>
        <textarea
          placeholder="Describe Your product..."
          rows={10}
          {...register("description", {
            maxLength: { value: 255, message: "Max length is 255 characters" },
          })}
        />
        <label htmlFor="price">Price: </label>
        <input
          type="number"
          step={0.01}
          min={0.0}
          placeholder="0.00"
          {...register("price", { required: "This is required." })}
        />
        <input type="submit" className="btn" />
      </form>
    </main>
  );
}
