## README

### Author Information
**Name:** Aiman Mengesha  
**Email:** aymen123mengesha@gmail.com
**Telegram:** @izanami_A   

### Project Description
This project creates and manages a To-Do task system using Chromia as the backend. The frontend is built with Next.js 15, and authentication is handled using MetaMask.

### How It Works
- The frontend is built with Next.js 15.
- The backend is powered by Chromia.
- Users authenticate via MetaMask.
- Tasks can be added, deleted, and updated.
- Custom sounds for actions can be modified in the `public/sounds` folder.

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
   git clone <repo-url>
   cd <repo-folder>
   ```
2. Install dependencies:
   ```sh
   npm install --legacy-peer-deps
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

### Additional Information
For any  issues or questions , please contact me at **aymen123mengesha@gmail.com** will be happy to help you.

