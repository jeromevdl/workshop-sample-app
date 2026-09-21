import assert from 'node:assert/strict';
import { test } from 'node:test';
import { formatConflictMessage, timeLabel } from '../ui/conflict.js';

test('timeLabel extracts the HH:MM portion of a UTC timestamp', () => {
  assert.equal(timeLabel('2030-06-12T09:30:00.000Z'), '09:30');
});

test('formatConflictMessage follows the mandated template for a single conflict', () => {
  const message = formatConflictMessage('Cedar', {
    existingStart: '2030-06-12T09:00:00.000Z', existingEnd: '2030-06-12T10:00:00.000Z',
    overlapStart: '2030-06-12T09:30:00.000Z', overlapEnd: '2030-06-12T10:00:00.000Z',
  });
  assert.equal(message, 'Room Cedar is already booked from 09:00 to 10:00, resulting in a conflict from 09:30 to 10:00.');
});

test('formatConflictMessage renders one message per conflict when mapped over multiple entries', () => {
  const conflicts = [
    { existingStart: '2030-06-12T09:00:00.000Z', existingEnd: '2030-06-12T09:30:00.000Z', overlapStart: '2030-06-12T09:00:00.000Z', overlapEnd: '2030-06-12T09:30:00.000Z' },
    { existingStart: '2030-06-12T09:45:00.000Z', existingEnd: '2030-06-12T10:15:00.000Z', overlapStart: '2030-06-12T09:45:00.000Z', overlapEnd: '2030-06-12T10:00:00.000Z' },
  ];
  const messages = conflicts.map((conflict) => formatConflictMessage('Maple', conflict));
  assert.deepEqual(messages, [
    'Room Maple is already booked from 09:00 to 09:30, resulting in a conflict from 09:00 to 09:30.',
    'Room Maple is already booked from 09:45 to 10:15, resulting in a conflict from 09:45 to 10:00.',
  ]);
});
