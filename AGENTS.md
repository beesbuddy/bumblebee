# Repository Guidelines

## Project Structure & Module Organization
- `src/clojure/bumblebee/...` holds the JVM and MQTT services; mirror namespaces to directories and register new modules in `project.clj` when you need extra dependencies or profiles.
- `resources/public/js` receives Shadow-CLJS output, while Sass in `src/styles/main.scss` compiles to `resources/public/css`; use `public/` only for throwaway spikes.
- Native bridges stay in `src/rust/` (compiled as `cdylib`) with any JVM shims in `src/java/`; REPL helpers belong in `dev/`, and automated checks and fixtures in `test/`.

## Build, Test, and Development Commands
- `npm run dev` starts the Shadow watch, Sass pipeline, and dev HTTP server on http://localhost:8020.
- `npm run build` prepares production JS/CSS; run it before packaging or tagging.
- `lein run` launches `bumblebee.main`, `lein start-dev` opens the headless REPL, and `lein test :all` executes the JVM suites; `npm run test:ci` (or `test:watch`) covers CLJS/node tests.

## Coding Style & Naming Conventions
- Stick to idiomatic two-space Clojure indentation and prefix namespaces with `bumblebee.`; React components use PascalCase, hooks camelCase, and Sass variables kebab-case.
- Favor pure functions and keep side-effecting code in clearly named gateways or clients; accompany macros with docstrings.
- Run `clj-kondo --lint src/clojure dev test` before pushing to respect the custom hooks in `.clj-kondo/`.

## Testing Guidelines
- Place backend specs under `test/bumblebee/clojure/..._test.clj` using `clojure.test`; mirror namespace structure and gate optional suites with `^:skip-ci` only when unavoidable.
- Add CLJS tests alongside front-end modules in `test/bumblebee/clojure/..._test.cljs`; the node runner declared in `shadow-cljs.edn` handles module resolution.
- Prioritize coverage for MQTT parsing, registry updates, and UI reducers; note gaps or flaky areas in the PR body.

## Commit & Pull Request Guidelines
- Follow the short, imperative commit style already in history (e.g., `Add sensor polling fallback`); include a short body when touching multiple layers.
- Keep branches focused, rebase before review, and request owners for UI (`resources/public/js`) or native (`src/rust/`) changes.
- PRs should explain the why, list commands run (`lein test :all`, `npm run test:ci`, etc.), link tickets, and attach screenshots or logs for user-visible updates.
