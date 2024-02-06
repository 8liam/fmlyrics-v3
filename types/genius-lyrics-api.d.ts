declare module "genius-lyrics-api" {
  export function getLyrics(options: any): Promise<string>;
  export function getSong(options: any): Promise<any>;
  // Add types for options and any other exports you use
}
