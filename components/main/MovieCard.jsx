import { useState } from "react";
import StyledCardGroup from "../UI/Card";

const MovieCard = ({
  movie,
  moviesTitle,
  isLike,
  handleClickLike,
  loading,
}) => {
  const url = `https://image.tmdb.org/t/p/original/${movie.poster_path}`;
  const clearName = moviesTitle.join(" ");
  // console.log("從父組件傳來的isLikes", isLike);
  // 檢查點擊的like是否與儲存的like電影列表裡的電影Id相同，相同就提取沒有的，不同就新增到like電影列表
  const clickLike = () => {
    // 將LIke點擊狀態反轉與電影資訊傳回父組件
    handleClickLike(!isLike, movie, moviesTitle);
  };

  return (
    <StyledCardGroup
      movie={movie}
      isLike={isLike}
      clickLike={clickLike}
      url={url}
      clearName={clearName}
      loading={loading}
    />
  );
};

export default MovieCard;
