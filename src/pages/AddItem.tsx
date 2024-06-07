import { useState, ChangeEvent } from "react";
import { Grid } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAddItemMutation } from "@services/item";
import { useSuccessToast } from "@hooks/useSuccessToast";
import { useErrorToast } from "@hooks/useErrorToast";

type Inputs = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

function AddItem() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();
  const [price, setPrice] = useState("");
  const [addItem, { isSuccess, isError }] = useAddItemMutation();
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d.]/g, "");
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setPrice(value);
      setValue("price", parseFloat(value) || 0);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.price = parseFloat(price);
    addItem(data);
  };
  useErrorToast(isError, "Something went wrong. Try again");
  useSuccessToast(isSuccess, "Item added successfully");

  return (
    <div className="flex justify-center h-[80vh] py-12">
      <div>
        <div className="flex flex-col gap-2">
          <h1 className="font-poppins font-bold text-4xl">
            Add new item to inventory
          </h1>
          <p className="font-poppins text-gray-400 text-sm">
            Enter the details of the item you'd like to add to your inventory
          </p>
        </div>
        <form
          className="mt-8 flex flex-col gap-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col gap-2">
            <label className="font-poppins text-lg">Item ID</label>
            <input
              type="text"
              placeholder="CMP1234"
              className="border-2 border-slate-300 py-3 px-4 rounded-2xl hover:border-[#55A6F7]"
              {...register("id", {
                required: true,
                validate: (value) =>
                  value.trim() !== "" || "ID cannot be empty",
              })}
            />
            {errors.id && (
              <span className="text-red-500">{errors.id.message}</span>
            )}
            {/* </div> */}
          </div>
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
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  $
                </span>
                <input
                  type="text"
                  placeholder="120"
                  className="border-2 border-slate-300 py-3 px-4 pl-8 rounded-2xl hover:border-[#55A6F7]"
                  value={price}
                  onChange={handlePriceChange}
                />
              </div>
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
              Add Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItem;
