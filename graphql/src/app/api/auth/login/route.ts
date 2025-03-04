import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { identifier, password } = await req.json();

        const credentials = btoa(`${identifier}:${password}`);
        const response = await fetch("https://zone01normandie.org/api/auth/signin", {
            method: "POST",
            headers: {
                "Authorization": `Basic ${credentials}`,
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            return NextResponse.json({ error: "Identifiants incorrects" }, { status: 401 });
        }

        const data = await response.json();

        console.log("data", data);

        const res = NextResponse.json({ success: true });

        console.log("res", res);

        // Stocke le token en cookie sécurisé HttpOnly
        res.cookies.set('jwt', data, {
            maxAge: 86400,
            path: '/'
        });

        return res;
    } catch {
        return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
    }
}
