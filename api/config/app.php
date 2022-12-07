<?php

use Illuminate\Support\Facades\Facade;

return [
    /*
    |--------------------------------------------------------------------------
    | Application Name
    |--------------------------------------------------------------------------
    |
    | This value is the name of your application. This value is used when the
    | framework needs to place the application's name in a notification or
    | any other location as required by the application or its packages.
    |
    */

    'name' => env('APP_NAME', 'Laravel'),

    /*
    |--------------------------------------------------------------------------
    | Application Environment
    |--------------------------------------------------------------------------
    |
    | This value determines the "environment" your application is currently
    | running in. This may determine how you prefer to configure various
    | services the application utilizes. Set this in your ".env" file.
    |
    */

    'env' => env('APP_ENV', 'production'),

    /*
    |--------------------------------------------------------------------------
    | Application Debug Mode
    |--------------------------------------------------------------------------
    |
    | When your application is in debug mode, detailed error messages with
    | stack traces will be shown on every error that occurs within your
    | application. If disabled, a simple generic error page is shown.
    |
    */

    'debug' => (bool) env('APP_DEBUG', false),

    /*
    |--------------------------------------------------------------------------
    | Application URL
    |--------------------------------------------------------------------------
    |
    | This URL is used by the console to properly generate URLs when using
    | the Artisan command line tool. You should set this to the root of
    | your application so that it is used when running Artisan tasks.
    |
    */

    'url' => env('APP_URL', 'http://localhost:8000'),

    'asset_url' => env('ASSET_URL'),
    'arabic_regex' => "/[\x{591}-\x{5C7}\x{5D0}-\x{5EA}\x{5F0}-\x{5F4}\x{600}-\x{604}\x{606}-\x{60B}\x{60D}-\x{61A}\x{61E}\x{620}-\x{63F}\x{641}-\x{64A}\x{656}-\x{66F}\x{671}-\x{6DC}\x{6DE}-\x{6FF}\x{750}-\x{77F}\x{8A0}-\x{8B4}\x{8B6}-\x{8BD}\x{8D4}-\x{8E1}\x{8E3}-\x{8FF}\x{FB1D}-\x{FB36}\x{FB38}-\x{FB3C}\x{FB3E}\x{FB40}-\x{FB41}\x{FB43}-\x{FB44}\x{FB46}-\x{FBC1}\x{FBD3}-\x{FD3D}\x{FD50}-\x{FD8F}\x{FD92}-\x{FDC7}\x{FDF0}-\x{FDFD}\x{FE70}-\x{FE74}\x{FE76}-\x{FEFC}\x{10E60}-\x{10E7E}\x{1EE00}-\x{1EE03}\x{1EE05}-\x{1EE1F}\x{1EE21}-\x{1EE22}\x{1EE24}\x{1EE27}\x{1EE29}-\x{1EE32}\x{1EE34}-\x{1EE37}\x{1EE39}\x{1EE3B}\x{1EE42}\x{1EE47}\x{1EE49}\x{1EE4B}\x{1EE4D}-\x{1EE4F}\x{1EE51}-\x{1EE52}\x{1EE54}\x{1EE57}\x{1EE59}\x{1EE5B}\x{1EE5D}\x{1EE5F}\x{1EE61}-\x{1EE62}\x{1EE64}\x{1EE67}-\x{1EE6A}\x{1EE6C}-\x{1EE72}\x{1EE74}-\x{1EE77}\x{1EE79}-\x{1EE7C}\x{1EE7E}\x{1EE80}-\x{1EE89}\x{1EE8B}-\x{1EE9B}\x{1EEA1}-\x{1EEA3}\x{1EEA5}-\x{1EEA9}\x{1EEAB}-\x{1EEBB}\x{1EEF0}-\x{1EEF1}]+/iu",
    'ar_en_reg' => "/[\x{591}-\x{5C7}\x{5D0}-\x{5EA}\x{5F0}-\x{5F4}\x{600}-\x{604}\x{606}-\x{60B}\x{60D}-\x{61A}\x{61E}\x{620}-\x{63F}\x{641}-\x{64A}\x{656}-\x{66F}\x{671}-\x{6DC}\x{6DE}-\x{6FF}\x{750}-\x{77F}\x{8A0}-\x{8B4}\x{8B6}-\x{8BD}\x{8D4}-\x{8E1}\x{8E3}-\x{8FF}\x{FB1D}-\x{FB36}\x{FB38}-\x{FB3C}\x{FB3E}\x{FB40}-\x{FB41}\x{FB43}-\x{FB44}\x{FB46}-\x{FBC1}\x{FBD3}-\x{FD3D}\x{FD50}-\x{FD8F}\x{FD92}-\x{FDC7}\x{FDF0}-\x{FDFD}\x{FE70}-\x{FE74}\x{FE76}-\x{FEFC}\x{10E60}-\x{10E7E}\x{1EE00}-\x{1EE03}\x{1EE05}-\x{1EE1F}\x{1EE21}-\x{1EE22}\x{1EE24}\x{1EE27}\x{1EE29}-\x{1EE32}\x{1EE34}-\x{1EE37}\x{1EE39}\x{1EE3B}\x{1EE42}\x{1EE47}\x{1EE49}\x{1EE4B}\x{1EE4D}-\x{1EE4F}\x{1EE51}-\x{1EE52}\x{1EE54}\x{1EE57}\x{1EE59}\x{1EE5B}\x{1EE5D}\x{1EE5F}\x{1EE61}-\x{1EE62}\x{1EE64}\x{1EE67}-\x{1EE6A}\x{1EE6C}-\x{1EE72}\x{1EE74}-\x{1EE77}\x{1EE79}-\x{1EE7C}\x{1EE7E}\x{1EE80}-\x{1EE89}\x{1EE8B}-\x{1EE9B}\x{1EEA1}-\x{1EEA3}\x{1EEA5}-\x{1EEA9}\x{1EEAB}-\x{1EEBB}\x{1EEF0}-\x{1EEF1}\w0-9_ .-]+/iu",

    /*
    |--------------------------------------------------------------------------
    | Application Timezone
    |--------------------------------------------------------------------------
    |
    | Here you may specify the default timezone for your application, which
    | will be used by the PHP date and date-time functions. We have gone
    | ahead and set this to a sensible default for you out of the box.
    |
    */

    'timezone' => 'Africa/Cairo',

    /*
    |--------------------------------------------------------------------------
    | Application Locale Configuration
    |--------------------------------------------------------------------------
    |
    | The application locale determines the default locale that will be used
    | by the translation service provider. You are free to set this value
    | to any of the locales which will be supported by the application.
    |
    */

    'locale' => 'en',

    /*
    |--------------------------------------------------------------------------
    | Application Fallback Locale
    |--------------------------------------------------------------------------
    |
    | The fallback locale determines the locale to use when the current one
    | is not available. You may change the value to correspond to any of
    | the language folders that are provided through your application.
    |
    */

    'fallback_locale' => 'en',

    /*
    |--------------------------------------------------------------------------
    | Faker Locale
    |--------------------------------------------------------------------------
    |
    | This locale will be used by the Faker PHP library when generating fake
    | data for your database seeds. For example, this will be used to get
    | localized telephone numbers, street address information and more.
    |
    */

    'faker_locale' => 'en_US',

    /*
    |--------------------------------------------------------------------------
    | Encryption Key
    |--------------------------------------------------------------------------
    |
    | This key is used by the Illuminate encrypter service and should be set
    | to a random, 32 character string, otherwise these encrypted strings
    | will not be safe. Please do this before deploying an application!
    |
    */

    'key' => env('APP_KEY'),

    'cipher' => 'AES-256-CBC',

    /*
    |--------------------------------------------------------------------------
    | Maintenance Mode Driver
    |--------------------------------------------------------------------------
    |
    | These configuration options determine the driver used to determine and
    | manage Laravel's "maintenance mode" status. The "cache" driver will
    | allow maintenance mode to be controlled across multiple machines.
    |
    | Supported drivers: "file", "cache"
    |
    */

    'maintenance' => [
        'driver' => 'file',
        // 'store'  => 'redis',
    ],

    /*
    |--------------------------------------------------------------------------
    | Autoloaded Service Providers
    |--------------------------------------------------------------------------
    |
    | The service providers listed here will be automatically loaded on the
    | request to your application. Feel free to add your own services to
    | this array to grant expanded functionality to your applications.
    |
    */

    'providers' => [
        /*
         * Laravel Framework Service Providers...
         */
        Illuminate\Auth\AuthServiceProvider::class,
        Illuminate\Broadcasting\BroadcastServiceProvider::class,
        Illuminate\Bus\BusServiceProvider::class,
        Illuminate\Cache\CacheServiceProvider::class,
        Illuminate\Foundation\Providers\ConsoleSupportServiceProvider::class,
        Illuminate\Cookie\CookieServiceProvider::class,
        Illuminate\Database\DatabaseServiceProvider::class,
        Illuminate\Encryption\EncryptionServiceProvider::class,
        Illuminate\Filesystem\FilesystemServiceProvider::class,
        Illuminate\Foundation\Providers\FoundationServiceProvider::class,
        Illuminate\Hashing\HashServiceProvider::class,
        Illuminate\Mail\MailServiceProvider::class,
        Illuminate\Notifications\NotificationServiceProvider::class,
        Illuminate\Pagination\PaginationServiceProvider::class,
        Illuminate\Pipeline\PipelineServiceProvider::class,
        Illuminate\Queue\QueueServiceProvider::class,
        Illuminate\Redis\RedisServiceProvider::class,
        Illuminate\Auth\Passwords\PasswordResetServiceProvider::class,
        Illuminate\Session\SessionServiceProvider::class,
        Illuminate\Translation\TranslationServiceProvider::class,
        Illuminate\Validation\ValidationServiceProvider::class,
        Illuminate\View\ViewServiceProvider::class,

        /*
         * Package Service Providers...
         */

        /*
         * Application Service Providers...
         */
        App\Providers\AppServiceProvider::class,
        App\Providers\AuthServiceProvider::class,
        // App\Providers\BroadcastServiceProvider::class,
        App\Providers\EventServiceProvider::class,
        App\Providers\RouteServiceProvider::class,
    ],

    /*
    |--------------------------------------------------------------------------
    | Class Aliases
    |--------------------------------------------------------------------------
    |
    | This array of class aliases will be registered when this application
    | is started. However, feel free to register as many as you wish as
    | the aliases are "lazy" loaded so they don't hinder performance.
    |
    */

    'aliases' => Facade::defaultAliases()->merge([
        // 'ExampleClass' => App\Example\ExampleClass::class,
    ])->toArray(),
];
