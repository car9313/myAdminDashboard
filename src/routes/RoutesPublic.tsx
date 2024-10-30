import { routeInfo } from "@/data/routeInfo";

export const RoutersPublic: {
  path: string;
  lazy: () => Promise<{
    Component: () => JSX.Element;
  }>;
}[] = [
  /*  {
    path: routeInfo.PRUEBA.path,
    lazy: async () => ({
      Component: (await import('../pages/auth/components/LoginComponent'))
        .default,
    }),
  }, */
  {
    path: routeInfo.SIGNIN.path,
    lazy: async () => ({
      Component: (await import("../pages/auth/sign-in")).default,
    }),
  },
  {
    path: routeInfo.SIGNIN2.path,
    lazy: async () => ({
      Component: (await import("../pages/auth/sign-in-2")).default,
    }),
  },
  {
    path: routeInfo.SIGNUP.path,
    lazy: async () => ({
      Component: (await import("../pages/auth/sign-up")).default,
    }),
  },
  {
    path: routeInfo.FORGOTPASSWORD.path,
    lazy: async () => ({
      Component: (await import("../pages/auth/forgot-password")).default,
    }),
  },
  {
    path: routeInfo.OTP.path,
    lazy: async () => ({
      Component: (await import("../pages/auth/otp")).default,
    }),
  },
];
