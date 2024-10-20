import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FormCardWrapperProps {
  title: string;
  description?: string;
  cardStyle?: string;
  cardHeaderStyle?: string;
  cardContentStyle?: string;
  children: React.ReactNode;
}

const FormCardWrapper = ({
  title = "",
  description = "",
  cardStyle = "",
  cardHeaderStyle = "",
  cardContentStyle = "",
  children,
}: FormCardWrapperProps) => {
  return (
    <Card
      className={cn(
        "text-white bg-[rgba(38,38,38,1)] border-none shadow-md",
        cardStyle
      )}
    >
      <CardHeader className={cn("items-center", cardHeaderStyle)}>
        <CardTitle className="text-3xl">{title}</CardTitle>
        <CardDescription className="text-slate-100">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className={cardContentStyle}>{children}</CardContent>
    </Card>
  );
};

export default FormCardWrapper;
