import { type ReactNode } from 'react';
import { StoreProvider } from './StoreProvider';
import './global.css';

interface Props {
  readonly children: ReactNode;
}

export default function RootLayout({ children }: Props) {
  return (
    <StoreProvider>
      <html lang='en' suppressHydrationWarning={true}>
        <body suppressHydrationWarning={true}>{children}</body>
      </html>
    </StoreProvider>
  );
}
