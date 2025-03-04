"use client"


const fetchData = async (query: string) => {


    try {
        const res = await fetch("https://zone01normandie.org/api/graphql-engine/v1/graphql", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNTU0IiwiaWF0IjoxNzQxMDg2OTA1LCJpcCI6IjE3Mi4xOC4wLjIiLCJleHAiOjE3NDExNzMzMDUsImh0dHBzOi8vaGFzdXJhLmlvL2p3dC9jbGFpbXMiOnsieC1oYXN1cmEtYWxsb3dlZC1yb2xlcyI6WyJ1c2VyIl0sIngtaGFzdXJhLWNhbXB1c2VzIjoie30iLCJ4LWhhc3VyYS1kZWZhdWx0LXJvbGUiOiJ1c2VyIiwieC1oYXN1cmEtdXNlci1pZCI6IjM1NTQiLCJ4LWhhc3VyYS10b2tlbi1pZCI6IjVmM2VhOTllLTFiZDYtNGE2ZC04N2RiLWE2ZDkyY2MyZGM1ZCJ9fQ.wkIbismOIiWNOJyIBN6uQcsZkBFQbkkiN8KOHgNI6yY`,
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