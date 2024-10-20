import { cn } from "@/lib/utils";

interface SidebarContentWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const SidebarContentWrapper = ({
  children,
  className,
}: SidebarContentWrapperProps) => {
  return (
    <div className={cn("bg-neutral-900 rounded-lg h-fit w-full", className)}>
      {children}
    </div>
  );
};

export default SidebarContentWrapper;
