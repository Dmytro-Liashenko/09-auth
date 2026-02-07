import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    if (pathname.startsWith("/api")) {
        return NextResponse.next();
    }

    const isAuthRoute =
        pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
    const isPrivateRoute =
        pathname.startsWith("/profile") || pathname.startsWith("/notes");

    const accessToken = request.cookies.get("accessToken");
    const isAuthenticated = Boolean(accessToken);

    if (!isAuthenticated && isPrivateRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (isAuthenticated && isAuthRoute) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    return NextResponse.next();
}

    export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    ],
};