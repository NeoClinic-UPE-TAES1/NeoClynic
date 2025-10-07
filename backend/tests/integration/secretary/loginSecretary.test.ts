// tests/integration/user.integration.test.ts
import { PrismaClient } from "@prisma/client";
import { SecretaryService } from "../../../src/modules/secretary/service/SecretaryService";
import { prisma } from "../../../src/infra/database/prismaClient";
import { SecretaryRepository } from "../../../src/modules/secretary/domain/repository/SecretaryRepository";
import { AuthSecretaryService } from "../../../src/modules/secretary/service/AuthSecretaryService";
import { JWTProvider } from "../../../src/infra/providers/auth/JWTProvider";

describe("User integration with real DB", () => {
    let prismaClient: PrismaClient;
    let secretaryRepository: SecretaryRepository;
    let secretaryService: SecretaryService;
    let authSecretaryService: AuthSecretaryService;
    let jwtProvider: JWTProvider;

    beforeAll(() => {
        prismaClient = prisma;
        jwtProvider = new JWTProvider();
        secretaryRepository = new SecretaryRepository();
        secretaryService = new SecretaryService(secretaryRepository);
        authSecretaryService = new AuthSecretaryService(secretaryRepository, jwtProvider);
    });
    afterAll(async () => {
        await prismaClient.$disconnect();
    });
    beforeEach(async () => {
        await prismaClient.secretary.deleteMany();
    });

    test("Create Secretary", async () => {
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
