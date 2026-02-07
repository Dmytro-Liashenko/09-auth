import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    const { pathname } = request.nextUrl;

    const isAuthRoute =
        pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");
    const isPrivateRoute =
        pathname.startsWith("/profile") || pathname.startsWith("/notes");


    const hasCookies = request.cookies.size > 0;
    const isAuthenticated = hasCookies;

    if (!isAuthenticated && isPrivateRoute) {
        return NextResponse.redirect(new URL("/sign-in", request.url));
    }

    if (isAuthenticated && isAuthRoute) {
        return NextResponse.redirect(new URL("/profile", request.url));
    }

    return NextResponse.next();
    }