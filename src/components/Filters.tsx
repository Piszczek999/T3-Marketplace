import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";
import { genres } from "~/constants";
import type { OfferFilter } from "~/types";

type Props = {
  setFilter: (filter: OfferFilter) => void;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export default function Sidebar({ setFilter, ...props }: Props) {
  const { register, handleSubmit } = useForm<OfferFilter>();

  return (
    <div className="basis-[200px]">
      <div {...props}>
        <h1 className="text-xl">Filters:</h1>
        <form
          className="flex flex-col gap-2"
          onSubmit={handleSubmit((data) => setFilter(data))}
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
