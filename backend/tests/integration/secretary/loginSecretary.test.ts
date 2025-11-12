// tests/integration/user.integration.test.ts
import { PrismaClient } from "@prisma/client";
import { prisma } from "../../../src/infra/database/prismaClient";
import { SecretaryService } from "../../../src/modules/secretary/service/SecretaryService";
import { SecretaryRepository } from "../../../src/modules/secretary/domain/repository/SecretaryRepository";
import { AdminRepository } from "../../../src/modules/admin/domain/repository/AdminRepository";
import { AuthSecretaryService } from "../../../src/modules/secretary/service/AuthSecretaryService";
import { JWTProvider } from "../../../src/infra/providers/auth/JWTProvider";
import { NodemailerProvider } from "../../../src/infra/providers/email/NodeMailerProvider";

describe("User integration with real DB", () => {
    let prismaClient: PrismaClient;
    let secretaryRepository: SecretaryRepository;
    let adminRepository: AdminRepository;
    let secretaryService: SecretaryService;
    let authSecretaryService: AuthSecretaryService;
    let jwtProvider: JWTProvider;
    let emailProvider: NodemailerProvider;

    beforeAll(() => {
        prismaClient = prisma;
        jwtProvider = new JWTProvider();
        emailProvider = new NodemailerProvider();
        secretaryRepository = new SecretaryRepository();
        adminRepository = new AdminRepository();
        secretaryService = new SecretaryService(secretaryRepository, adminRepository);
        authSecretaryService = new AuthSecretaryService(secretaryRepository, jwtProvider, emailProvider);
    });
    afterAll(async () => {
        await prismaClient.$disconnect();
    });
    beforeEach(async () => {
        await prismaClient.secretary.deleteMany();
    });

    test("Login Secretary", async () => {
        const name = "John Doe";
        const email = "JohnDoe@gmail.com"
        const password = "password123";
        await secretaryService.create(name, email, password);
        const login = await authSecretaryService.authenticate(email, password);
        expect(login).toHaveProperty("token");
        expect(login?.secretary).toHaveProperty("id");
        expect(login?.secretary.name).toBe(name);
        expect(login?.secretary.email).toBe(email);
    });

});
