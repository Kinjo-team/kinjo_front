export function getRandomItineraries(array: any[], count: number): any[] {
  const shuffled = array.slice();
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = shuffled[currentIndex];
    shuffled[currentIndex] = shuffled[randomIndex];
    shuffled[randomIndex] = temporaryValue;
  }

  return shuffled.slice(0, count);
}
