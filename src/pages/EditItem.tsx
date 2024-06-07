import { useState, useEffect, SyntheticEvent } from "react";
import { Grid } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  useEditItemMutation,
  useGetAllItemsIdQuery,
  useGetItemQuery,
} from "@services/item";
import { useSuccessToast } from "@hooks/useSuccessToast";
import { useErrorToast } from "@hooks/useErrorToast";
import { Autocomplete, TextField } from "@mui/material";

type Inputs = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

function EditItem() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();
  const [editID, setEditID] = useState<any>(null);
  const [editItem, { isSuccess, isError }] = useEditItemMutation();
  const { data: item } = useGetItemQuery(editID?.id, { skip: !editID });
  const { data: itemsID, isLoading: isIdLoading } = useGetAllItemsIdQuery();
  const onSubmit: SubmitHandler<Inputs> = (data) => editItem(data);
  useErrorToast(isError, "Something went wrong. Try again");
  useSuccessToast(isSuccess, "Item updated successfully");
  useEffect(() => {
    reset({
      id: item?.item?.id || "",
      name: item?.item?.name || "",
      quantity: item?.item?.quantity || 0,
      price: item?.item?.price || 0,
    });
  }, [reset, item]);
  useEffect(() => {
    if (isSuccess && editID?.id) {
      // Perform any side effects after a successful mutation here
      setEditID({ id: editID?.id });
    }
  }, [isSuccess, editID]);

  return (
    <div className="flex justify-center h-[80vh] py-12">
      <div>
        <div className="flex flex-col gap-2">
          <h1 className="font-poppins font-bold text-4xl">Edit Item</h1>
          <p className="font-poppins text-gray-400 text-sm">
            Enter the details of the item you'd like to edit
          </p>
        </div>
        <div className="mt-6">
          <Autocomplete
            value={editID}
            onChange={(_event: SyntheticEvent, newValue) => {
              if (newValue === null) {
                setEditID(null);
              } else {
                setEditID(newValue);
              }
            }}
            // isOptionEqualToValue={(option, value) => option.id === value.id}
            loading={isIdLoading}
            getOptionLabel={(option) => option.id ?? ""}
            id="controllable-states-demo"
            options={itemsID?.itemIds ?? []}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Select Item ID" />
            )}
          />
        </div>
        {(item && editID) && (
          <>
            <form
              className="mt-8 flex flex-col gap-6"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex flex-col gap-2">
                <label className="font-poppins text-lg">Item Name</label>
                <input
                  type="text"
                  placeholder="Blue t-shirt"
                  className="border-2 border-slate-300 py-3 px-4 rounded-2xl hover:border-[#55A6F7]"
                  {...register("name", {
                    required: true,
                    validate: (value) =>
                      value.trim() !== "" || "Name cannot be empty",
                  })}
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>
              <Grid container spacing={3}>
                <Grid
                  item
                  className="flex flex-col gap-2"
                  sx={{ display: "flex", flexDirection: "column" }}
                  xs={6}
                >
                  <label className="font-poppins text-lg">Quantity</label>
                  <input
                    type="number"
                    placeholder="5"
                    className="border-2 border-slate-300 py-3 px-4 rounded-2xl hover:border-[#55A6F7]"
                    min={1}
                    {...register("quantity", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                  {errors.quantity && (
                    <span className="text-red-500">Quantity is required</span>
                  )}
                </Grid>
                <Grid
                  item
                  className="flex flex-col gap-2"
                  xs={6}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <label className="font-poppins text-lg">Price</label>
                  <input
                    type="number"
                    placeholder="$ 120"
                    className="border-2 border-slate-300 py-3 px-4 rounded-2xl hover:border-[#55A6F7]"
                    {...register("price", {
                      required: true,
                      valueAsNumber: true,
                    })}
                  />
                  {errors.price && (
                    <span className="text-red-500">Price is required</span>
                  )}
                </Grid>
              </Grid>
              <div className="flex justify-end">
                <button
                  className="bg-[#1981E7] px-4 py-3 rounded-xl text-white cursor-pointer"
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                >
                  Edit Item
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export default EditItem;
