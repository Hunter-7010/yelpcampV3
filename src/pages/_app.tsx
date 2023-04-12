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
          data-website-id="d2965b22-27c8-441e-b3a2-21896266844e"
          src="https://umamianalytics.netlify.app/umami.js"
        />
      </LayOut>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
