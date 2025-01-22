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
            resource: "Item",
            description: null,
            actions: ["read", "delete", "create", "update"],
          },
          {
            resource: "Request",
            description: null,
            actions: ["read", "delete", "create", "update"],
          },
          {
            resource: "ItemSPA",
            description: null,
            actions: ["read", "create"],
          },
          {
            resource: "Requests",
            description: null,
            actions: ["read"],
          },
          {
            resource: "Trucks",
            description: null,
            actions: ["read"],
          },
          {
            resource: "Cargos",
            description: null,
            actions: ["read"],
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
