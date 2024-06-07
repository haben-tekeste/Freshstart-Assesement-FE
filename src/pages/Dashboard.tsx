import { useState } from "react";
import Table from "@components/Table";
import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa6";
import ItemForm from "@components/ItemForm";
import "react-toastify/dist/ReactToastify.css";
import { useAddItemMutation } from "@services/item";
import { useErrorToast } from "@hooks/useErrorToast";
import { Item } from "../types/api";

function Dashboard() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const [addItem, { isSuccess, isError }] = useAddItemMutation();
  const handleAddItem = (data: Item) => {
    addItem(data);
  };

  useErrorToast(isError, "Something went wrong. Try again");

  return (
    <div className="px-28 mt-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold font-poppins">Inventory</h1>
      </div>
      <div className="my-3 flex justify-end">
        <Button
          variant="contained"
          style={{
            backgroundColor: "#5be72c",
            fontFamily: "poppins",
          }}
          startIcon={<FaPlus />}
          onClick={handleOpenModal}
        >
          Add Item
        </Button>
      </div>

      {/* table */}
      <Table />
      <ItemForm
        open={openModal}
        setOpen={setOpenModal}
        title={"Add New Item to Inventory"}
        btnTitle="Add Item"
        isSuccess={isSuccess}
        submitFn={handleAddItem}
        successMsg="Item Added successfully"
      />
    </div>
  );
}

export default Dashboard;
