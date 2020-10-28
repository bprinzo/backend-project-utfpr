# Backend Register and Post Uploader

This is an API restful powered by Node.JS, Express and MongoDB, that provides register functions such as first and last name, email, username and password furthermore it 
provides the capability of upload posts with title, text and images.
 
## Features

* Register of Users
* Searches by all users or individual
* Creation of posts with title, text and images
* Search for posts by their titles and for all of them
* Storage of data in mongoDB

## Built With

* [Node.js](https://nodejs.org/en/)
* [Express](https://expressjs.com/pt-br/)
* [MongoDB](https://www.mongodb.com/)
* [Mongoose](https://mongoosejs.com/)

## Getting Started

### Prerequisites

* Node.js
* MongoDB

**Node.js v15x**

```
# Using Ubuntu
curl -sL https://deb.nodesource.com/setup_15.x | sudo -E bash -
sudo apt-get install -y nodejs

# Using Debian, as root
curl -sL https://deb.nodesource.com/setup_15.x | bash -
apt-get install -y nodejs
```
 * Windows donwload and install de .msi [Node.js](https://nodejs.org/en/)
 
**MongoDB**

* Windows install instructions [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-windows/)
* Ubuntu install instructions [MongoDB](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/)

### Installation instructions

1. Clone de repo

```git clone https://github.com/bprinzo/backend-project-utfpr.git```

2. Install Yarn packages

```
yarn
```
3. Start the API
```
yarn dev
```

