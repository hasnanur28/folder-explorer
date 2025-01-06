<template>
    <li>
      <div class="folder-item" @click="toggleFolder">
        <span>{{ folder.expanded ? "[-]" : "[+]" }}</span>
        <span class="folder-icon"></span>
        <span @click.stop="emitFolderClick">{{ folder.name }}</span>
      </div>
      <ul v-if="folder.expanded">
        <FolderNode
          v-for="child in folder.children"
          :key="child.id"
          :folder="child"
          @fetch-children="$emit('fetch-children', $event)"
          @folder-click="$emit('folder-click', $event)"
        />
      </ul>
    </li>
  </template>
  
  <script lang="ts">
  import { defineComponent, PropType } from "vue";
  
  export default defineComponent({
    name: "FolderNode",
    props: {
      folder: {
        type: Object as PropType<any>,
        required: true,
      },
    },
    methods: {
      async toggleFolder() {
        if (!this.folder.expanded) {
          await this.$emit("fetch-children", this.folder); // Fetch children dynamically
        }
        this.folder.expanded = !this.folder.expanded; // Toggle expansion state
      },
      emitFolderClick() {
        this.$emit("folder-click", this.folder.id, this.folder.name);
      },
    },
  });
  </script>
  
  <style>
  .folder-item {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
  }
  
  .folder-icon {
    width: 16px;
    height: 16px;
    background-image: url("https://cdn-icons-png.flaticon.com/512/716/716784.png");
    background-size: contain;
    background-repeat: no-repeat;
    margin-right: 8px;
  }
  
  ul {
    list-style: none;
    padding-left: 20px;
    margin: 0;
  }
  </style>
  