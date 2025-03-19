import { StyledList } from "../UI/List";
import { StyledListItem } from "../UI/List";
import StyledListItemsGroup from "../UI/List";
import { StyledListItemText } from "../UI/List";
import { StyledTypography } from "../UI/List";

const ItemsList = ({
  handleClickLike,
  showList,
  clickLikes,
  width,
  border,
}) => {
  const cancelLikes = (like) => {
    handleClickLike(!like.newLikeState, like.movie, like.moviesTitle);
  };
  return (
    <>
      {showList && (
        <StyledList width={width} border={border}>
          {clickLikes.length === 0 ? (
            <StyledListItem sx={{ paddingLeft: 0 }}>
              <StyledListItemText>
                <StyledTypography
                  component="p"
                  variant="body1"
                  sx={{ textAlign: "center" }}
                >
                  沒有收藏資料
                </StyledTypography>
              </StyledListItemText>
            </StyledListItem>
          ) : (
            <>
              {clickLikes.map((like) => {
                const url = `https://image.tmdb.org/t/p/original/${like.movie.poster_path}`;
                const clearName = like.moviesTitle.join(" ");
                return (
                  <StyledListItemsGroup
                    url={url}
                    clearName={clearName}
                    cancelLikes={cancelLikes}
                    like={like}
                    key={like.movie.id}
                    uniId={like.movie.id}
                  />
                );
              })}
            </>
          )}
        </StyledList>
      )}
    </>
  );
};

export default ItemsList;
