# Contributing

Regras que envolvem o processo de desenvolvimento e contribuição do projeto, auxiliando a manutenção do fluxo organizado e consistente.

---

## 🔀 Estratégia de Branches

-   **`main`** → Código em produção.
    -   Protegida por ruleset, **não permite push force e nem contribuições diretas**.
    -   Deve receber solicitações de merge de `homologation` ou `hotfix/*`.
    -   Workflow de deploy.

-   **`homologation`** → Branch para testes em ambiente de homologação.
    -   Deve receber solicitações de merge de `development`.
    -   Depois de validado, é integrada em `main`.
    -   Workflow de validação de "code smells" e vulnerabilidades.

-   **`development`** → Branch principal de integração.
    -   Deve receber solicitações de merge de `feature/*` ou `bugfix/*`.
    -   Integração contínua de features.
    -   Workflow de testes automatizados, garantindo a estabilidade para futuras integrações.

-   **`feature/*`** → Novas funcionalidades.
    -   Exemplo: `feature/login-screen`.

-   **`bugfix/*`** → Correções que não estão em produção ainda.
    -   Exemplo: `bugfix/fix-null-pointer`.

-   **`hotfix/*`** → Correções críticas em produção.
    -   Exemplo: `hotfix/fix-auth-token`.

---

## 💻 Fluxo de Desenvolvimento

**1. Crie uma branch a partir de `development`:**
```
git checkout development
git pull origin development
git checkout -b feature/nome-da-feature
```

**2. Faça commits pequenos e descritivos:**
-   Use inglês, preferencialmente.
  ```
  feat: add login validation
  fix: resolve crash when user logs out
  ```

**3. Abra um Pull Request (PR):**
-   **De:** `feature/*` ou `bugfix/*`
-   **Para:** `development`

Regras do PR:
-   Descrição clara da mudança.
-   Issue relacionada (Ex: `Closes #123`).
-   Prints ou logs, se aplicável.

---

## ✅ Revisão de Código

-   Todo PR precisa de, no mínimo, **2 aprovações**.
-   Não pode ser aprovado pelo próprio autor.
-   Os reviwers devem ser obrigatóriamente compostos pelo Scrum Master, e outro Developer da mesma stack do autor.

O merge só é liberado quando:
-   O pipeline de CI/CD passou com sucesso.
-   Nenhum reviewer bloqueou a alteração.

---

## 🚀 Deploy

-   **`development`** → Ambiente de Desenvolvimento
-   **`homologation`** → Ambiente de Homologação
-   **`main`** → Produção (merge via PR, depois de validação).

---

## 👥 Papéis

-   **Todos os Devs:** Podem abrir PRs e revisar.
-   **Scrum Master:** Responsável pela aprovação final do merge de `homologation` para `main`.
-   **DevOps:** Monitora deploys e incidentes.