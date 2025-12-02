// tests/integration/user.integration.test.ts
import { PrismaClient } from "@prisma/client";
import { AdminService } from "../../../src/modules/admin/service/AdminService";
import { AdminRepository } from "../../../src/modules/admin/domain/repository/AdminRepository";
import { prisma } from "../../../src/infra/database/prismaClient";

describe("User integration with real DB", () => {
    let prismaClient: PrismaClient;
    let adminRepository: AdminRepository;
    let adminService: AdminService;

    beforeAll(() => {
        prismaClient = prisma;
        adminRepository = new AdminRepository();
        adminService = new AdminService(adminRepository);
    });
    afterAll(async () => {
        await prismaClient.$disconnect();
    });


    test("Update Admin", async () => {
        const email = process.env.INIT_ADMIN_EMAIL!;

        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin) throw new Error("Initial admin not found in DB for test setup");

        const oldName = admin.name;
        const newName = "Jane Doe";

        const updatedAdmin = await adminService.update(admin.id, newName, undefined, undefined, admin.id, undefined);
        expect(updatedAdmin.name).toBe(newName);
        expect(updatedAdmin.email).toBe(admin.email);

        await adminService.update(admin.id, oldName, undefined, undefined, admin.id, undefined);
    }
    );
    
});
