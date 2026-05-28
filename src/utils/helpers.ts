// Format date: "2021-08-19" → "19 Aug 2021"
export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function generateId() {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

  const randomLetters =
    letters[Math.floor(Math.random() * letters.length)] +
    letters[Math.floor(Math.random() * letters.length)]

  const randomNumbers = Math.floor(
    1000 + Math.random() * 9000
  )

  return randomLetters + randomNumbers
}