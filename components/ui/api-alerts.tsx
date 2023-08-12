import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "./badge";
import { Copy, Server } from "lucide-react";
import { Button } from "./button";
import { toast } from "react-hot-toast";

interface AlertModalProps {
  title: string;
  description: string;
  variant: "public" | "admin";
}

const textMap: Record<AlertModalProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
};

const variantMap: Record<AlertModalProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "destructive",
};

const onCopy = (description: string) => {
  navigator.clipboard.writeText(description);
  toast.success("Copied to clipboard");
};

export const ApiAlterModal: React.FC<AlertModalProps> = ({
  title,
  description,
  variant = "public",
}) => {
  return (
    <Alert>
      <Server className="h-4 w-4" />
      <AlertTitle className="flex items-center gap-x-2">
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className="mt-4 flex items-center justify-between">
        <code className="relative rounded bg-muted px-[0.3rem] front-mono text-sm font-semibold">
          {description}
        </code>
        <Button
          variant="outline"
          onClick={() => {
            onCopy(description);
          }}
        >
          <Copy className="w-4 h-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
