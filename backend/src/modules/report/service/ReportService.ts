import { IReportRepository } from "../domain/repository/IReportRepository";
import { CreateReportRequest } from "../dto/CreateReportRequestDTO";
import { DeleteReportRequest } from "../dto/DeleteReportRequestDTO";
import { ListReportRequest } from "../dto/ListReportRequestDTO";
import { ReportResponse } from "../dto/ReportResponseDTO";
import { UpdateReportRequest } from "../dto/UpdateReportRequestDTO";
import { AppError } from "../../../core/errors/AppError";

export class ReportService {
  constructor(
    private ReportRepository: IReportRepository
  ) {
  }

  async create(description: string, diagnosis: string, prescription: string, consultationId: string): Promise<ReportResponse> {
    const registerData: CreateReportRequest = {
      description,
      diagnosis,
      prescription: prescription ?? '',
      consultationId,
    };

    return await this.ReportRepository.create(registerData);
  }

  async update(id:string, description: string |  undefined, diagnosis: string |  undefined, prescription: string |  undefined): Promise<ReportResponse> {
    const report = await this.ReportRepository.findById(id);
    if (!report) {
      throw new AppError("Report not exists.", 404);
    }

    const updateRequest: UpdateReportRequest = {
    id,
    description,
    diagnosis,
    prescription,
    };

    return await this.ReportRepository.update(updateRequest);
  }
  
  async list(id: string): Promise<ReportResponse> {
    const report = await this.ReportRepository.findById(id);
    if (!report) {
      throw new AppError("Report not exists.", 404);
    }

    const list: ListReportRequest = { id: report.id };
    return await this.ReportRepository.listReport(list);
  }
  
  async delete(id: string): Promise<void> {
    const report = await this.ReportRepository.findById(id);
    if (!report) {
      throw new AppError("Report not exists.", 404);
    }

    const deleteRequest: DeleteReportRequest = { id };
    await this.ReportRepository.delete(deleteRequest);
  }

}
