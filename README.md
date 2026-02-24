# Wedding Seat Plan

A small web app to arrange wedding seating: set guest count, table count, table shapes, guest names and groups, then drag and drop guests onto tables. Pastel styling and layout saved in the browser.

## Run locally

1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open the URL shown (e.g. http://localhost:5173)

## Build

- `npm run build` — output in `dist/`
- `npm run preview` — serve the built app

## Features

- **Left panel**: Set number of guests and tables; list of guests with name, group (Family / Friends / Coworkers / Other), and Bride/Groom toggles. Drag handle to move guests.
- **Center**: Tables with editable name and shape (Round / Rectangular / Square). Drop guests on a table or in the “Unassigned” area.
- **Right panel**: Seating overview per table and unassigned list.
- Data is stored in `localStorage` so it survives refresh.
