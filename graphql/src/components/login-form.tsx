'use client'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import React from "react"
import { useRouter } from "next/navigation"
import signIn from "@/app/hooks/useSignIn"



export function LoginForm({
    className,
    ...props
}: React.ComponentPropsWithoutRef<"div">) {
    const router = useRouter();
    const [identifier, setIdentifier] = React.useState("")
    const [password, setPassword] = React.useState("")
    const [error, setError] = React.useState("")
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        setError("")

        if (!identifier || !password) {
            setError("Please fill out all fields")
            return
        }
        try {
            await signIn(identifier, password)
            router.push("/");
        } catch (error) {
            setError((error as Error).message)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label >Email ou Username</Label>
                                <Input
                                    //  id="email"
                                    placeholder="Identifiant"
                                    required
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                />
                            </div>
                            <Input id="password" type="password" required
                                value={password}
                                placeholder="Mot de passe"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button type="submit" className="w-full" disabled={isSubmitting}>
                                {isSubmitting ? "Connexion..." : "Login"}
                            </Button>

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
