import { PaginationButton, PaginationRow } from "./components";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  previousLabel: string;
  nextLabel: string;
  pageLabel: string;
  onPrevious: () => void;
  onNext: () => void;
}

export const Pagination = ({
  currentPage,
  totalPages,
  previousLabel,
  nextLabel,
  pageLabel,
  onPrevious,
  onNext,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <PaginationRow>
      <PaginationButton type="button" onClick={onPrevious} disabled={currentPage <= 1}>
        {previousLabel}
      </PaginationButton>
      <span>
        {pageLabel} {currentPage}
      </span>
      <PaginationButton type="button" onClick={onNext} disabled={currentPage >= totalPages}>
        {nextLabel}
      </PaginationButton>
    </PaginationRow>
  );
};
