async function signIn(identifier: string, password: string) {
    console.log('Attempting login for:', identifier);

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ identifier, password }),
            credentials: "include", // Important for including cookies
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Connexion échouée");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Sign in error:', error);
        throw error;
    }
}

export default signIn;