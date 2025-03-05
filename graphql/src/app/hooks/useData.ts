"use client"

const fetchData = async (query: string) => {

    const jwt = document.cookie.replace(/(?:(?:^|.*;\s*)jwt\s*\=\s*([^;]*).*$)|^.*$/, "$1");

    try {
        const res = await fetch("https://zone01normandie.org/api/graphql-engine/v1/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${jwt}`,
            },
            body: JSON.stringify({ query }),
        });

        if (!res.ok) throw new Error("Failed to fetch data");

        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};

export default fetchData