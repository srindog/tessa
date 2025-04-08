export function capitalizePhrase(phrase: string) {
  const words = phrase.split(' ');
  const capitalizedPhrase = words
    .map((word: any) => {
      return word[0].toUpperCase() + word.substring(1);
    })
    .join(' ');
  return capitalizedPhrase;
}

export function capitalizeWord(word: any) {
  return word[0].toUpperCase() + word.substring(1);
}

const MONTHS = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

function getNumberWithOrdinal(n: any) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function getDateStringFromDateInput(validDateInput: any) {
  const date = new Date(validDateInput);
  return `${MONTHS[date.getMonth()]} ${getNumberWithOrdinal(
    date.getDate()
  )}, ${date.getFullYear()}`;
}

export function getPublishedDateStringFromUnixTimestamp(unixTimestamp: any) {
  const date = new Date(unixTimestamp);
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}
