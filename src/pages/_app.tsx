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
          async src="https://umamianalytics.netlify.app/script.js" data-website-id="3e8fc22d-68c2-483c-92f7-106e42e15d67"
        />
      </LayOut>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
