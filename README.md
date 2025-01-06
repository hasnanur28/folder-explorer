
# Folder Explorer Development Server

This project is a folder explorer application with a development server for testing and API integration.

---

## Prerequisites

- **Bun** (Package Manager)  
  Install Bun if it's not already installed:
  ```bash
  curl -fsSL https://bun.sh/install | bash
  ```

- **Git**  
  Ensure Git is installed on your system.

---

## Getting Started

### Clone the Repository

Clone this repository to your local machine:

```bash
git clone https://github.com/your-username/folder-explorer.git
```

Navigate to the project directory:

```bash
cd folder-explorer
```

---

### Install Dependencies

Install the required dependencies using **Bun**:

```bash
bun install
```

---

### Run the Development Server

To start the development server, run:

```bash
bun run dev
```

The application will start, and you can access it in your browser at:

```
http://localhost:3000
```

---

## API Information

The application uses the following API endpoints for folder and subfolder management:

### 1. **Get All Folders**

- **Endpoint**: `GET /folders`
- **Description**: Retrieve all top-level folders.
- **Example Response**:
  ```json
  [
    {
      "id": 1,
      "name": "Documents",
      "children": [
          {
            "id": 3,
            "name": "Work",
            "parentId": 1
          },
          {
            "id": 4,
            "name": "Personal",
            "parentId": 1
          }
        ]
    },
    {
      "id": 2,
      "name": "Pictures",
      "children": []
    }
  ]
  ```

---

### 2. **Get Subfolders**

- **Endpoint**: `GET /folders/:id`
- **Description**: Retrieve subfolders of a specific folder.
- **Parameters**:
  - `id` (path): The ID of the folder to retrieve subfolders for.
- **Example Request**:
  ```
  GET /folders/1
  ```
- **Example Response**:
  ```json
  [
    {
      "id": 3,
      "name": "Work",
      "parentId": 1
    },
    {
      "id": 4,
      "name": "Personal",
      "parentId": 1
    }
  ]
  ```

---

Feel free to reach out with any questions or issues!
