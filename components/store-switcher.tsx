"use client";

import { Store } from ".prisma/client";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useStoreModal } from "@/hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { Check, ChevronsUpDown, PlusIcon, StoreIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandList,
  CommandSeparator,
  CommandItem,
} from "./ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<
  typeof PopoverTrigger
>;

interface storeSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

export default function Switcher({ className, items }: storeSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();
  const formattedItems = items?.map((item) => ({
    label: item.name,
    value: Number(item.id),
  }));

  const currentStore = formattedItems?.find((item) => {
    return item.value === Number(params.storeId);
  });

  const [open, setOpen] = useState(false);

  const onStoreSelect = (store: { value: number; label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          role="combobox"
          aria-expanded={open}
          aria-label="select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="mr-2 h-4 w-4"></StoreIcon>
          {currentStore?.label || "Select a store"}
          <ChevronsUpDown className="h-4 w-4 ml-auto shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search Store..."></CommandInput>
            <CommandEmpty>No Store Found</CommandEmpty>
            <CommandGroup heading="store">
              {formattedItems?.map((store) => (
                <CommandItem
                  key={store.value}
                  onSelect={() => onStoreSelect(store)}
                >
                  <StoreIcon className="mr-2 h-4 w-4"></StoreIcon>
                  {store.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      (store.value === currentStore?.value && "opacity-100") ||
                        "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
              >
                <PlusIcon className="mr-2 h-4 w-4"></PlusIcon>
                Create Store
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
