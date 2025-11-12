import { ReportResponse } from "../../dto/ReportResponseDTO";
import { CreateReportRequest } from "../../dto/CreateReportRequestDTO";
import { UpdateReportRequest } from "../../dto/UpdateReportRequestDTO";
import { DeleteReportRequest } from "../../dto/DeleteReportRequestDTO";
import { ListReportRequest } from "../../dto/ListReportRequestDTO";
import { Report } from "../entity/Report";

export interface IReportRepository {
    create(createReport: CreateReportRequest): Promise<ReportResponse>;
    update(updateReport: UpdateReportRequest): Promise<ReportResponse>;
    delete(deleteReport: DeleteReportRequest): Promise<void>;
    listReport(listReport: ListReportRequest): Promise<ReportResponse>;

    findById(id: string): Promise<Report | null>;
    findByConsultationId(consultationId: string): Promise<Report | null>;
}