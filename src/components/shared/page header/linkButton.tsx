import Link from "next/link";
import { Button } from "@/components/ui/button";

type LinkButtonProps = {
  href: string;
  text: string;
}
const LinkButton = ({ href, text }: LinkButtonProps) => {
  return (
    <Button variant="secondary" asChild={true}>
      <Link href={href}>{text}</Link>
    </Button>
  );
};

export default LinkButton;
