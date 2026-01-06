export async function fetchTheme(zodiac: string) {
  return import(`@/mock/web/${zodiac}.json`);
}
