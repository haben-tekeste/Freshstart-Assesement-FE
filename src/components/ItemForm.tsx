/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, ChangeEvent } from "react";
import { Dialog, DialogTitle, Slide, Grid, DialogContent } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import { useForm, SubmitHandler } from "react-hook-form";
import { useGetItemQuery } from "@services/item";
import { useSuccessToast } from "@hooks/useSuccessToast";

type Inputs = {
  id: string;
  name: string;
  quantity: number;
  price: number;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ItemForm({
  open,
  setOpen,
  itemId,
  title,
  btnTitle,
  submitFn,
  isSuccess,
  successMsg,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  itemId?: string | null;
  title: string;
  btnTitle: string;
  submitFn: (data: Inputs, id?: string) => void;
  isSuccess: boolean;
  successMsg: string;
}) {
  const { data: editData } = useGetItemQuery(itemId, { skip: !itemId });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<Inputs>();
  useEffect(() => {
    reset({
      id: editData?.item?.id || "",
      name: editData?.item?.name || "",
      quantity: editData?.item?.quantity || 0,
      price: editData?.item?.price || 0,
    });
    setPrice(editData?.item.price || 0);
  }, [reset, editData]);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    data.price = parseFloat(price);
    submitFn(data);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const [price, setPrice] = useState(editData?.item?.price || 0);
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\d.]/g, "");
    if (value === "" || /^[0-9]*\.?[0-9]*$/.test(value)) {
      setPrice(value);
      setValue("price", parseFloat(value) || 0);
    }
  };
  useSuccessToast(isSuccess, successMsg);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
      fullWidth
      maxWidth="sm"
      onSubmit={handleSubmit(onSubmit)}
    >
      <DialogTitle sx={{ fontSize: "1.8rem" }}>{title}</DialogTitle>
      <DialogContent>
        <p className="text-sm text-slate-500">Enter the details of the item</p>
        {/* <Grid container spacing={3}> */}
        <div className="flex gap-1.5 flex-col my-6">
          <label htmlFor="">Item ID</label>
          <input
            type="text"
            id=""
            placeholder="#12345"
            className="border-2 border-slate-300 py-2 px-4 rounded-2xl hover:border-[#55A6F7] bg-[#F7F9FB]"
            {...register("id", {
              required: true,
              validate: (value) => value.trim() !== "" || "ID cannot be empty",
            })}
          />
          {errors.id && (
            <span className="text-red-500">{errors.id.message}</span>
          )}
        </div>
        <div className="flex gap-1.5 flex-col my-6">
          <label htmlFor="">Item Name</label>
          <input
            type="text"
            id=""
            placeholder="#12345"
            className="border-2 border-slate-300 py-2 px-4 rounded-2xl hover:border-[#55A6F7] bg-[#F7F9FB]"
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
        <Grid
          container
          spacing={3}
          sx={{
            alignItems: "center",
          }}
        >
          <Grid
            item
            className="flex gap-1.5 flex-col my-6"
            sx={{ display: "flex", flexDirection: "column" }}
            xs={12}
            md={6}
          >
            <label htmlFor="">Quantity</label>
            <input
              type="number"
              id=""
              placeholder="#12345"
              className="border-2 border-slate-300 py-2 px-4 rounded-2xl hover:border-[#55A6F7] bg-[#F7F9FB]"
              min={1}
              {...register("quantity", { required: true, valueAsNumber: true })}
            />
            {errors.quantity && (
              <span className="text-red-500">Quantity is required</span>
            )}
          </Grid>
          {/* <Grid
            item
            xs={12}
            md={6}
            className="flex gap-1.5 flex-col my-6"
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <label htmlFor="">Price</label>
            <input
              type="number"
              id=""
              placeholder="$123"
              className="border-2 border-slate-300 py-2 px-4 rounded-2xl hover:border-[#55A6F7] bg-[#F7F9FB]"
              {...register("price", { required: true, valueAsNumber: true })}
            />
            {errors.price && (
              <span className="text-red-500">Price is required</span>
            )}
          </Grid> */}
          <Grid
            item
            className="flex flex-col gap-2"
            xs={12}
            md={6}
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
        <div className="mt-6">
          <button
            className="bg-[#E8EEF2] hover:bg-[#d9e0e3] px-4 py-2 rounded-xl cursor-pointer"
            onClick={() =>
              reset({
                name: "",
                id: "",
                price: 0,
                quantity: 0,
              })
            }
          >
            Reset
          </button>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-[#1981E7] px-4 py-2 rounded-xl text-white cursor-pointer"
            onClick={handleSubmit(onSubmit)}
          >
            {btnTitle}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
