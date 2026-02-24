import { useDraggable } from '@dnd-kit/core';
import { GuestList } from './GuestList';
import { GUEST_GROUPS } from '../utils/constants';
import './GuestPanel.css';

export function GuestPanel({
  guests,
  guestCount,
  tableCount,
  onGuestCountChange,
  onTableCountChange,
  onUpdateGuest,
}) {
  return (
    <div className="guest-panel">
      <div className="guest-panel-config">
        <div className="config-row">
          <label>Guests</label>
          <input
            type="number"
            min="1"
            max="200"
            value={guestCount}
            onChange={(e) => onGuestCountChange(e.target.value)}
          />
        </div>
        <div className="config-row">
          <label>Tables</label>
          <input
            type="number"
            min="1"
            max="50"
            value={tableCount}
            onChange={(e) => onTableCountChange(e.target.value)}
          />
        </div>
      </div>

      <div className="guest-panel-header">
        <h3>Guest List</h3>
        <span className="group-legend">
          {Object.entries(GUEST_GROUPS).map(([key, { label, color }]) => (
            <span key={key} className="legend-dot" style={{ background: color }} title={label} />
          ))}
        </span>
      </div>

      <div className="guest-list-scroll">
        {guests.map((guest) => (
          <GuestList
            key={guest.id}
            guest={guest}
            onUpdate={(updates) => onUpdateGuest(guest.id, updates)}
            isDraggable={true}
          />
        ))}
      </div>
    </div>
  );
}
