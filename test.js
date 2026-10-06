const assert = require('assert');
const app = require('./server');
const http = require('http');

const PORT = 3001;
const server = http.createServer(app);

server.listen(PORT, async () => {
  console.log('Running automated tests...');
  try {
    // Test Home route
    const res = await fetch(`http://localhost:${PORT}/`);
    const text = await res.text();
    assert.strictEqual(res.status, 200);
    assert.strictEqual(text.includes('Hospital Appointment System'), true);
    console.log('Test 1 Passed: Home route is healthy.');

    // Test Appointments API
    const apiRes = await fetch(`http://localhost:${PORT}/appointments`);
    const data = await apiRes.json();
    assert.strictEqual(apiRes.status, 200);
    assert(Array.isArray(data));
    console.log('Test 2 Passed: Appointments fetch works.');

    server.close();
    process.exit(0);
  } catch (error) {
    console.error('Test failed:', error);
    server.close();
    process.exit(1);
  }
});