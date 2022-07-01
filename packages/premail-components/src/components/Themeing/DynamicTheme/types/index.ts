/**
 * Dynamic theme type, represent a css theme with theme attibutes that can be
 * changed dynamically during application lifecycle.
 *  */
export type DynamicTheme = { name: string; values: { [key: string]: string } };
/**
 * Static Theme Context Inteface
 */
export interface IDynamicThemeContext {
  /** Context's theme value, null if not set */
  theme: DynamicTheme | null;
  /** Context's theme setter function, takes a DynamicTheme as param */
  setTheme: (_theme: DynamicTheme) => void;
}
