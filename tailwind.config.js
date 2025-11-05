import daisyui from 'daisyui';

const cljsExtractor = (content) =>
  content.match(/[A-Za-z0-9-_:/.]+(?<!:)/g) || [];

export default {
  content: {
    files: [
      "./resources/public/index.html",
      "./resources/public/js/**/*.{js,jsx,ts,tsx}",
      {
        files: [
          "./src/**/*.{cljs,cljc,clj,edn}",
          "./dev/**/*.{cljs,cljc,clj,edn}"
        ],
        extract: cljsExtractor
      },
      "./src/**/*.{js,ts,jsx,tsx}"
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [daisyui],
};
