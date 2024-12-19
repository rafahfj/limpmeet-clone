export const extractUniqueKeys = (arrayOfObjects, key) => {
  return [
    ...new Set(
      arrayOfObjects
        .map((obj) => obj[key]) // Ambil nilai dari key
        .filter((value) => value !== undefined) // Hapus nilai undefined
    ),
  ];
};
