// Simple test to verify Jest is working
describe("Basic Test Suite", () => {
  test("should pass a basic test", () => {
    expect(1 + 1).toBe(2);
  });

  test("should handle strings", () => {
    const greeting = "Hello, World!";
    expect(greeting).toContain("World");
  });

  test("should work with arrays", () => {
    const fruits = ["apple", "banana", "orange"];
    expect(fruits).toHaveLength(3);
    expect(fruits).toContain("banana");
  });

  test("should handle async operations", async () => {
    const promise = Promise.resolve("success");
    await expect(promise).resolves.toBe("success");
  });
});

// Test the Node.js environment
describe("Node.js Environment", () => {
  test("should have process object", () => {
    expect(process).toBeDefined();
    expect(process.version).toMatch(/^v\d+\.\d+\.\d+/);
  });
});
