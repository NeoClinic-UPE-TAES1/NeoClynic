import { Consultation } from "../../consultation/domain/entity/Consultation";

export type UpdateMedicRequest = {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  specialty?: string;
  consultation?: Consultation[];
}
