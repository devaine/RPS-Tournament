import type { Icon } from "@/types/gameAPI";

export const avatars: Icon[] = [];

for (let index = 1; index <= 9; index++) {
  avatars.push({
    id: index,
    url: `/img/icons/avatars/Picture${index}.svg`,
    alt: `Picture${index}`,
  });
}
