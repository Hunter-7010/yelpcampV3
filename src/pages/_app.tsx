import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import LayOut from "~/components/layout/Layout";

import { api } from "~/utils/api";
import Script from "next/script";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <LayOut>
        <Component {...pageProps} />
        <Script
          async
          defer
          data-website-id="645b9926-6990-4e1d-8491-4a2bd8585dbf"
          src="https://umami-production-f85b.up.railway.app/umami.js"
        />
      </LayOut>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
