const cljsExtractor = (content) =>
  content.match(/[A-Za-z0-9-_:/.]+(?<!:)/g) || [];

const safelist = [
  "animate-spin",
  "badge",
  "bg-green-50",
  "bg-slate-100",
  "bg-slate-50",
  "bg-yellow-50",
  "block",
  "border",
  "border-2",
  "border-b",
  "border-slate-300",
  "border-t-transparent",
  "container",
  "flex",
  "flex-col",
  "font-bold",
  "font-medium",
  "font-semibold",
  "gap-1",
  "gap-2",
  "gap-3",
  "gap-4",
  "gap-6",
  "grid",
  "h-5",
  "items-center",
  "justify-between",
  "lg:grid-cols-2",
  "lg:grid-cols-3",
  "max-h-96",
  "max-w-md",
  "md:grid-cols-2",
  "min-h-[120px]",
  "ml-auto",
  "mx-auto",
  "overflow-auto",
  "p-3",
  "p-4",
  "pt-2",
  "px-2",
  "px-3",
  "py-0.5",
  "py-1",
  "py-2",
  "py-3",
  "py-6",
  "rounded",
  "rounded-full",
  "rounded-lg",
  "sm:grid-cols-2",
  "sm:grid-cols-3",
  "space-y-1",
  "space-y-2",
  "space-y-3",
  "space-y-4",
  "space-y-8",
  "text-2xl",
  "text-3xl",
  "text-green-600",
  "text-red-600",
  "text-slate-500",
  "text-slate-600",
  "text-sm",
  "text-xl",
  "text-xs",
  "w-5",
  "w-full",
  "whitespace-pre-wrap",
  "bg-green-600",
  "text-white",
  "border-green-600"
];

module.exports = {
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
    safelist
  },
  theme: {
    extend: {}
  },
  plugins: []
};
