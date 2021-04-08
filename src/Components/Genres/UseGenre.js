const useGenre = (selectedGenres) => {
    if (selectedGenres.length < 1) return "";
  
    const genreIds = selectedGenres.map((genre) => genre.id);
    return genreIds.reduce((acc, curr) => acc + "," + curr);
  };
  
  export default useGenre;

// genre look like: 
// 1
// 2
// 3
// 4
// now : 
// => 1,2,3,4