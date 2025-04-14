import { makeCustomException } from "src/common/exception/customException";
import { messageError } from "./messageError";
import { makeCustomHttpException } from "src/common/exception/customHttpException";
import { HttpStatus } from "@nestjs/common";

export const DiagnosticException = makeCustomException(messageError.DIAGNOSTIC_ERROR)
export const LogsNoRegisteredHttpException = makeCustomHttpException(messageError.LOGS_NOT_REGISTER, HttpStatus.NOT_FOUND)