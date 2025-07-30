import type { Opportunity } from "../types/Opportunity";
export async function fetchOpportunities(): Promise<Opportunity[]> {
  try {
    const response = await fetch(
      "https://akil-backend.onrender.com/opportunities/search"
    );
    console.log("Response status:", response.status); // 👈 Add this
    if (!response.ok) throw new Error("Failed to fetch");
    const data = await response.json();
    console.log("Fetched data:", data); // 👈 Add this
    return data.data;
  } catch (error) {
    console.error("API error:", error);
    return [];
  }
}
