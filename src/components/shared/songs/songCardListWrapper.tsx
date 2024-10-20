interface SongCardListWrapperProps {
  children: React.ReactNode;
}

const SongCardListWrapper = ({ children }: SongCardListWrapperProps) => {
  return (
    <div
      className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-8 
        gap-4 
        mt-4
      "
    >
      {children}
    </div>
  );
};

export default SongCardListWrapper;
