import { ReactNode } from "react";
import { Footer } from "./Footer";
import { Nav } from "./Nav";

export interface AppLayoutProps {
    children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
    return (
        <>
            <Nav />
            <div className="relative overflow-hidden pb-4">
                <div className="mx-auto flex w-full max-w-screen-md flex-col items-center">
                    {children}
                </div>
            </div>
            <Footer />
        </>
    );
}
