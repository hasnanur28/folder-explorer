import axios from "axios";

export const getFolders = async () => {
  const response = await axios.get("/folders");
  return response.data;
};

export const getSubFolders = async (parentId: number) => {
  const response = await axios.get(`/folders/${parentId}`);
  return response.data;
};
