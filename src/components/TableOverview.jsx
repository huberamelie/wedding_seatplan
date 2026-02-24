import { GUEST_GROUPS } from '../utils/constants';
import './TableOverview.css';

export function TableOverview({ guests, tables }) {
  const guestMap = Object.fromEntries(guests.map((g) => [g.id, g]));
  const unassigned = guests.filter((g) => !g.tableId);

  return (
    <div className="table-overview">
      <h3>Seating Overview</h3>
      <div className="overview-list">
        {tables.map((table) => {
          const tableGuests = table.guests
            .map((id) => guestMap[id])
            .filter(Boolean);
          return (
            <div key={table.id} className="overview-table-card">
              <div className="overview-table-name">{table.name}</div>
              <ul className="overview-guest-list">
                {tableGuests.map((guest) => (
                  <li
                    key={guest.id}
                    className="overview-guest-item"
                    style={{
                      borderLeftColor: GUEST_GROUPS[guest.group]?.color || GUEST_GROUPS.other.color,
                    }}
                  >
                    {guest.isBride && '👰 '}
                    {guest.isGroom && '🤵 '}
                    {guest.name}
                  </li>
                ))}
              </ul>
              {tableGuests.length === 0 && (
                <span className="overview-empty">No guests yet</span>
              )}
            </div>
          );
        })}
        <div className="overview-table-card unassigned-card">
          <div className="overview-table-name">Unassigned</div>
          <ul className="overview-guest-list">
            {unassigned.map((guest) => (
              <li
                key={guest.id}
                className="overview-guest-item"
                style={{
                  borderLeftColor: GUEST_GROUPS[guest.group]?.color || GUEST_GROUPS.other.color,
                }}
              >
                {guest.isBride && '👰 '}
                {guest.isGroom && '🤵 '}
                {guest.name}
              </li>
            ))}
          </ul>
          {unassigned.length === 0 && (
            <span className="overview-empty">All assigned</span>
          )}
        </div>
      </div>
    </div>
  );
}
