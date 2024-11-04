# Image uploader

# Setup

In order ro run frontend part:

1. From terminal go into frontend directory - `cd frontend`
2. Install dependencies `npm i`
3. Run frontend `npm start`

In order ro run backend part:

1. From terminal go into backend directory - `cd backend`
2. Install dependencies `npm i`
3. Run frontend `node index.js`

## General comments:

- I didn't use `useCallback`, `useMemo`, `memo`, because it doesn't make sense for this small app. All these performance optimizations costs you something (complexity, extra lines of code etc) and I don't use them when they are not needed. We can discuss in details on the call every case if needed.

## What else can be improved:

It is just few thoughts what can be improved, but the list can be infinite and will take a lot of time.

- Upload to heroku or similar
- Change local storage of `uploads` folder to `s3` or something similar
- Add protection if two steps above are done to limit amount of uploads, maybe some basic authentication to restrict public access
- Cover with tests: unit and integration
- Add image compression to store it in a more efficient way
- Store every image and show them to the user to be able to pick what to view and what to delete
- Save all manipulations with the image on the server: painting, resizing etc.
