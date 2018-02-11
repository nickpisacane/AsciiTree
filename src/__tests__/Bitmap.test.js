import Bitmap from '../Bitmap';

test('it works', () => {
  const bitmap = new Bitmap(3, 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      bitmap.writeString(i, j, (j * 3 + i).toString());
    }
  }

  expect(bitmap.toString()).toBe(
    `012\n345\n678`
  );
});
