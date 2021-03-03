import { flashMessageStorageId } from '../config';
import { toast } from 'react-toastify';

type FlashMessageObj = {
  level: 'info' | 'warning' | 'error';
  message: string;
}

export function flash(
  messageObj: FlashMessageObj,
): void {
  localStorage.setItem(flashMessageStorageId, JSON.stringify(messageObj));
}

export function clearFlash() {
  localStorage.removeItem(flashMessageStorageId);
}

export function getFlash() {
  return localStorage.getItem(flashMessageStorageId);
}

export function flashToast() {
  const flashMessageObj = getFlash();

  if (flashMessageObj) {
    const { level, message } = JSON.parse(flashMessageObj);

    toast(message, {
      type: level || 'info',
    });

    clearFlash();
  }
}