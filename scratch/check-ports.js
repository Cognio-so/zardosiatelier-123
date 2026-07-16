import http from "http";

const ports = [5173, 3000, 8000, 8080];

function checkPort(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:${port}/`, (res) => {
      resolve({ port, active: true, status: res.statusCode });
    });
    req.on("error", () => {
      resolve({ port, active: false });
    });
    req.end();
  });
}

async function main() {
  const results = await Promise.all(ports.map(checkPort));
  console.log("Port check results:", results);
}

main();
