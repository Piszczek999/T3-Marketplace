import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        slate: {
          850: "#171f33",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
