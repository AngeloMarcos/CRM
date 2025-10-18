import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0f172a",
        panel: "#0b1324",
        card: "#111827",
        accent: "#3b82f6",
        brand: "#ff6600"
      },
      boxShadow: { soft: "0 10px 30px rgba(0,0,0,0.25)" },
      borderRadius: { xl2: "1rem" }
    }
  },
  plugins: []
};
export default config;
