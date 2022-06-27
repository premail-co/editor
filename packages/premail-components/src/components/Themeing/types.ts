/**
 * Static theme type, represent a css theme with theme attibutes that will remain constant
 * during the app lifecycle.
 *  */
type StaticTheme = { name: string };

/**
 * Dynamic theme type, represent a css theme with theme attibutes that can be
 * changed dynamically during application lifecycle.
 *  */
type DynamicTheme = { name: string; values: { [key: string]: string } };

export type { StaticTheme, DynamicTheme };
