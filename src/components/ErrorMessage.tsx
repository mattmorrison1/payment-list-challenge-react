import axios from "axios";
import { ErrorBox } from "./components";
import { I18N } from "../constants/i18n";

const getErrorMessage = (error: unknown) => {
  if (!axios.isAxiosError(error)) {
    return I18N.SOMETHING_WENT_WRONG;
  }

  const status = error.response?.status;

  switch (status) {
    case 404:
      return I18N.PAYMENT_NOT_FOUND;
    case 500:
      return I18N.INTERNAL_SERVER_ERROR;
    default:
      return I18N.SOMETHING_WENT_WRONG;
  }
};

export const ErrorMessage = ({ error }: { error: unknown }) => (
  <ErrorBox role="alert">{getErrorMessage(error)}</ErrorBox>
);
