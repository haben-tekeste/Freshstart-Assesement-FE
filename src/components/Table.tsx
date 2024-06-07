import { useMemo, useRef, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { Box } from "@mui/material";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdEdit } from "react-icons/md";
import ConfirmModal from "./ConfirmModal";
import ItemForm from "./ItemForm";
import {
  useGetAllItemsQuery,
  useEditItemMutation,
  useDeleteItemMutation,
} from "@services/item";
import { Item } from "src/types/api";
import { useSuccessToast } from "@hooks/useSuccessToast";
import { useErrorToast } from "@hooks/useErrorToast";

const Table = () => {
  const [open, setOpen] = useState(false);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 5, //customize the default page size
  });
  const [edit, setEdit] = useState(false);
  const itemID = useRef<string | null>(null);
  const editId = useRef<string | null>(null);
  const { data, isLoading } = useGetAllItemsQuery(pagination);
  const [editItem, { isSuccess }] = useEditItemMutation();
  const [deleteItem, result] = useDeleteItemMutation();

  const handleDeletion = () => {
    if (itemID.current) deleteItem(itemID.current);
  };

  const handleEditItem = (data: Item) => {
    editItem(data);
  };

  //should be memoized or stable
  const columns = useMemo<MRT_ColumnDef<Item>[]>(
    () => [
      {
        accessorKey: "id", //access nested data with dot notation
        header: "Item ID",
        size: 150,
      },
      {
        accessorKey: "name",
        header: "Item Name",
        size: 150,
      },
      {
        accessorKey: "quantity", //normal accessorKey
        header: "Quantity",
        size: 150,
      },
      {
        accessorKey: "price",
        header: "Price",
        size: 150,
      },

      {
        header: "Actions",
        Cell: ({ row }) => {
          const handleDelete = (id: string) => {
            setOpen(true);
            itemID.current = id;
          };
          const handleEdit = (id: string) => {
            setEdit(true);
            editId.current = id;
          };
          return (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <MdEdit
                size={20}
                className="cursor-pointer"
                color="#16cc68"
                onClick={() => handleEdit(row.original.id)}
              />
              <RiDeleteBin5Fill
                size={20}
                className="cursor-pointer"
                color="#f32913"
                onClick={() => handleDelete(row.original.id)}
              />
            </Box>
          );
        },
      },
    ],
    []
  );

  const table = useMaterialReactTable<Item>({
    columns,
    data: data?.items || [],
    muiTableHeadCellProps: {
      sx: {
        backgroundColor: "#E8EEF2",
      },
    },
    muiSkeletonProps: {
      animation: "wave",
    },
    muiLinearProgressProps: {
      color: "secondary",
    },
    muiCircularProgressProps: {
      color: "secondary",
    },
    state: {
      isLoading,
      pagination,
    },
    manualPagination: true,
    onPaginationChange: setPagination,
    rowCount: data?.rows ?? 0,
  });

  useSuccessToast(result?.isSuccess, "Item deleted successfully");
  useErrorToast(result?.isError, "Something went wrong. Try again");

  return (
    <>
      <MaterialReactTable table={table} />
      <ConfirmModal
        open={open}
        setOpen={setOpen}
        handleDelete={handleDeletion}
      />
      <ItemForm
        open={edit}
        setOpen={setEdit}
        itemId={editId.current}
        title="Edit Item"
        btnTitle="Edit Item"
        submitFn={handleEditItem}
        isSuccess={isSuccess}
        successMsg="Item Updated Successfully"
      />
    </>
  );
};

export default Table;
