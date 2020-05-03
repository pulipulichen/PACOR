
# PACOR

----

## Issues

https://github.com/pulipulichen/PACOR/issues

## Chrome Switches (Command Line)

https://peter.sh/experiments/chromium-command-line-switches/

````
"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe" --app=https://github.com/pulipulichen/PACOR --window-size="1920,1040" --window-position="0,0" --user-data-dir="D:/Test/Chrome-Profiles/1"
````

----

# Setup

1. Download source code from https://github.com/pulipulichen/20191004-adonisjs-chat/archive/master.zip
2. Unzip
3. Open folder in terminal
4. For first run:
	* Execute command: `npm run init` . 
	* Waiting for packages installing finish.
  * Setup your configuration at `.env` .
	* Open URL of CORS test website in browser: http://127.0.0.1:3000 .
  * Open URL of admin in browser: http://127.0.0.1:3333/admin .
5. For following run in development:
  * Execute command: `npm run 0.development` .
  * Open URL of CORS test website in browser: http://127.0.0.1:3000 .
  * Open URL of admin in browser: http://127.0.0.1:3333/admin .
6. For following run in production: 
  * Execute command: `npm run 1.production` .
  * Open URL of admin in browser: http://127.0.0.1:3333/admin .
  * Insert `<script src="http://127.0.0.1:3333/spa/client-loader.js" async></script>` in the html you want to plugin.

Default URL list:

- CORS test website: http://127.0.0.1:3000
- Main AdonisJS server: http://127.0.0.1:3333/admin
- AdonisJS https server for test: http://127.0.0.1:4444/admin (Run `npm run start-https` first)

----

# Document

- https://adonisjs.com/docs/4.1/lucid
- Project: https://github.com/pulipulichen/20191004-adonisjs-chat
- Issues: https://github.com/pulipulichen/20191004-adonisjs-chat/issues

- For test: https://pulipulichen.github.io/20191004-adonisjs-chat/index.html


----

# AdonisJS Commands

## Database Migration

https://adonisjs.com/docs/4.1/migrations#_creating_migrations

````
adonis make:migration users
adonis migration:run
adonis migration:refresh
````

## Model

https://adonisjs.com/docs/4.1/lucid

````
adonis make:model User
````

## Route Controller

https://adonisjs.com/docs/4.1/controllers

````
adonis make:controller User --type http
````

----

# AdonisJS Readme

This is the fullstack boilerplate for AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Session
3. Authentication
4. Web security middleware
5. CORS
6. Edge template engine
7. Lucid ORM
8. Migrations and seeds

## Setup

Use the adonis command to install the blueprint

```bash
adonis new yardstick
```

or manually clone the repo and then run `npm install`.


### Migrations

Run the following command to run startup migrations.

```js
adonis migration:run
```

# REDIS

````
slave-read-only no
````

https://blog.csdn.net/zhangpeterx/article/details/88856073
