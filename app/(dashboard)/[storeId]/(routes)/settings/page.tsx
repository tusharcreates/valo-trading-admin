import SettingForm from "@/components/settings-form";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { Store } from "@prisma/client";
import { redirect } from "next/navigation";

import { useForm } from "react-hook-form";
import * as z from "zod";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

interface SettingsFormProps {
  initialData: Store;
}

const SettingsForm: React.FC<SettingsFormProps> = (initialData) => {
  return (
    <div>
      <SettingForm
        title="Settings"
        subtitle="Manage your store settings"
        initialData={initialData.initialData}
      />
    </div>
  );
};

const settingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  const { storeId } = params;

  const store = await prismadb.store.findFirst({
    where: {
      id: Number(storeId),
      userId: userId,
    },
  });

  if (!store) {
    redirect("/");
  }
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
};

export default settingsPage;
