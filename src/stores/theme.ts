import { createSignal } from "solid-js";

export type Theme = "light" | "dark";

const [theme, setTheme] = createSignal<Theme>("light");

export const useTheme = () => [theme, setTheme] as const;
