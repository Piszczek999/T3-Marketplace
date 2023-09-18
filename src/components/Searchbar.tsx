import Link from "next/link";
import { ChangeEvent, useEffect, useState } from "react";
import { api } from "~/utils/api";

export default function Searchbar() {
  const [inputValue, setInputValue] = useState("");
  const users = api.user.getAll.useQuery();

  return (
    <div>
      <input
        placeholder="Search"
        type="text"
        value={inputValue}
        onChangeCapture={(e) => setInputValue(e.currentTarget.value)}
      />
      {inputValue !== "" && (
        <div className="absolute flex flex-col bg-slate-850">
          {users.data
            ?.filter((user) => user.name?.includes(inputValue))
            .map((user) => (
              <Link
                key={user.id}
                className="bg-slate-800 p-2 hover:bg-slate-700"
                onClick={() => setInputValue("")}
                href={`/profile/${user.id}`}
              >
                {user.name}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}
