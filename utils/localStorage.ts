import AsyncStorage from "@react-native-async-storage/async-storage";

export type storageType = {
  name: string;
  link: string;
};

export class LocalStorage {
  storageKey = "@clipboard";

  addItem = async (link: string) => {
    try {
      let r = await this.getStorage();

      const newStg = r.concat([
        {
          name: "default",
          link,
        },
      ]);

      await AsyncStorage.setItem(this.storageKey, JSON.stringify(newStg));
      return true;
    } catch (error) {
      console.log(`[ADDITEM]: ${error}`);
      return false;
    }
  };

  getStorage = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(this.storageKey);
      const r = jsonValue != null ? JSON.parse(jsonValue) : [];

      return r;
    } catch (e) {
      console.error("[GET_STORAGE]", e);
      return null;
    }
  };

  removeLink = async (itm: string) => {
    const history = await this.getStorage();
    console.log("remove");
    if (history) {
      const filtered = history.filter(
        (item: storageType) => item?.link !== itm,
      );
      await AsyncStorage.setItem(this.storageKey, JSON.stringify(filtered));
      console.log(filtered);
      return filtered;
    }

    return [];
  };

  itemIsExist = async () => {};

  resetStorage = async () => {
    await AsyncStorage.setItem(this.storageKey, JSON.stringify([]));
    console.log("resetStorage");

    const r = await this.getStorage();
    console.log(r);
  };
}
