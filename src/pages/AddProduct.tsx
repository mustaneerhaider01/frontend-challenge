import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/UI/Button";
import Input from "../components/UI/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "react-query";
import newRequest from "../lib/newRequest";
import toast from "react-hot-toast";

const createItemSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required")
    .max(100, "Product name should not exceed 100 characters"),
  price: z.coerce
    .number({ invalid_type_error: "Price must be a number" })
    .gte(1, "Price is required and must be greater than 0"),
  imageUrl: z.string().url("Image URL is required"),
});

type ItemForm = z.infer<typeof createItemSchema>;

function AddProduct() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemForm>({
    resolver: zodResolver(createItemSchema),
    defaultValues: {
      name: "",
      price: 1,
      imageUrl: "",
    },
  });

  const queryClient = useQueryClient();

  const createItemMutation = useMutation({
    mutationFn: (data: ItemForm) =>
      newRequest
        .post("/items", {
          name: data.name,
          price: data.price,
          img: data.imageUrl,
        })
        .then((res) => res.data),
    onSuccess: () => {
      toast.success("Item added!");
      queryClient.invalidateQueries(["items"]);
      reset();
    },
    onError: () => {
      toast.error("Something went wrong while adding the item!");
    },
  });

  const onSubmit: SubmitHandler<ItemForm> = (data) => {
    createItemMutation.mutate(data);
  };

  return (
    <div className="max-w-xl mx-5 sm:mx-auto">
      <h1 className="text-4xl text-neutral-800 font-bold text-center">
        Put Items up for Sale
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-14 flex flex-col gap-y-6"
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-kTextColor1 font-semibold text-sm">Name</label>
          <Input
            allowInputBorder={false}
            {...register("name")}
            hasError={!!errors.name}
            errorMessage={errors.name?.message}
            disabled={createItemMutation.isLoading}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-kTextColor1 font-semibold text-sm">
            Price
          </label>
          <Input
            type="number"
            allowInputBorder={false}
            {...register("price")}
            hasError={!!errors.price}
            errorMessage={errors.price?.message}
            disabled={createItemMutation.isLoading}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-kTextColor1 font-semibold text-sm">
            Image URL
          </label>
          <Input
            allowInputBorder={false}
            {...register("imageUrl")}
            hasError={!!errors.imageUrl}
            errorMessage={errors.imageUrl?.message}
            disabled={createItemMutation.isLoading}
          />
        </div>

        <div className="mt-5">
          <Button
            type="submit"
            disabled={createItemMutation.isLoading}
            label="Add Item"
            onClick={() => {}}
          />
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
