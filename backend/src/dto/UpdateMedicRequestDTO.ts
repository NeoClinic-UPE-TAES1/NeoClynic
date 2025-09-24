import { Consultation } from "../domain/entity/Consultation";

export type UpdateMedicRequest = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  specialty?: string;
  consultation?: Consultation[];
}
