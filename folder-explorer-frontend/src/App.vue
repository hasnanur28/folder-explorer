<template>
  <div class="file-explorer">
    <!-- Left Sidebar -->
    <div class="sidebar" :style="{ width: sidebarWidth + 'px' }">
      <ul class="folder-tree">
        <FolderNode
          v-for="folder in folders"
          :key="folder.id"
          :folder="folder"
          @fetch-children="fetchChildren"
          @folder-click="handleFolderClick"
        />
      </ul>
    </div>

    <!-- Resizable Divider -->
    <div class="divider" @mousedown="startResizing"></div>

    <!-- Right Content -->
    <div class="content">
      <ul class="subfolder-list">
        <li v-if="subFolders.length === 0">
          <div>No content available</div>
        </li>
        <li
          v-for="subFolder in subFolders"
          :key="subFolder.id"
          @click="handleFolderClick(subFolder.id, subFolder.name)"
        >
          <div class="folder-item">
            <span class="folder-icon"></span>
            {{ subFolder.name }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from "vue";
import FolderNode from "./components/FolderNode.vue";
import { getFolders, getSubFolders } from "./services/folderService";

export default defineComponent({
  components: { FolderNode },
  setup() {
    // State variables
    const folders = ref([]); // Top-level folders
    const subFolders = ref([]); // Subfolders displayed on the right panel
    const currentParentName = ref(""); // Tracks the selected folder name
    const sidebarWidth = ref(250); // Sidebar width
    const isResizing = ref(false); // Resizing flag for the sidebar

    // Fetch top-level folders
    const fetchFolders = async () => {
      const data = await getFolders();
      folders.value = data.map((folder) => ({
        ...folder,
        expanded: false, // Initial state of expansion
        children: [], // Initially no children loaded
      }));
    };

    // Fetch children for a specific folder
    const fetchChildren = async (folder: any) => {
      if (folder.children.length === 0) {
        const children = await getSubFolders(folder.id);
        folder.children = children.map((child) => ({
          ...child,
          expanded: false, // Initial state of child folders
          children: [], // Prepare for further dynamic loading
        }));
      }
    };

    // Handle folder click (updates the right panel)
    const handleFolderClick = async (parentId: number, parentName: string) => {
      currentParentName.value = parentName; // Update title for the right panel
      subFolders.value = []; // Clear previous content
      const data = await getSubFolders(parentId);
      subFolders.value = data; // Load new subfolders
    };

    // Start resizing the sidebar
    const startResizing = (e: MouseEvent) => {
      isResizing.value = true;
      window.addEventListener("mousemove", resizeSidebar);
      window.addEventListener("mouseup", stopResizing);
    };

    // Resize sidebar dynamically
    const resizeSidebar = (e: MouseEvent) => {
      if (isResizing.value) {
        const newWidth = e.clientX;
        if (newWidth > 100 && newWidth < 500) {
          sidebarWidth.value = newWidth;
        }
      }
    };

    // Stop resizing the sidebar
    const stopResizing = () => {
      isResizing.value = false;
      window.removeEventListener("mousemove", resizeSidebar);
      window.removeEventListener("mouseup", stopResizing);
    };

    // Fetch initial folders on mount
    onMounted(fetchFolders);

    return {
      folders,
      subFolders,
      currentParentName,
      sidebarWidth,
      fetchChildren,
      handleFolderClick,
      startResizing,
    };
  },
});
</script>

<style>
/* Overall layout */
.file-explorer {
  display: flex;
  height: 100vh;
  overflow: hidden;
}

/* Sidebar styles */
.sidebar {
  border-right: 1px solid #ccc;
  padding: 10px;
  overflow-y: auto;
  background-color: #f9f9f9;
}

.folder-tree {
  list-style: none; /* Remove bullets */
  padding: 0;
  margin: 0;
}

.folder-item {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.folder-item span {
  margin-right: 5px;
}

.folder-icon {
  width: 16px;
  height: 16px;
  background-image: url("https://cdn-icons-png.flaticon.com/512/716/716784.png");
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 8px;
}

.divider {
  width: 5px;
  cursor: col-resize;
  background-color: #ccc;
}

.divider:hover {
  background-color: #aaa;
}

/* Right content styles */
.content {
  flex-grow: 1;
  padding: 10px;
  overflow-y: auto;
}

.parent-title {
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: bold;
}

.subfolder-list {
  list-style: none; /* Remove bullets */
  padding: 0;
  margin: 0;
}

.subfolder-list li {
  margin-bottom: 5px;
  cursor: pointer;
}

.subfolder-list .folder-item {
  display: flex;
  align-items: center;
}

.subfolder-list .folder-icon {
  width: 16px;
  height: 16px;
  background-image: url("https://cdn-icons-png.flaticon.com/512/716/716784.png");
  background-size: contain;
  background-repeat: no-repeat;
  margin-right: 8px;
}
</style>
