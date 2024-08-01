import { useState } from "react";
import { trpc } from "../lib/trpc";

export default function Addstore() {
  const [title, setTitle] = useState("");
  const addstoreMutation = trpc.store.create.useMutation();
  const trpcContext = trpc.useContext();
  return (
    <div className="flex justify-between space-x-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Get milk..."
        className="flex-grow rounded-md"
      />
      <button
        className="bg-blue-500 hover:bg-blue-600 active:bg-blue-500 text-white py-1 px-3 rounded-md"
        onClick={() => {
          addstoreMutation.mutate(
            { title: title, lat: 127.1596148737739, lng: 36.99502164866016 },
            {
              onSuccess: () => {
                console.log("created a store");
                trpcContext.store.list.invalidate();
              },
            }
          );
        }}
      >
        Add store
      </button>
    </div>
  );
}
