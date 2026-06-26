export interface ThemeVariables {
  "--text": string;
  "--text-h": string;
  "--text-l": string;
  "--bg": string;
  "--border": string;
  "--code-bg": string;
  "--alert": string;
  "--accent": string;
  "--accent-hover": string;
  "--accent-bg": string;
  "--accent-bg-alt": string;
  "--accent-border": string;
  "--accent-bg-hover": string;
  "--social-bg": string;
  "--shadow": string;
  "--skeleton-base": string;
  "--skeleton-highlight": string;
  "--incomeColor": string;
  "--expenseColor": string;
}

export interface ThemeConfig {
  label: string;
  variables: ThemeVariables;
}
