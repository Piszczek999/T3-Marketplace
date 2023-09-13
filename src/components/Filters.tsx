import { DetailedHTMLProps, HTMLAttributes } from "react";
import { useForm } from "react-hook-form";

export default function Sidebar(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
) {
  const { register, handleSubmit } = useForm();

  return (
    <div className="basis-[200px]">
      <div {...props}>
        <h1 className="text-xl">Filters:</h1>
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <label htmlFor="rarity">Rarity: </label>
          <select {...register("rarity")} className="bg-slate-700">
            <option value="common">Common</option>
            <option value="uncommon">Uncommon</option>
            <option value="rare">Rare</option>
          </select>
          <input {...register("price")} className="bg-slate-700" />
          <input type="submit" value="Submit" className="nav-item" />
        </form>
      </div>
    </div>
  );
}
