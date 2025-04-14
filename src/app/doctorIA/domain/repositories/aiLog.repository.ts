import { ICreateIaLog, IIaLog } from "../IIalog";

export abstract class AILogRepository {
  abstract saveLog(log: ICreateIaLog): Promise<void>;
  abstract getLogs(): Promise<IIaLog[] | []>;
}