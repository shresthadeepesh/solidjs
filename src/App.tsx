import { Show, batch, createSignal } from "solid-js";
import "./styles/style.css";
import Button from "./components/Button/button";
import { useTheme } from "./stores/theme";
import Posts from "./components/posts/posts";

function App() {
  const [isLoggedIn, setIsLoggedIn] = createSignal<boolean>(false);
  const [counter, setCounter] = createSignal(0);
  const [counter1, setCounter1] = createSignal(10);
  const [theme, setTheme] = useTheme();

  const handleCounterClick = () => {
    batch(() => {
      setCounter(counter() + 1);
      setCounter(counter() + 1);
      setCounter1(counter1() + 1);
    });
  };

  const handleIsLoggedIn = () => {
    setIsLoggedIn(!isLoggedIn());
  };

  const handleThemeChange = () => {
    const updatedTheme = theme() === "light" ? "dark" : "light";
    setTheme(updatedTheme);
  };

  // createEffect(() => {
  //   console.log("Value of counter: ", counter());
  // });

  return (
    <>
      <div class="">Hello World! {counter1()}</div>

      <div class="flex flex-wrap space-x-2">
        <Button onClick={handleCounterClick}>Click me {counter()}</Button>
        <Button onClick={handleThemeChange}>Current Theme {theme()}</Button>

        <div class="">
          <Button onClick={handleIsLoggedIn}>
            <Show when={isLoggedIn()} fallback={"Login"}>
              Logout
            </Show>
          </Button>
        </div>
      </div>

      <Show when={isLoggedIn()}>Hello, John</Show>

      <Posts />
    </>
  );
}

export default App;
