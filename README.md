# Store Angular App

- [Overview](#Overview)
  - [About](#About)
  - [Links](#links)
- [Features](#Features)
- [Technologies & Packages](#Technologies&Packages)
- [Clone app & Setup](#Cloneapp&Setup)
- [Built](#Build)

## Overview

### About

- A web application to show products for user and the admin can manage this products.
- You can add , update and delete products from admin dashboard and it will reflect at user view in same session.

### Links

- Live Site URL: [Store Angular App](https://omarfayez.github.io/Store-Angular-App/)
- Used Api For Products : [Fake Store Api](https://fakestoreapi.com/)

## Features

- Login Display : Basic login form and use static login users for the 2 roles:

  - User => `Username : user , Password : user `
  - Admin => `Username : admin , Password : admin `

- Security should be applied to the page to restrict only logged in users who can access it.
  This display will appear depending on the user role as follows:

  - #Admin View

    - Should display all products in a table with pagination.
    - Can add product.
    - Can update product.
    - Can delete product.

  - #User View

    - Show the different categories and under each category show the available products and filters section.
    - For each product card user should see the full data.
    - Use loading while getting the data and changing the products list with animation.

## Technologies & Packages

Project is created with:

- Angular 16
  - Standalone Components
  - Strong Typed Forms
  - TakeUntilDestroyed
  - Streamlined Page Title accessibility
  - Ng Optimized Image
- Typescript
- RxJS
- Service Worker
- Lightweight State Mangement (BehaviourSubject)
- Feature & Ui Components
- ngx-translation
- Shared Components
- Angular Material
- HTML
- SCSS
- Bootstrap 5
- ngx-progressbar
- ngx-toastr

## Clone app & Setup

git clone `https://github.com/OmarFayez/Store-Angular-App.git`

```pwsh
cd ./Store-Angular-App
npm install
npm start
Open your browser on http://localhost:4200/
```

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/store-angular-app` directory.
