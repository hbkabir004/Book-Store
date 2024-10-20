export const fetchBooks = async () => {
  try {
    const responses = await Promise.all([
      fetch('https://gutendex.com/books'),
      fetch('https://gutendex.com/books/?page=2'),
    ]);

    const [data1, data2] = await Promise.all(responses.map(res => res.json()));

    // Merging the 'results' arrays from both responses
    const mergedData = {
      ...data1,
      results: [...data1.results, ...data2.results],
    };

    return mergedData;
  } catch (error) {
    console.error('Error fetching books:', error);
    return null;
  }
};
