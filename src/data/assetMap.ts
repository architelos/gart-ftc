const assets = import.meta.glob<string>("@/data/assets/**/*.{png,jpg,jpeg,webp,avif}", {
  eager: true,
  import: "default"
});

const assetMap: Record<string, string> = Object.fromEntries(
  Object.entries(assets).map(([path, url]) => {
    const filename = path.replace(/^.*assets\//, "");
    return [filename, url];
  })
);

export default assetMap;
