import { makeCustomHttpException } from "src/common/exception/customHttpException";
import { messageError } from "./messageError";
import { HttpStatus } from "@nestjs/common";

export const PatientNotFoundHttpException = makeCustomHttpException(messageError.NOT_FOUND, HttpStatus.NOT_FOUND)