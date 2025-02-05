## README

### Author Information
**Name:** Aiman Mengesha  
**Email:** aymen123mengesha@gmail.com
**Telegram:** @izanami_A   

### Project Description
This project creates and manages a To-Do task system using Chromia as the backend. The frontend is built with Next.js 15, and  MetaMask as authenticationa  method and creating an account.

# Task Management DApp

## How It Works

- When logging in with **MetaMask**, if the account does not exist in the database, a new account is created with a **randomly assigned name** on the backend. If the account already exists, tasks associated with that account are fetched.  
- The backend is powered by **Chromia**.  
- Users authenticate via **MetaMask**.  
- Tasks can be created with a **title, description, due date, and color** for visual cues.  
- Every task starts with the status **incomplete** but can be marked as complete once finished.  
- Tasks can be **edited** after creation.
- Users can track their tasks using the **task stats**card.
- Sorting options include:
  - **By completion status** (incomplete/complete)  
  - **Alphabetically** (based on the first letter of the title)  
  - **By due date**  
- Users can switch between **light mode** and **dark mode**.  
- Custom **sounds for actions** can be modified in the `public/sounds` folder.  


### Setup Instructions

### Database Setup
Rell requires PostgreSQL 16.3. To set up PostgreSQL:

#### Windows
1. Download and install PostgreSQL from the official website.
2. Add PostgreSQL binaries to your environment variables:
   ```sh
   setx POSTGRESQL "C:\Program Files\PostgreSQL\<version>\bin"
   ```
3. Reopen Command Prompt (CMD) and set up the database:
   ```sh
   psql -U postgres -c "CREATE DATABASE postchain WITH TEMPLATE = template0 LC_COLLATE = 'en_US.UTF-8' LC_CTYPE = 'en_US.UTF-8' ENCODING 'UTF-8';"
   psql -U postgres -c "CREATE ROLE postchain LOGIN ENCRYPTED PASSWORD 'postchain'; GRANT ALL ON DATABASE postchain TO postchain;"
   ```
4. Ensure the environment variable is set:
   ```sh
   POSTGRES_INITDB_ARGS="--lc-collate=C.UTF-8 --lc-ctype=C.UTF-8 --encoding=UTF-8"
   ```
### Chromia CLI Installation
#### Windows
1. Install Scoop (if not installed):
   ```sh
   iwr -useb get.scoop.sh | iex
   ```
2. Add Chromia and Java buckets:
   ```sh
   scoop bucket add chromia https://gitlab.com/chromaway/core-tools/scoop-chromia/
   scoop bucket add java
   ```
3. Install Chromia CLI:
   ```sh
   scoop install chr
   ```
4. Verify installation:
   ```sh
   chr --version
   ```

#### Frontend Setup (Next.js 15)
1. Clone the repository:
   ```sh
   git clone https://github.com/4imaN/todo-manager
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install --legacy-peer-deps or npm install --force due to next.js version
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

#### Backend Setup (Chromia)
1. Navigate to the TODO backend directory:
   ```sh
   cd TODO
   ```
2. Install Chromia CLI dependencies:
   ```sh
   chr install
   ```
3. Start the backend node:
   ```sh
   chr node start
   ```

If Chromia is installed and set up correctly, the backend will run. If you encounter any issues, refer to the Chromia documentation or contact me for support.


### Usage Instructions
- Use MetaMask to connect to the application.
- Add, delete, and update tasks as needed.
- Modify custom sounds in the `public/sounds` folder.
- Switch between light and dark mode as needed.
- can be used for mobile and desktop.

### Additional Information
- For any  issues or questions , please contact me at **aymen123mengesha@gmail.com** will be happy to help you.
- or you can view the project on loom using this link https://www.loom.com/share/1e662d214c8046d08ba474b439b05057?sid=134b74e9-b505-4616-8a8f-6bdd5546038e
