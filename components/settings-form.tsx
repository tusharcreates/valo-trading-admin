"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Store } from "@prisma/client";
import axios from "axios";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { set, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import * as z from "zod";
import { AlertModal } from "./modals/alert-modal";
import { ApiAlterModal } from "./ui/api-alerts";
import { useOrigin } from "@/hooks/use-origin";

interface SettingsFormProps {
  initialData: Store;
}

const SettingForm: React.FC<{
  title: string;
  subtitle: string;
  initialData: SettingsFormProps["initialData"];
}> = ({ title, subtitle, initialData }) => {
  const formSchema = z.object({
    name: z.string().min(1),
  });

  type SettingsFormValues = z.infer<typeof formSchema>;

  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const params = useParams();
  const origin = useOrigin();

  const onSubmit = async (values: SettingsFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, values);
      router.refresh();
      toast.success("Store updated");
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("Store deleted");
    } catch (e) {
      console.error(e);
      toast.error("Make sure you don't have any products in your store");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => {
          setOpen(false);
        }}
        onConfirm={onDelete}
        loading={loading}
      ></AlertModal>
      <div className="flex flex-row justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div>
          <Button
            disabled={loading}
            onClick={() => {
              setOpen(true);
            }}
            variant={"destructive"}
            size={"icon"}
          >
            <Trash></Trash>
          </Button>
        </div>
      </div>
      <Separator className="my-2" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-ful"
        >
          <div>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Store Name"
                      className="max-w-md"
                      {...field}
                    ></Input>
                  </FormControl>
                  <FormMessage></FormMessage>
                </FormItem>
              )}
            />
          </div>
          <Button>Save Changes</Button>
        </form>
      </Form>
      <Separator className="my-3" />
      <ApiAlterModal
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      ></ApiAlterModal>
    </>
  );
};

export default SettingForm;
