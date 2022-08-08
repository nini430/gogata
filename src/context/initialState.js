import { fetchUser } from "../utils/FetchLocalStorageData";

export const initialState={
    user:fetchUser(),
    foodItems:null
}