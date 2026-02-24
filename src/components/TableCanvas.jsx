import { useDroppable } from '@dnd-kit/core';
import { Table } from './Table';
import './TableCanvas.css';

export function TableCanvas({ guests, tables, onUpdateTable }) {
  const guestMap = Object.fromEntries(guests.map((g) => [g.id, g]));

  return (
    <div className="table-canvas">
      <div className="table-canvas-inner">
        {tables.map((table) => (
          <Table
            key={table.id}
            table={table}
            guests={table.guests.map((id) => guestMap[id]).filter(Boolean)}
            onUpdate={(updates) => onUpdateTable(table.id, updates)}
          />
        ))}
      </div>
      <UnassignedDropZone guestIds={guests.filter((g) => !g.tableId).map((g) => g.id)} guestMap={guestMap} />
    </div>
  );
}

function UnassignedDropZone({ guestIds, guestMap }) {
  const { setNodeRef, isOver } = useDroppable({ id: 'unassigned' });

  return (
    <div
      ref={setNodeRef}
      className={`unassigned-zone ${isOver ? 'over' : ''}`}
    >
      <span className="unassigned-label">Unassigned</span>
      <div className="unassigned-guests">
        {guestIds.map((id) => {
          const g = guestMap[id];
          if (!g) return null;
          return (
            <span key={id} className="unassigned-chip">
              {g.isBride && '👰 '}
              {g.isGroom && '🤵 '}
              {g.name}
            </span>
          );
        })}
        {guestIds.length === 0 && <span className="unassigned-empty">Drag guests here to remove from table</span>}
      </div>
    </div>
  );
}
