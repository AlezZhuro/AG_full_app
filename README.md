# AG_full_app

## Run for development
1. Run `yarn` command
2. Install the VS Code plugin - Remote-Containers. This extension will allow you to open your project in a container, utilizing the full functionality of Visual Studio Code for container-based development.

After installing the extension, you can launch your project in a Dev Container in one of two ways:

Click the green button in the lower left corner. In the menu that appears, select "Reopen in container."
Open all VS Code commands using cmd+shift+p or ctrl+shift+p or F1, and find the command "Remote-Containers: Rebuild and reopen in Container."
Wait for the container to load. Success!

## For production
1. Run `yarn` command
2. Setup database settings inside `.env` file (copy from `.env.example`)
3. Run `docker-compose up --build` 
