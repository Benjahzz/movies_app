import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast';
import LayoutAuth from '@/components/layouts/LayoutAuth';
import { Inter, Roboto } from 'next/font/google';
import type { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import ShowModal from '@/components/modals/ShowModal';
import ChangeAvatarModal from '@/components/profile/ChangeAvatarModal';

const roboto = Roboto({
  weight: ['100', '400', '500', '700', '900'],
  subsets: ['latin'],
})

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {

  const getLayout = Component.getLayout ?? ((page) => page);
  return getLayout(<SessionProvider session={session}>
    <style jsx global>{`
      html {
        font-family: ${roboto.style.fontFamily};
      }
    `}</style>
    <Toaster />
    <ShowModal />
    <ChangeAvatarModal />

    <Component {...pageProps} />
  </SessionProvider>);
}