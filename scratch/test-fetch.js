async function main() {
  try {
    // TanStack Start server functions use POST /_server?_serverFnId=...
    // Let's inspect the network request by doing a GET to a page first to check if we get a response
    const res = await fetch("http://localhost:8080/admin");
    console.log("Admin page response status:", res.status);
    console.log("Admin page headers:", Object.fromEntries(res.headers.entries()));
    
    // Let's do a request to the server function getPortfolioItems
    // In TanStack Start, the server function ID is typically a hashed path or the function name.
    // Let's check routeTree.gen.ts or similar to see what the server functions are compiled to,
    // or let's inspect the dev server console output if we can.
  } catch (err) {
    console.error("Fetch error:", err);
  }
}

main();
