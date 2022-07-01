/**
 * Static theme type, represent a css theme with theme attibutes that will remain constant
 * during the app lifecycle.
 *  */
type StaticTheme = { name: string };

/**
 * Static Theme Context Inteface
 */
interface IStaticThemeContext {
  /** Current theme value if set, null otherwise */
  theme: StaticTheme | null;
  /** Setter function changes theme value */
  setTheme: (_theme: StaticTheme) => void;
}

export type { IStaticThemeContext, StaticTheme };
