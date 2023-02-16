# MyTONE
<em>The gear enthusiast suite</em>

## Description

MyTone is a social network for guitarists and bassists (expandable to any collectible item or hobby objects) where you can share your instruments and interact with other users and their dream gears.

You can register and "upload" your instruments. Explain their details, characteristics, modifications and add some photos.
    
In a near future, you will can interact with other users by sending "like" to the other instrumentsand chat to generate a network full of reviews, photos and characteristics of guitars and basses.

---

## Instructions

When cloning the project, change the <code>sample.env</code> for an <code>.env</code> with the values you consider:
```js
PORT=3000
MONGO_URL='mongodb://localhost:27017/app-name'
SESSION_SECRET='SecretOfYourOwnChoosing'
NODE_ENV='development'
```
Then, run:
```bash
npm install
```
To start the project run:
```bash
npm run start
```

To work on the project and have it listen for changes:
```bash
npm run dev
```

For a proper view, use Google Inspection and add Iphone format.

---

## Wireframes
Sign Up

<img src='docs/Readme/signUp.jpg' width="120" height="250" />

---

Home Logged

<img src='docs/Readme/homeLogged.jpg' width="120" height="250" />

---

New Instrument

<img src='docs/Readme/newInstrument.png' width="120" height="250" />

---

Instrument Card

<img src='docs/Readme/instrumentCard.jpg' width="120" height="250" />

---

Profile

<img src='docs/Readme/Profile.jpg' width="120" height="250" />

---

Search

<img src='docs/Readme/search.jpg' width="120" height="250" />

---

## User stories (MVP)

What can the user do with the app?
- User can sign up and create and account
- User can login
- User can log out
- User can edit his profile (name and picture)
- User can create Instrument
- User can edit Instrument (only his instruments)
- User can delete Instrument (only his instruments)
- User can search instruments by brand

## User stories (Backlog)

- User can "like" instruments
- User can upload a profile picture
- User can upload an instrument picture
- User can mark as stoled his instruments
- User can mark as "for sale" his instruments
- User can follow other users
- User can chat with other users


---

## Models

USER MODEL:
```js
const userSchema = new Schema(
{
    username: {
      type: String,
      trim: true,
      required: [true, 'Username is required.'],
      unique: true
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    hashedPassword: {
      type: String,
      required: [true, 'Password is required.']
    },
    image: {
      type: String,
      default: 'https://t4.ftcdn.net/jpg/00/65/77/27/360_F_65772719_A1UV5kLi5nCEWI0BNLLiFaBPEkUbv5Fv.jpg'
    }
  },
  {
    timestamps: true
  }
);
```
INSTRUMENT MODEL:
```js
const instrumentSchema = new Schema(
  {
    brand: {
        type: String,
        required: [true, "You must introduce your instrument's brand"]
    },
    model:  {
        type: String,
        required: [true, "You must introduce your instrument's model"]
    },
    year: Number,
    madeIn: String,
    type: {
        type: String,
        
    },
    description: String,
    owner:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String,
        default: 'https://www.nicepng.com/png/detail/2-24003_jpg-freeuse-stock-guitar-png-for-free-download.png'
    },
},
    {timestamps: true

});
```
---

## Routes

| Name          |Method | Endpoint            |Protected| Req.body                                                |Redirects                  |
|---------------|-------|---------------------|---------|---------------------------------------------------------|---------------------------|
| Home          |GET    |/                    | No      |                                                         |                           |
| Login         |GET    |/auth/login          | No      |                                                         |                           |
| Login         |POST   |/auth/login          | No      |{email, password}                                        |/profile                   |
| Signup        |GET    |/auth/signup         | No      |                                                         |                           |
| Signup        |POST   |/auth/signup         | No      |{username, email, password}                              |/auth/login                |
| Profile       |GET    |/profile             | Yes     |                                                         |                           |
| Edit Profile  |GET    |/profile/edit        | Yes     |                                                         |                           |
| Edit rofile   |POST   |/profile/edit        | Yes     |{brand, model, year, type, madeIn, image, description}   |/instruments/:instrumentId |
| New instrument|GET    |/instruments/new     | Yes     |                                                         |                           |
| New instrument|POST   |/instruments/new     | Yes     |{username, image}                                        |/profile                   |
| Search        |GET    |/instruments/search  | Yes     |                                                         |                           |
| Instrument    |GET    |/:instrumentId       | Yes     |                                                         |                           |
| Edit          |GET    |/edit/:instrumentId  | Yes     |                                                         |                           |
| Edit          |POST   |/edit/:instrumentId  | Yes     |{brand, model, year, type, madeIn, image, description}   |/instruments/:instrumentId | 
| Delete        |GET    |/delete/:instrumentId| Yes     |                                                         |                           |
---

## Useful links

- [Github Repo]()
- [Trello kanban]()
- [Deployed version]()
- [Presentation slides](https://www.slides.com)



