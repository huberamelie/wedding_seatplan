import { useDraggable } from '@dnd-kit/core';
import { GUEST_GROUPS } from '../utils/constants';
import './GuestList.css';

export function GuestList({ guest, onUpdate, isDraggable = false }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: guest.id,
    data: { type: 'guest', guest },
  });

  const groupColor = GUEST_GROUPS[guest.group]?.color || GUEST_GROUPS.other.color;

  return (
    <div
      ref={setNodeRef}
      className={`guest-list-item ${isDragging ? 'dragging' : ''}`}
      style={{ borderLeftColor: groupColor }}
    >
      <div
        className="guest-drag-handle"
        {...(isDraggable ? { ...attributes, ...listeners } : {})}
        title="Drag to assign"
      >
        ⋮⋮
      </div>
      <div className="guest-content">
        <input
          type="text"
          value={guest.name}
          onChange={(e) => onUpdate({ name: e.target.value })}
          className="guest-name-input"
          placeholder="Name"
        />
        <select
          value={guest.group}
          onChange={(e) => onUpdate({ group: e.target.value })}
          className="guest-group-select"
        >
          {Object.entries(GUEST_GROUPS).map(([key, { label }]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
        <div className="guest-badges">
          <button
            type="button"
            className={`badge-btn ${guest.isBride ? 'active' : ''}`}
            onClick={() => onUpdate({ isBride: !guest.isBride })}
            title="Bride"
          >
            👰
          </button>
          <button
            type="button"
            className={`badge-btn ${guest.isGroom ? 'active' : ''}`}
            onClick={() => onUpdate({ isGroom: !guest.isGroom })}
            title="Groom"
          >
            🤵
          </button>
        </div>
      </div>
    </div>
  );
}
