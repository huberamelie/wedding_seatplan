import { useDroppable } from '@dnd-kit/core';
import { TABLE_SHAPES } from '../utils/constants';
import { GUEST_GROUPS } from '../utils/constants';
import './Table.css';

export function Table({ table, guests, onUpdate }) {
  const { setNodeRef, isOver } = useDroppable({ id: table.id });

  return (
    <div
      ref={setNodeRef}
      className={`table-wrapper table-shape-${table.shape} ${isOver ? 'drag-over' : ''}`}
    >
      <div className="table-config">
        <input
          type="text"
          value={table.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="table-name-input"
        />
        <select
          value={table.shape}
          onChange={(e) => onUpdate({ shape: e.target.value })}
          className="table-shape-select"
        >
          {Object.entries(TABLE_SHAPES).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>
      <div className="table-surface">
        <div className="table-guests">
          {guests.map((guest) => (
            <div
              key={guest.id}
              className="table-guest-chip"
              style={{ background: GUEST_GROUPS[guest.group]?.color || GUEST_GROUPS.other.color }}
            >
              {guest.isBride && '👰 '}
              {guest.isGroom && '🤵 '}
              {guest.name}
            </div>
          ))}
          <span className="table-drop-hint">Drop guests here</span>
        </div>
      </div>
    </div>
  );
}
