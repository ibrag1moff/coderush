export const snippets = [
  "hello world",
  `function debounce(fn: Function, delay: number) {
  let timer: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}`,
  `async function fetchData(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Network response was not ok");
    const data = await res.json();
    console.log("Data loaded:", data);
  } catch (err) {
    console.error("Fetch error:", err);
  }
}`,
  `class TodoList {
  private todos: string[] = [];

  add(todo: string) {
    this.todos.push(todo);
  }

  remove(index: number) {
    this.todos.splice(index, 1);
  }

  list() {
    return this.todos.map((t, i) => \`\${i + 1}. \${t}\`).join("\\n");
  }
}`,
  `const throttle = (fn: Function, limit: number) => {
  let inThrottle: boolean;
  return function (...args: any[]) {
    if (!inThrottle) {
      fn.apply(this, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};`,
  `interface User {
  id: number;
  name: string;
  email: string;
}

function getUserEmail(users: User[], name: string): string | null {
  const user = users.find(u => u.name === name);
  return user ? user.email : null;
}`,
];
