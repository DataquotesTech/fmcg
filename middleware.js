import { NextResponse } from "next/server";

export function middleware(req) {
  if (
    req.nextUrl.pathname === "/ads.txt" ||
    req.nextUrl.pathname === "/ad.txt"
  ) {
    return NextResponse.redirect(
      "https://srv.adstxtmanager.com/19390/fmcginfluencers.com"
    );
  }
}
