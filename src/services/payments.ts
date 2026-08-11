import axios from 'axios';
import { PaymentSearchResponse, PaymentsParams } from '../types/payment';
import { API_URL } from '../constants';

export const fetchPayments = async (params: PaymentsParams): Promise<PaymentSearchResponse> => {
  const response = await axios.get<PaymentSearchResponse>(API_URL, { params });
  return response.data;
};