import { useRouter } from "next/router";
import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { genres } from "~/constants";
import type { OfferFilter } from "~/types";

export default function Sidebar({
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  const { register, handleSubmit } = useForm<OfferFilter>();
  const router = useRouter();

  return (
    <div className="basis-[200px]">
      <div {...props}>
        <h1 className="mb-2 border-b-2 border-slate-700 text-xl">Filters:</h1>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((data) =>
            router.push(`?name=${data.name}&genre=${data.genre}`),
          )}
        >
          <label htmlFor="name">Name: </label>
          <input placeholder="Search for an item" {...register("name")} />
          <label htmlFor="rarity">Genre: </label>
          <select {...register("genre")}>
            <option value="">{"<Select>"}</option>
            {genres.map((genre, r) => (
              <option key={r} value={genre}>
                {genre}
              </option>
            ))}
          </select>
          <input type="submit" value="Submit" className="btn" />
        </form>
      </div>
    </div>
  );
}
