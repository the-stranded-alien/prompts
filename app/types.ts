export interface Item {
  id: string;
  title: string;
  description: string;
  file: string;
  tags: string[];
  content?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  items: Item[];
}

export interface Section {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  categories: Category[];
}

export interface ResourcesConfig {
  sections: Section[];
}

export interface Selection {
  sectionId: string;
  categoryId: string;
  item: Item;
}
