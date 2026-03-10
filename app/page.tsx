import fs from "fs";
import path from "path";
import { ResourcesConfig, Section } from "./types";
import MainClient from "./components/MainClient";

function loadSections(): Section[] {
  const configPath = path.join(process.cwd(), "config", "resources.json");
  const config: ResourcesConfig = JSON.parse(fs.readFileSync(configPath, "utf-8"));

  return config.sections.map((section) => ({
    ...section,
    categories: section.categories.map((category) => ({
      ...category,
      items: category.items.map((item) => {
        const filePath = path.join(process.cwd(), "resources", section.id, item.file);
        let content = "";
        try {
          content = fs.readFileSync(filePath, "utf-8");
        } catch {
          content = `> File not found: \`resources/${section.id}/${item.file}\``;
        }
        return { ...item, content };
      }),
    })),
  }));
}

export default function Home() {
  const sections = loadSections();
  return <MainClient sections={sections} />;
}
