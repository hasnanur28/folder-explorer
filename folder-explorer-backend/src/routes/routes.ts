import { Elysia } from "elysia";
import { getAllFolders, getSubFolders } from "../controllers/controller";

export const folderRoutes = (app: Elysia) => {
    app.get("/folders", async () => {
        return await getAllFolders();
    });

    app.get("/folders/:id", async ({ params }) => {
        const id = Number(params.id);
        return await getSubFolders(id);
    });
};
