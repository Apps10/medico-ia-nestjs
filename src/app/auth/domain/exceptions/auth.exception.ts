import { makeCustomHttpException } from "src/common/exception/customHttpException";
import { messageError } from "./messageError";
import { HttpStatus } from "@nestjs/common";

export const AuthUnauthorizedHttpException = makeCustomHttpException(messageError.Unauthorized, HttpStatus.UNAUTHORIZED)