import type { Icon } from "@/types/gameAPI";
export const avatars: Icon[] = [];

// NOTE: Grabs a list of all SVG files and lists lists them under `avatars` array
const avatarGlob = import.meta.glob("../../public/img/icons/avatars/*.svg");
const avatarList = Object.keys(avatarGlob); // Converts a complicated type into an array

avatarList.forEach((path, index) => {
  // SVG files must start with 'Picture' to be considered an avatar
  const altStart = path.indexOf("Picture");
  const pathStart = path.indexOf("/img");
  avatars.push({
    id: index + 1,
    url: path.substring(pathStart),
    alt: path.substring(altStart),
  });
});
