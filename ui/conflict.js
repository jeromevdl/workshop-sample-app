export const timeLabel = (value) => value.slice(11, 16);

export function formatConflictMessage(roomName, conflict) {
  return `Room ${roomName} is already booked from ${timeLabel(conflict.existingStart)} to ${timeLabel(conflict.existingEnd)}, resulting in a conflict from ${timeLabel(conflict.overlapStart)} to ${timeLabel(conflict.overlapEnd)}.`;
}
