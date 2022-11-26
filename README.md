# Booking Management System

## Client Side

#### Requirements

- `Node.js` installed on your system , download from [HERE](https://nodejs.org/dist/v18.12.1/node-v18.12.1-x64.msi)
- First, run the development server:

```bash
npm install
```

```bash
npm run dev
# or
yarn dev
```

- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Server side

#### Requirements

- `Xampp` installed on your machine , download it from [HERE](https://sourceforge.net/projects/xampp/files/XAMPP%20Windows/7.4.33/xampp-windows-x64-7.4.33-0-VC15-installer.exe)
- `Composer` installed on your machine , download it from [HERE](https://getcomposer.org/Composer-Setup.exe)

### Installation

- install xampp  , composer
- run xampp from that directory and open `xampp-control`

```bash
C:\xampp
```

- Start `Apache` and `Mysql`
- Create a database from [HERE](http://localhost/phpmyadmin/index.php?route=/server/databases)
- Open `Api` directory and create `.env` file
- Copy all the content from `.env.example` and paste it in `.env`
- Change That value to your database name

```php
DB_DATABASE= Your_Database_Name
```

- Open up your terminal or command line and paste the following commands

```bash
php artisan key:gen
```

```bash
php artisan migrate:fresh --seed
```

```bash
php artsian serve
```

- Your api is

```console
127.0.0.1:8000
```

If you like our project Make ❤
