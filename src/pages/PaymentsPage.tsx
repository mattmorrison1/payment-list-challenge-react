import React, { FormEvent, useState } from "react";
import { Container, FilterRow, SearchButton, SearchInput, Spinner, StatusBadge, TableCell, Title, ClearButton } from "../components/components";
import { ErrorMessage } from "../components/ErrorMessage";
import { useFetchPayments } from "../hooks/useFetchPayments";
import { Table } from "../components/Table";
import { Payment } from "../types/payment";
import { I18N } from "../constants/i18n";
import { formatDate } from "../utils/dateFormatter";

export const PaymentsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [search, setSearch] = useState('');

  const searchParams = {
    page: 1,
    pageSize: 5,
    search,
    currency: ''
  };

  const { data: paymentData, error, isError } = useFetchPayments(searchParams);

  const columns: { key: keyof Payment; header: string; render?: (item: Payment) => React.ReactNode; }[] = [
    { key: 'id', header: I18N.TABLE_HEADER_PAYMENT_ID },
    { key: 'date', header: I18N.TABLE_HEADER_DATE, render: (p) => <TableCell key="date">{formatDate(p.date)}</TableCell>, },
    { key: 'amount', header: I18N.TABLE_HEADER_AMOUNT, render: (p) => <TableCell key="amount">{p.amount.toFixed(2)}</TableCell>, },
    { key: 'customerName', header: I18N.TABLE_HEADER_CUSTOMER },
    { key: 'currency', header: I18N.TABLE_HEADER_CURRENCY },
    { key: 'status', header: I18N.TABLE_HEADER_STATUS, render: (p) => <TableCell key="status"><StatusBadge status={p.status}>{p.status}</StatusBadge></TableCell>, }
  ]

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    setSearch(searchTerm.trim());
  };

  const showClear = search != '';

  const resetFilters = () => {
    setSearchTerm(''); 
    setSearch('');
  }

  return (
    <Container>
      <Title>{I18N.PAGE_TITLE}</Title>

      <form onSubmit={handleSubmit}>
        <FilterRow>
          <SearchInput
            aria-label={I18N.SEARCH_LABEL}
            placeholder={I18N.SEARCH_PLACEHOLDER}
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <SearchButton type="submit">{I18N.SEARCH_BUTTON}</SearchButton>
          {showClear &&
            <ClearButton type="button" onClick={resetFilters}>
              {I18N.CLEAR_FILTERS}
            </ClearButton>}
        </FilterRow>
      </form>

      {isError ? (
        <ErrorMessage error={error} />
      ) : paymentData ? (
        <Table<Payment> columns={columns} data={paymentData.payments} />
      ) : (
        <Spinner />
      )}

    </Container>
  );
};