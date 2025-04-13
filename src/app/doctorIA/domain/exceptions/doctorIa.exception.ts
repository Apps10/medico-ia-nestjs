import { makeCustomException } from "src/common/exception/customException";
import { messageError } from "./messageError";

export const DiagnosticException = makeCustomException(messageError.DIAGNOSTIC_ERROR)