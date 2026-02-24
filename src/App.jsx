import { useCallback } from 'react';
import { DndContext } from '@dnd-kit/core';
import { GuestPanel } from './components/GuestPanel';
import { TableCanvas } from './components/TableCanvas';
import { TableOverview } from './components/TableOverview';
import { useLocalStorage } from './hooks/useLocalStorage';
import { STORAGE_KEY } from './utils/constants';
import './App.css';

const defaultGuests = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: `guest-${i + 1}`,
    name: `Guest ${i + 1}`,
    group: 'other',
    isBride: false,
    isGroom: false,
    tableId: null,
  }));

const defaultTables = (count) =>
  Array.from({ length: count }, (_, i) => ({
    id: `table-${i + 1}`,
    name: `Table ${i + 1}`,
    shape: 'round',
    guests: [],
  }));

const defaultState = {
  guestCount: 10,
  tableCount: 4,
  guests: defaultGuests(10),
  tables: defaultTables(4),
};

function App() {
  const [state, setState] = useLocalStorage(STORAGE_KEY, defaultState);

  const setGuests = useCallback(
    (guests) => setState((s) => ({ ...s, guests })),
    [setState]
  );

  const setTables = useCallback(
    (tables) => setState((s) => ({ ...s, tables })),
    [setState]
  );

  const setGuestCount = useCallback(
    (count) => {
      const n = Math.max(1, parseInt(count, 10) || 1);
      setState((s) => {
        const guests = [...s.guests];
        while (guests.length < n) {
          guests.push({
            id: `guest-${Date.now()}-${guests.length}`,
            name: `Guest ${guests.length + 1}`,
            group: 'other',
            isBride: false,
            isGroom: false,
            tableId: null,
          });
        }
        return { ...s, guestCount: n, guests: guests.slice(0, n) };
      });
    },
    [setState]
  );

  const setTableCount = useCallback(
    (count) => {
      const n = Math.max(1, parseInt(count, 10) || 1);
      setState((s) => {
        const tables = [...s.tables];
        while (tables.length < n) {
          tables.push({
            id: `table-${Date.now()}-${tables.length}`,
            name: `Table ${tables.length + 1}`,
            shape: 'round',
            guests: [],
          });
        }
        const newTables = tables.slice(0, n);
        const guestIds = new Set(newTables.flatMap((t) => t.guests));
        const updatedGuests = s.guests.map((g) =>
          guestIds.has(g.id) ? g : { ...g, tableId: null }
        );
        return {
          ...s,
          tableCount: n,
          tables: newTables.map((t) => ({
            ...t,
            guests: t.guests.filter((id) => guestIds.has(id)),
          })),
          guests: updatedGuests,
        };
      });
    },
    [setState]
  );

  const updateGuest = useCallback(
    (id, updates) => {
      setGuests((prev) =>
        prev.map((g) => (g.id === id ? { ...g, ...updates } : g))
      );
    },
    [setGuests]
  );

  const updateTable = useCallback(
    (id, updates) => {
      setTables((prev) =>
        prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
      );
    },
    [setTables]
  );

  const handleDragEnd = useCallback(
    (event) => {
      const { active, over } = event;
      if (!over) return;

      const guestId = active.id;
      const overId = String(over.id);

      if (overId.startsWith('table-')) {
        const tableId = overId;
        setTables((prev) =>
          prev.map((t) => {
            if (t.id === tableId) {
              const has = t.guests.includes(guestId);
              if (has) return t;
              return { ...t, guests: [...t.guests, guestId] };
            }
            return { ...t, guests: t.guests.filter((id) => id !== guestId) };
          })
        );
        setGuests((prev) =>
          prev.map((g) =>
            g.id === guestId ? { ...g, tableId } : g
          )
        );
      } else if (overId === 'unassigned') {
        setTables((prev) =>
          prev.map((t) => ({
            ...t,
            guests: t.guests.filter((id) => id !== guestId),
          }))
        );
        setGuests((prev) =>
          prev.map((g) =>
            g.id === guestId ? { ...g, tableId: null } : g
          )
        );
      }
    },
    [setGuests, setTables]
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="app">
        <header className="app-header">
          <h1>Wedding Seat Plan</h1>
        </header>
        <div className="app-layout">
          <aside className="panel panel-left">
            <GuestPanel
              guests={state.guests}
              guestCount={state.guestCount}
              tableCount={state.tableCount}
              onGuestCountChange={setGuestCount}
              onTableCountChange={setTableCount}
              onUpdateGuest={updateGuest}
            />
          </aside>
          <main className="panel panel-center">
            <TableCanvas
              guests={state.guests}
              tables={state.tables}
              onUpdateTable={updateTable}
            />
          </main>
          <aside className="panel panel-right">
            <TableOverview guests={state.guests} tables={state.tables} />
          </aside>
        </div>
      </div>
    </DndContext>
  );
}

export default App;
