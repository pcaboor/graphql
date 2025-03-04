async function logOut() {
    try {
        const response = await fetch("/api/auth/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la connexion");
        }
        return await response.json();
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export default logOut;
