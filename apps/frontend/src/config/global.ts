import type { User } from "@/types/gameAPI";

// Get information from localStorage first

const userData_storage = JSON.parse(
  String(localStorage.getItem("student_info")),
);

const useName = userData_storage === null ? undefined : userData_storage.name;
const useID = userData_storage === null ? undefined : userData_storage.id;
const useAvatar =
  userData_storage === null ? undefined : userData_storage.avatar;
const useChoice =
  userData_storage === null ? undefined : userData_storage.choice;
const useStatus =
  userData_storage === null ? undefined : userData_storage.status;

export const userData: User = {
  name: useName,
  id: useID,
  avatar: useAvatar,
  choice: useChoice,
  status: useStatus,
};
