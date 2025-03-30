import type { Icon } from "@/types/gameAPI";

export const avatars: Icon[] = [];

// for (let index = 1; index <= 12; index++) {
//   avatars.push({
//     id: index,
//     url: `/img/assets/avatars/Picture${index}.png`,
//     alt: `Picture${index}`,
//   });
// }

for (let index = 1; index <= 7; index++) {
  avatars.push({
    id: index,
    url: `/img/icons/avatars/Picture${index}.svg`,
    alt: `Picture${index}`,
  });
}
