# Wedding Seat Plan

A web app to plan wedding seating: manage guests and groups, place tables, and drag-and-drop guests onto seats. Everything runs in the browser and saves automatically.

## How to use

- **Open the app**: Open `plain-html/index.html` in a browser (double-click or drag into Chrome, Edge, Firefox, etc.), or use the live link if you host it (e.g. GitHub Pages).
- **No install needed**: Single HTML file; no build step or server required. Data is stored in the browser (localStorage).

## Features

### Guest list (left panel)
- Set **number of guests** and **number of tables**.
- **Bride** and **Groom** stay at the top; assign names, groups, and “Child”.
- **Groups**: Bride's family, Groom's family, Friends, Coworkers, Maid of honor, Best man, Other — or add your own. Use “Add new group…” in any guest’s dropdown.
- **Import list**: Upload a CSV (columns: Name, optional Group, optional Child). New guests are added; Bride and Groom are kept.
- **Auto-assign**: Fills empty seats with unassigned guests and keeps **groups together** where possible.
- Assigned guests move to the **bottom** of the list and are shown with a **blue** highlight.

### Venue (center)
- **Tables**: Drag to move; use the resize handle (when the table is selected) to change size. Click the table name to edit it.
- **Shapes**: Round or rectangular.
- **Seats**: Use **+** / **−** on a selected table (or in the right panel) to add or remove chairs. Click **×** on a chair to remove that chair. Drag the **⋮⋮** grip to move a chair’s position (no need to select the table).
- **Zoom**: Use the **+** / **−** bar (top-right of the venue), or the buttons at the bottom-right. **Ctrl + scroll** to zoom with the mouse; **pinch** to zoom on touch devices.
- **Pan**: Drag on empty space to move the view.
- **Unassigned** area at the bottom: drop guests here to remove them from a table.

### Table settings (right panel)
- When a table is selected: change **name**, **shape**, **number of seats**, and **chair layout** (around, one side, two sides, etc.).
- **Align chairs** resets chair positions to the chosen layout.

### Export & print
- **Export Excel**: Downloads a CSV (Guest, Group, Table, Seat) that opens in Excel.
- **Print plan (PDF)**: Captures the current seat plan as an image and downloads a **PDF** of the layout.

### Other
- **Undo / Redo**: Buttons in the header and **Ctrl+Z** / **Ctrl+Y** (or Ctrl+Shift+Z).
- **Resizable panels**: Drag the vertical dividers between left, center, and right to resize.

## File structure

```
plain-html/
  index.html   # The full app (HTML, CSS, JS in one file)
```

## Hosting (e.g. GitHub Pages)

1. Push the repo to GitHub.
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to **Deploy from a branch**.
4. Choose branch **main** and folder **/ (root)**, then **Save**.
5. After a minute or two, the site is at:  
   `https://<your-username>.github.io/wedding_seatplan/plain-html/index.html`

Share that link so others can open the seat plan in their browser.

## Browser support

Works in current versions of Chrome, Edge, Firefox, and Safari. Uses localStorage, so data stays on the device/browser where you use it.

## License

Use and modify as you like for your wedding or events.
