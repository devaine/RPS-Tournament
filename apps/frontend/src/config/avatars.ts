import type { Icon } from "@/types/api";

export const avatars: Icon[] = [];

for (let index = 1; index <= 12; index++) {
  avatars.push({
    id: index,
    url: `/img/assets/avatars/Picture${index}.png`,
    alt: `Picture${index}`,
  });
}
