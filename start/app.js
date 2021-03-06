'use strict'

/*
|--------------------------------------------------------------------------
| Providers
|--------------------------------------------------------------------------
|
| Providers are building blocks for your Adonis app. Anytime you install
| a new Adonis specific package, chances are you will register the
| provider here.
|
*/
const providers = [
  '@adonisjs/framework/providers/AppProvider',
  '@adonisjs/framework/providers/ViewProvider',
  '@adonisjs/lucid/providers/LucidProvider',
  '@adonisjs/bodyparser/providers/BodyParserProvider',
  '@adonisjs/cors/providers/CorsProvider',
  '@adonisjs/shield/providers/ShieldProvider',
  '@adonisjs/session/providers/SessionProvider',
  '@adonisjs/auth/providers/AuthProvider',
  '@adonisjs/ally/providers/AllyProvider',
  '@adonisjs/drive/providers/DriveProvider',
  '@adonisjs/websocket/providers/WsProvider',
  'adonis-cache/providers/CacheProvider',
  '@adonisjs/redis/providers/RedisProvider'
]


/*
|--------------------------------------------------------------------------
| Ace Providers
|--------------------------------------------------------------------------
|
| Ace providers are required only when running ace commands. For example
| Providers for migrations, tests etc.
|
*/
const aceProviders = [
  '@adonisjs/lucid/providers/MigrationsProvider',
  '@adonisjs/vow/providers/VowProvider',
  '@adonisjs/vow-browser/providers/VowBrowserProvider',
  'adonis-cache/providers/CommandsProvider'
]

/*
|--------------------------------------------------------------------------
| Aliases
|--------------------------------------------------------------------------
|
| Aliases are short unique names for IoC container bindings. You are free
| to create your own aliases.
|
| For example:
|   { Route: 'Adonis/Src/Route' }
|
*/
const aliases = {
  //Cache: 'Adonis/Addons/Cache'
  Cache: 'App/Helpers/CacheHelper',
  Sleep: 'App/Helpers/Sleep',
  Redis: 'Adonis/Addons/Redis',
  HttpException: 'App/Helpers/HttpException',
  Test: 'App/Helpers/Test/TestHelper',
  TestBrowser: 'App/Helpers/Test/TestBrowserHelper',
  //TestConfig: 'App/Helpers/Test/TestConfigHelper',
  Profiler: 'App/Helpers/Test/Profiler',
  //PACORTestHelper: 'App/Helpers/Test/PACORTestHelper',
}

/*
|--------------------------------------------------------------------------
| Commands
|--------------------------------------------------------------------------
|
| Here you store ace commands for your package
|
*/
const commands = []

module.exports = { providers, aceProviders, aliases, commands }
