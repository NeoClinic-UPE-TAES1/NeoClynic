// tests/integration/user.integration.test.ts
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../src/infra/database/prismaClient";
import { AdminRepository } from "../../../src/modules/admin/domain/repository/AdminRepository";
import { AuthAdminService } from "../../../src/modules/admin/service/AuthAdminService";
import { JWTProvider } from "../../../src/infra/providers/auth/JWTProvider";
import { NodemailerProvider } from "../../../src/infra/providers/email/NodeMailerProvider";
import speakeasy from "speakeasy";

describe("User integration with real DB", () => {
    let prismaClient: PrismaClient;
    let adminRepository: AdminRepository;
    let authAdminService: AuthAdminService;
    let jwtProvider: JWTProvider;
    let emailProvider: NodemailerProvider;

    beforeAll(() => {
        prismaClient = prisma;
        jwtProvider = new JWTProvider();
        emailProvider = new NodemailerProvider();
        adminRepository = new AdminRepository();
        authAdminService = new AuthAdminService(adminRepository, jwtProvider, emailProvider);
    });
    afterAll(async () => {
        await prismaClient.$disconnect();
    });

    test("Login Admin", async () => {
        const email = process.env.INIT_ADMIN_EMAIL!;
        const password = process.env.INIT_ADMIN_PASSWORD!;

        const admin = await prisma.admin.findUnique({ where: { email } });
        expect(admin).not.toBeNull();

        const twoFactorCode = speakeasy.totp({
            secret: admin!.twoFactorSecret!,
            encoding: "base32"
        });

        const login = await authAdminService.authenticate(email, password, twoFactorCode);

        expect(login).toHaveProperty("token");
        expect(login?.admin).toHaveProperty("id");
        });

});
