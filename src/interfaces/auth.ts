export interface Permission {
  resource: string;
  description: string | null;
  actions: string[];
}

export interface Role {
  id: number;
  name: string;
  permissions: Permission[];
  editable: boolean;
  deletable: boolean;
}
export interface User {
  id: number;
  username: string;
  name: string;
  roles_desc: string;
  roles: Role[];
  editable: boolean;
  deletable: boolean;
}
