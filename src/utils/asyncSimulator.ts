export async function simulateProcessing<T>(fn: () => Promise<T>): Promise<T> {
  const delay = Math.floor(Math.random() * 1500) + 300; // 300ms-1800ms
  await new Promise((r) => setTimeout(r, delay));
  return fn();
}
