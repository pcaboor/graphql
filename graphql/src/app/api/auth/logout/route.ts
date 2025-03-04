import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json({ success: true });
    // Supprime le cookie en mettant Max-Age=0
    res.headers.append("Set-Cookie", "jwt=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0");
    return res;
}
