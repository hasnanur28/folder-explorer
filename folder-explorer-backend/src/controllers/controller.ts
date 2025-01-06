import { fetchAllFolders, fetchSubFolders } from "../services/service";

// Menghandle request untuk mendapatkan semua folder
export const getAllFolders = async () => {
    return await fetchAllFolders();
};

// Menghandle request untuk mendapatkan subfolder berdasarkan ID parent
export const getSubFolders = async (id: number) => {
    return await fetchSubFolders(id);
};
