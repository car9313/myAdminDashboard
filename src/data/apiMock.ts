import { User } from "@/interfaces/auth";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const mockUsers: User[] = [
  {
    id: 1,
    username: "admin",
    name: "Admin",
    roles_desc: "Administrador",
    roles: [
      {
        id: 1,
        name: "Administrador",
        permissions: [
          { resource: "Audit", description: null, actions: ["read"] },
          {
            resource: "CauseRejection",
            description: null,
            actions: ["read", "update", "create", "delete"],
          },
          {
            resource: "Municipalities",
            description: null,
            actions: ["read", "update", "create", "delete"],
          },
          {
            resource: "Provinces",
            description: null,
            actions: ["read", "update", "create", "delete"],
          },
          {
            resource: "CertifyRequest",
            description: null,
            actions: ["update"],
          },
          {
            resource: "RequestOficina",
            description: null,
            actions: ["read", "update"],
          },
          {
            resource: "Request",
            description: null,
            actions: ["read", "update"],
          },
          { resource: "VerifyRequest", description: null, actions: ["update"] },
          {
            resource: "RequestAddress",
            description: null,
            actions: ["read", "update"],
          },
          {
            resource: "SecuritySettings",
            description: null,
            actions: ["update"],
          },
          { resource: "ResetPassword", description: null, actions: ["update"] },
          {
            resource: "Role",
            description: null,
            actions: ["read", "create", "update", "delete"],
          },
          {
            resource: "User",
            description: null,
            actions: ["read", "create", "delete", "update"],
          },
        ],
        editable: false,
        deletable: false,
      },
    ],
    editable: true,
    deletable: false,
  },
];
export const api = {
  login: async (username: string, password: string) => {
    await delay(500);
    const user = mockUsers.find((u) => u.username === username);
    if (!user) throw new Error("Invalid credentials");
    return {
      user,
      accessToken: "0123456789",
      refreshAccessToken: "9876543210",
    }; // Devuelvo el token asociado
  },
};
