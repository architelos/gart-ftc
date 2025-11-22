import rawData from "@/data/strings/data.json";

function data(locale: "en" | "vn") {
  return rawData[locale];
}

export default data;
