const Pagination = ({ totalPosts, postsPerPage, setPostsPerPage }) => {
  const handleLoadMore = () => {
    setPostsPerPage(postsPerPage + 9);
  };

  //   console.log("called");

  return (
    <div className="flex items-center justify-center">
      {/* <button
        onClick={() => handleLoadMore()}
        className="btn btn-outline btn-block"
      >
        Load More
      </button> */}
      {postsPerPage < totalPosts && (
        <button
          onClick={() => handleLoadMore()}
          className="btn btn-outline btn-block"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default Pagination;
