import en from "@/data/strings/en.json";
import vn from "@/data/strings/vn.json";

const data = {
  "en": en,
  "vn": vn
} as const;

function translations(locale: "en" | "vn") {
  return data[locale];
}

export default translations;
