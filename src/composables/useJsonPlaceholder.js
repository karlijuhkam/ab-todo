export async function useJsonPlaceholder() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos");
    if (response && !response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch data from the API: " + error.message);
  }
}
