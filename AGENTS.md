# Agent runbook: Calva + nREPL

- Port: nREPL listens on 41975 (set in deps.edn `:nrepl` alias, `.vscode/settings.json`, and `.nrepl-port`).
- Start (if not running): `clj -M:nrepl` from repo root; launches nREPL + cider middleware on port 41975.
- Calva connect: VS Code auto-selects aliases `["nrepl", "dev", "test"]` via the “Mini Clojure Project” sequence; port pre-set to 41975.
- Dev helpers: `dev/user.clj` provides `user/refresh` and `user/reset` using tools.namespace; opt-in expound config is in the comment block. It also includes `user/add-deps!` (hot-load libs via `clojure.repl.deps/add-libs` from Clojure 1.12) and `user/add-http-kit!` for the web server dependency.
- Quick CLI eval: `clj -M:nrepl-eval --code "(+ 1 2)"` (defaults to port 41975); override with `--port`.
- Ad-hoc nREPL client (no alias): `clojure -Sdeps '{:deps {nrepl/nrepl {:mvn/version "1.2.0"}}}' -e "(require '[nrepl.core :as nrepl]) (-> (nrepl/connect :port 41975) (nrepl/client 2000) (nrepl/message {:op \"eval\" :code \"(+ 1 2)\"}) nrepl/combine-responses prn)"`
- Web app: `mini.server` serves a greeting page with auto-reload websocket on `http://localhost:8080/`. Start via `user/go` (or `(mini.server/start!)`) and stop via `user/stop` (or `(mini.server/stop!)`). On successful `user/refresh` the server broadcasts a reload to connected browsers; re-evaluate code and refresh to see changes without restarting nREPL. The live-reload middleware (`mini.server/wrap-live-reload`) injects the websocket client into any `text/html` response and handles `/ws`, so new pages don’t need manual wiring.
- Adding new deps without REPL restart: after editing `deps.edn`, hot-load new libs in the running REPL with `user/add-deps!`, e.g. `(user/add-http-kit!)` or `(user/add-deps! '{some/lib {:mvn/version \"x.y.z\"}})`. This uses `clojure.repl.deps/add-libs` from Clojure 1.12—no alpha tools.deps needed. If your REPL predates this change, jack in once so the updated `dev` deps are on the classpath.
- Lint/unbalanced parens: `user/lint` runs clj-kondo over src/dev/test (skipping non-existent paths). `user/refresh` runs lint first and skips refresh when lint errors (e.g., unbalanced parentheses) are present. CLI option: `clj -M:lint`.
- Auto-refresh on save: start a watcher with `(user/start-auto-refresh!)` (watches src/dev/test) and stop with `(user/stop-auto-refresh!)`. Any change triggers `user/refresh` (with lint) and pushes browser reloads when the server is running.
- Definition order/forward refs: Clojure doesn’t hoist. Use `declare` for forward refs (e.g., `stop-auto-refresh!` before `start-auto-refresh!`) or `user/ensure-defined!` to lazily intern a symbol when reordering isn’t feasible.
- Live reload state survives refresh: websocket/server atoms live in `mini.server.state` and are anchored in `clojure.core/mini-server-state` so `tools.namespace` reloads don’t break `push-reload!`. If you still see stale connections after heavy edits, `user/stop` + `user/go` will reset cleanly.
- Refresh does not restart server: handler vars are already deref’d per request, so re-evaluating code + `user/refresh` + `server/push-reload!` updates pages without bouncing the server. Restart only if changing listener options (port/middleware) or state is broken.
- Dynamic handler dispatch: the server uses a handler atom (`mini.server.state/handler-fn`) and `server/set-handler!` to point to the latest `greeting-handler`. `user/refresh` calls `set-handler!` after reload so new HTML is served without restarting the server.

# Additional instructions for libraries and frameworks
- Additional instructions are provided in  `instructions` folder. Inspect them when work with UI is done or general structure of project need to be inspected improved.
