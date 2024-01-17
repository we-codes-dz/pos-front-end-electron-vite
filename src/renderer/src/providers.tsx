import { NextUIProvider } from '@nextui-org/react'
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Providers({ children }: { children: React.ReactNode }) {
    return <NextUIProvider>{children}</NextUIProvider>
}
