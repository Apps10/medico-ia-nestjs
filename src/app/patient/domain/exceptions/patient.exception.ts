import { makeCustomException } from "src/common/exception/customException";
import { messageError } from "./messageError";
import { HttpStatus } from "@nestjs/common";

export const PatientNotFoundHttpException = makeCustomException(messageError.NOT_FOUND, HttpStatus.NOT_FOUND)