/**
 * Given the absolute file path to a markdown file, return the path to the
 * markdown file in the website
 *
 * @param abs
 */
export const getPathFromFileAbsolutePath = (abs: string): string =>
  abs.split('/markdown')[1].split('.md')[0]
