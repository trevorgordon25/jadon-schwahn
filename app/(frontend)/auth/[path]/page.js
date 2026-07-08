import { AuthView } from "@neondatabase/auth/react";

export const dynamicParams = false;

export default async function AuthPage({ params }) {
    const { path } = await params;
    return <AuthView path={path} />;
}
