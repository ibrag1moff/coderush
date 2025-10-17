export const snippets = [
  `const client = await pool.connect();
try {
  await client.query("BEGIN");
  const { rows: user } = await client.query("INSERT INTO users(name) VALUES($1) RETURNING id", ["John"]);
  await client.query("INSERT INTO logs(user_id, action) VALUES($1, $2)", [user[0].id, "REGISTER"]);
  await client.query("COMMIT");
} catch (err) {
  await client.query("ROLLBACK");
  throw err;
} finally {
  client.release();
}`,
  `import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

export const User = model("User", userSchema);`,
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
  `import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (_, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

export const upload = multer({ storage });`,
  `const useFetch = <T,>(url: string) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch(url);
        if (!res.ok) throw new Error(res.statusText);
        const json = await res.json();
        if (mounted) setData(json);
      } catch (err) {
        if (mounted) setError((err as Error).message);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [url]);

  return { data, error, loading };
};`,
  `import { create } from "zustand";

type State = { count: number; inc: () => void; dec: () => void; reset: () => void };

export const useCounter = create<State>((set) => ({
  count: 0,
  inc: () => set((s) => ({ count: s.count + 1 })),
  dec: () => set((s) => ({ count: s.count - 1 })),
  reset: () => set({ count: 0 }),
}));`,
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
  `import { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
wss.on("connection", (ws) => {
  ws.on("message", (msg) => {
    for (const client of wss.clients) {
      if (client.readyState === ws.OPEN) client.send(msg.toString());
    }
  });
});`,
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
