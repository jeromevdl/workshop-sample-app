import assert from 'node:assert/strict';
import { test } from 'node:test';
import { toApiError } from '../ui/api.js';

test('toApiError attaches status and conflicts from a 409 conflict body', () => {
  const conflicts = [{
    existingStart: '2030-06-12T09:00:00.000Z', existingEnd: '2030-06-12T10:00:00.000Z',
    overlapStart: '2030-06-12T09:30:00.000Z', overlapEnd: '2030-06-12T10:00:00.000Z',
  }];
  const error = toApiError(409, { error: 'This room is already booked for part of the requested time.', conflicts });
  assert.equal(error.message, 'This room is already booked for part of the requested time.');
  assert.equal(error.status, 409);
  assert.deepEqual(error.conflicts, conflicts);
});

test('toApiError leaves conflicts undefined for a non-conflict error body', () => {
  const error = toApiError(400, { error: 'End time must be after start time.' });
  assert.equal(error.message, 'End time must be after start time.');
  assert.equal(error.status, 400);
  assert.equal(error.conflicts, undefined);
});

test('toApiError falls back to a generic message when the body carries none', () => {
  const error = toApiError(500, {});
  assert.equal(error.message, 'Unable to complete the request.');
  assert.equal(error.status, 500);
});
