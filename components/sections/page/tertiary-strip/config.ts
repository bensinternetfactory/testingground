export interface TertiaryStripAction {
  eyebrow: string;
  label: string;
  href: string;
  drawerTitle?: string;
}

export interface TertiaryStripConfig {
  actions: TertiaryStripAction[];
}
