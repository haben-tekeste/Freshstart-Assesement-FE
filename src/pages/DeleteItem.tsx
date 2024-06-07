import { useState } from "react";
import { useGetAllItemsIdQuery, useDeleteItemMutation } from "@services/item";
import ConfirmModal from "@components/ConfirmModal";
import { useSuccessToast } from "@hooks/useSuccessToast";
import { useErrorToast } from "@hooks/useErrorToast";

function DeleteItem() {
  const { data, isLoading } = useGetAllItemsIdQuery();
  const [deleteItem, { isSuccess, isError }] = useDeleteItemMutation();
  const [open, setOpen] = useState(false);
  const [itemID, setItemID] = useState<string | null>(null);
  const handleOpenModal = (id: string) => {
    setItemID(id);
    setOpen(true);
  };
  const handleDelete = () => {
    if (itemID) deleteItem(itemID);
  };
  useSuccessToast(isSuccess, "Item deleted successfully");
  useErrorToast(isError, "Something went wrong. Try again.");
  return (
    <div className="flex justify-center h-[80vh] py-12 border-2">
      {isLoading && <div className="spinner"></div>}
      <div className="w-[60%]">
        <div className="flex flex-col gap-2 mb-6">
          <h1 className="font-poppins font-bold text-4xl">All Inventory</h1>
        </div>
        <div className="h-[70%] overflow-auto">
          {data?.itemIds?.map((item: { id: string; name: string }) => (
            <div
              key={item?.id}
              className="flex justify-between items-center hover:bg-slate-100 py-2 px-2 cursor-pointer"
            >
              <div>
                <h3 className="font-bold font-poppins">{item?.name}</h3>
                <p className="text-gray-500 font-poppins">{item.id}</p>
              </div>
              <div className="">
                <button
                  className="bg-[#E8EEF2] hover:bg-[#d9e0e3] px-4 py-2 rounded-xl cursor-pointer"
                  onClick={() => handleOpenModal(item?.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        {!data && (
          <h1 className="text-2xl text-center mt-4 font-poppins">
            No Records Available
          </h1>
        )}
      </div>
      <ConfirmModal open={open} setOpen={setOpen} handleDelete={handleDelete} />
    </div>
  );
}

export default DeleteItem;
