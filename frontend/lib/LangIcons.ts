const BASE = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const ICONS: Record<string, string> = {
  Python: "python/python-original.svg",
  JavaScript: "javascript/javascript-original.svg",
  TypeScript: "typescript/typescript-original.svg",
  Java: "java/java-original.svg",
  Go: "go/go-original.svg",
  Rust: "rust/rust-original.svg",
  Ruby: "ruby/ruby-original.svg",
  PHP: "php/php-original.svg",
  Swift: "swift/swift-original.svg",
  Kotlin: "kotlin/kotlin-original.svg",
  Dart: "dart/dart-original.svg",
  Shell: "bash/bash-original.svg",
  C: "c/c-original.svg",
  "C++": "cplusplus/cplusplus-original.svg",
  "C#": "csharp/csharp-original.svg",
  HTML: "html5/html5-original.svg",
  CSS: "css3/css3-original.svg",
  SCSS: "sass/sass-original.svg",
  Vue: "vuejs/vuejs-original.svg",
  Svelte: "svelte/svelte-original.svg",
  Dockerfile: "docker/docker-original.svg",
  Lua: "lua/lua-original.svg",
  R: "r/r-original.svg",
  Scala: "scala/scala-original.svg",
  Haskell: "haskell/haskell-original.svg",
  Elixir: "elixir/elixir-original.svg",
  "Jupyter Notebook": "jupyter/jupyter-original.svg",
};

export function getLangIconUrl(language: string): string | null {
  const path = ICONS[language];
  return path ? `${BASE}/${path}` : null;
}