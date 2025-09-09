import AsyncStorage from "@react-native-async-storage/async-storage";


export const save = async (key: string, value: any) => {
try {
await AsyncStorage.setItem(key, JSON.stringify(value));
} catch (e) {
console.log("AsyncStorage save failed", key, e);
}
};


export const load = async (key: string) => {
try {
const raw = await AsyncStorage.getItem(key);
return raw ? JSON.parse(raw) : null;
} catch (e) {
console.log("AsyncStorage load failed", key, e);
return null;
}
};


export const remove = async (key: string) => {
try {
await AsyncStorage.removeItem(key);
} catch (e) {
console.log("AsyncStorage remove failed", key, e);
}
};