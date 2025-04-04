import type { User } from "@/types/gameAPI";

// Get information from localStorage first

const userData_storage = JSON.parse(String(localStorage.getItem("student_info")))

const useName = (userData_storage === null) ? "placeholder" : userData_storage.name
const useID = (userData_storage === null) ? 1234567 : userData_storage.id

export const userData: User = {
	name: useName,
	id: useID
};
