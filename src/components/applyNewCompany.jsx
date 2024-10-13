import { useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "./ui/drawer";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import useFetch from "@/hooks/useFetch";
import { addNewCompany } from "@/api/apicompanies";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BarLoader } from "react-spinners";

const schema = z.object({
  name: z.string().min(1, { message: "Company Name is required" }),
  logo: z
    .any()
    .refine(
      (file) =>
        file &&
        file.length > 0 &&
        (file[0]?.type === "image/png" || file[0]?.type === "image/jpeg"),
      {
        message: "Only Images are allowed",
      }
    ),
});

const ApplyNewCompany = ({ fetchCompanies }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const {
    loading: loadingAddCompany,
    fn: fnAddCompany,
    error: errorAddCompany,
    data: dataAddCompany,
  } = useFetch(addNewCompany);

  const onSubmit = (data) => {
    if (data.logo && data.logo.length > 0) {
      fnAddCompany({
        ...data,
        logo: data.logo[0],
      });
    } else {
      console.error("No file selected");
    }
  };

  useEffect(() => {
    if (dataAddCompany?.length > 0) fetchCompanies();
  }, [loadingAddCompany]);

  return (
    <Drawer>
      <DrawerTrigger >
        <Button
          type="button"
          size="sm"
          variant="secondary"
          className="w-full sm:w-auto md:text-2xl p-7 "
        >
          Add Company
        </Button>
      </DrawerTrigger>
      <DrawerContent className="md:w-full w-full  sm:w-96 p-4">
        <DrawerHeader>
          <DrawerTitle className="text-lg sm:text-xl md:text-center">
            Add New Company
          </DrawerTitle>
        </DrawerHeader>

        <form
          className="flex flex-col gap-4 p-4 pb-0 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            placeholder="Company name"
            className="w-full xl:w-full sm:w-2/3 lg:w-1/2 md:text-2xl"
            {...register("name")}
          />

          <Input
            type="file"
            accept="image/*"
            className="file:text-gray-500 xl:w-full  md:text-2xl w-full sm:w-2/3 lg:w-1/2"
            {...register("logo")}
          />

          <Button
            type="submit"
            variant="destructive"
            className="w-full xl:w-full md:w-full md:text-xl sm:w-2/3 lg:w-1/4"
          >
            Add
          </Button>

          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
          {errors.logo && (
            <p className="text-red-500 text-sm">{errors.logo.message}</p>
          )}
          {errorAddCompany?.message && (
            <p className="text-red-500 text-sm">{errorAddCompany?.message}</p>
          )}

          {loadingAddCompany && (
            <BarLoader width={"100%"} color="blue" className="mt-5" />
          )}
        </form>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="secondary" type="button" className="md:text-xl">
              Cancel
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ApplyNewCompany;
