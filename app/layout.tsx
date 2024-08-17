import { clerkClient, auth } from "@clerk/nextjs/server";

import { ActiveOrg } from "@/utils/activeOrg";
import { Providers } from "@/providers";

import { Configrator } from "@/components/configrator";
import { Sidebar } from "@/components/sidebar";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import "./sass/index.scss";

export const metadata = {
    title: "Info Manage",
};

type LayoutProps = {
    children: React.ReactNode;
};

const Layout = async ({ children }: LayoutProps) => {
    const { userId } = auth();
    if (!userId) return <NotSignedIn>{children}</NotSignedIn>;

    const orgs = await clerkClient().users.getOrganizationMembershipList({ userId });
    const orgId = orgs?.data[0]?.organization.id;

    if (!orgId) return <NotSignedIn>{children}</NotSignedIn>;

    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-gradient min-h-screen">
                <Providers>
                    <ActiveOrg orgId={orgId} />
                    <Header />
                    <Sidebar />
                    <div className="m-auto mb-16 min-h-[calc(100vh-200px)] max-w-screen-xl p-2 sm:p-4">{children}</div>
                    <Configrator />
                    <Footer />
                </Providers>
            </body>
        </html>
    );
};

function NotSignedIn({ children }: LayoutProps) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className="bg-gradient min-h-screen">
                <Providers>
                    <Header />
                    <div className="m-auto mb-16 min-h-[calc(100vh-200px)] max-w-screen-xl p-2 sm:p-4">{children}</div>
                    <Configrator />
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}

NotSignedIn.displayName = "NotSignedIn";

export default Layout;
