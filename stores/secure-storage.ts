import * as SecureStore from "expo-secure-store";

// Create custom storage using SecureStore
export const secureStorage = {
  getItem: async (name: string) => {
    try {
      const data = await SecureStore.getItemAsync(name);
      console.log(`Retrieved ${name} from secure storage:`, data);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error("Error getting secure store item:", error);
      return null;
    }
  },
  setItem: async (name: string, value: any) => {
    try {
      console.log(`Setting ${name} in secure storage...`);
      await SecureStore.setItem(name, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting secure store item:", error);
    }
  },
  removeItem: async (name: string) => {
    await SecureStore.deleteItemAsync(name);
  },
};
