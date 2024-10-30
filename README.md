# image-uploader

General comments:

- I didn't use `useCallback`, `useMemo`, `memo`, because it doesn't make sense for this small app. All these performance optimizations costs you something (complexity, extra lines of code etc) and I don't use them when they are not needed.

## What else can be improved:

- Upload to heroku or similar
- Change local storage of `uploads` folder to `s3` or something similar
- Add protection if two steps above are done to limit amount of uploads, maybe some basic authentication to restrict public access
- Cover with tests: unit and integration
- Add image compression to store it in a more efficient way
