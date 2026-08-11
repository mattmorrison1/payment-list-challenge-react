import { useQuery } from '@tanstack/react-query';
import { fetchPayments } from '../services/payments';
import { PaymentsParams } from '../types/payment';


export const useFetchPayments = (params: PaymentsParams) => {
    return useQuery({
        queryKey: ['payments', params],
        queryFn: () => fetchPayments(params)
    })
}