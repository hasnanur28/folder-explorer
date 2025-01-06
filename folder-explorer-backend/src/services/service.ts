import { prisma } from "../config/database";

// Mendapatkan semua folder
export const fetchAllFolders = async () => {
    return await prisma.folder.findMany({
        where: { parentId: null },
        include: { children: true },
    });
};

// Mendapatkan subfolder berdasarkan ID parent
export const fetchSubFolders = async (parentId: number) => {
    return await prisma.folder.findMany({
        where: { parentId },
    });
};
