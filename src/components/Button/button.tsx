import { Component, JSXElement, Show } from "solid-js";

type ButtonProps = {
  title?: string;
  children?: JSXElement;
  onClick: (event: MouseEvent) => void;
};

const Button: Component<ButtonProps> = ({ title, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      class="bg-black text-white px-4 py-2 rounded-full hover:bg-white hover:text-black transition-colors duration-300"
    >
      <Show when={children} fallback={title}>
        {children}
      </Show>
    </button>
  );
};

export default Button;
