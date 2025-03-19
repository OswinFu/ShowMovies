import { useState, useEffect } from "react";
import ChipSelect from "../components/header/ChipSelect";
import MovieCard from "../components/main/MovieCard";
import StyledButton from "../components/UI/Button";
import StyledBox from "../components/UI/Box";
import axios from "axios";
import ItemsList from "../components/header/ItemsList";
import Container from "@mui/material/Container";
import StyledAppBar from "../components/UI/AppBar";
import ToolbarIcons from "../components/footer/ToolBar";
import ListButton from "../components/header/ListButton";
import Typography from "@mui/material/Typography";

export default function Home() {
  const [selectedTagsId, setSelectedTagsId] = useState([]); // 存儲選中的標籤狀態
  const [selectedTagsName, setSelectedTagsName] = useState([]); //存取標籤名稱
  const [movies, setMovies] = useState([]); // 存儲從 API 獲取的電影資料
  const [moviesTitle, setMoviesTitle] = useState([]); // 存儲從 API 獲取的電影標題
  const [clickLikes, setClickLikes] = useState([]); //儲存喜歡的電影列表
  const [loading, setLoading] = useState(false); // 加載狀態
  const [error, setError] = useState(null); // 錯誤訊息
  const [showList, setShowList] = useState(false);
  const [search, setSearch] = useState(false);

  // 處理標籤點擊
  const handleClick = ({ updateSelectedTagsId, updateSelectedTagsName }) => {
    setSelectedTagsId(updateSelectedTagsId); // 設置更新的標籤ID
    setSelectedTagsName(updateSelectedTagsName); // 設置更新的標籤Name
  };

  const handleClickLike = (newLikeState, movie, moviesTitle) => {
    // 設定新clickLikes狀態
    setClickLikes((prevLikes) => {
      if (newLikeState) {
        //當新狀態是true時，表示增加like
        // 檢查是否有包含在之前的清單內，沒有加入，有就直接返回原來的
        if (!prevLikes.some((flv) => flv.movie.id === movie.id)) {
          return [...prevLikes, { movie, moviesTitle, newLikeState }];
        }
        return prevLikes;
      }
      //當新狀態是false,表示移除like
      else {
        // 篩選不等於movie.id的內容
        return prevLikes.filter((flv) => flv.movie.id !== movie.id);
      }
    });
  };

  // 發送 API 請求
  const fetchMovies = async () => {
    if (selectedTagsId.length === 0) {
      const errorMessage = "請選擇一個標籤！";
      alert(errorMessage);
      setError(errorMessage);
      return; // 如果沒有選擇標籤，則不發送請求
    }
    setMovies([]);
    setLoading(true); // 開始加載

    try {
      // 後端API 路徑，將選擇標籤的ID與Name透過屬性傳給後端API
      const response = await axios.post("/api/movie/byGenres", {
        tagsId: selectedTagsId,
        tagsName: selectedTagsName,
        error: error,
      });

      const moviesData = response.data.data.results;

      if (moviesData.length === 0) {
        setMovies([]);
      } else {
        setMovies(moviesData); // 設置電影資料
      }

      setMoviesTitle(response.data.tagsName);
    } catch (err) {
      alert("資料加載失敗", err);
      setError(err); // 抓到錯誤，給錯誤訊息
      setMovies([]);
    } finally {
      setSearch(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      console.error(error);
    }
  }, [error]);

  return (
    <>
      <StyledAppBar>
        <ToolbarIcons
          color={clickLikes.length > 0 ? "primary.main" : "secondary.main"}
          setShowList={setShowList}
          showList={showList}
        />
        {showList && (
          <StyledBox
            sx={{
              zIndex: 2,
              position: "absolute",
              width: "100vw",
              height: "calc(100vh - 50px)",
              display: { xs: "block", sm: "none" },
            }}
          >
            <ItemsList
              width="100%"
              border="none"
              showList={showList}
              clickLikes={clickLikes}
              handleClickLike={handleClickLike}
            />
          </StyledBox>
        )}
        <StyledBox
          sx={{
            zIndex: 2,
            position: "absolute",
            top: "3.5rem",
            right: "1.5rem",
            display: { xs: "none", sm: "block" },
          }}
        >
          <ItemsList
            showList={showList}
            clickLikes={clickLikes}
            handleClickLike={handleClickLike}
          />
        </StyledBox>
        <StyledBox
          sx={{
            position: "relative",
          }}
        >
          <Typography variant="h1" sx={{ fontSize: { lg: "3rem" } }}>
            種類秀電影
          </Typography>
          <ListButton
            showList={showList}
            setShowList={setShowList}
            color={clickLikes.length > 0 ? "primary.main" : "secondary.main"}
          />
        </StyledBox>
        <ChipSelect
          handleClick={handleClick}
          selectedTagsId={selectedTagsId}
          selectedTagsName={selectedTagsName}
        />

        <StyledBox>
          <StyledButton
            type="submit"
            variant="contained"
            onClick={() =>
              selectedTagsId ? fetchMovies() : setError("請選擇一個標籤！")
            }
            disableRipple
          >
            查詢電影
          </StyledButton>

          <StyledButton
            type="reset"
            variant="contained"
            onClick={() => {
              setSelectedTagsId([]);
              setSelectedTagsName([]);
              setError(null);
            }}
            disableRipple
          >
            重新查詢
          </StyledButton>
        </StyledBox>
      </StyledAppBar>

      <StyledBox
        display="grid"
        sx={{
          gridTemplateColumns:
            movies.length === 0 && !loading && search
              ? "1fr"
              : {
                  xs: "repeat(2,1fr)",
                  sm: "repeat(3,1fr)",
                  md: "repeat(3,1fr)",
                },
          width: { xs: "80%", sm: "100%", lg: "100%" },
          gap: { xs: 1, sm: 3, md: 3, lg: 3 },
          justifyItems: "center",
          margin: "0 auto",
          marginTop: { xs: 29, sm: 22, md: 21, lg: 20 },
          "@media (min-width:344px) and (max-width:360px)": { marginTop: 34 },
          marginBottom: { xs: 7, sm: 0 },
          padding: { xs: 1, sm: 5, lg: 5 },
        }}
      >
        {movies.length > 0 &&
          movies.map((movie) => {
            //判斷儲存的喜歡電影列表clickLikes與每部電影比對，是否有點擊喜歡
            const isLike = clickLikes.some((flv) => flv.movie.id === movie.id);
            return (
              <MovieCard
                key={movie.id}
                movie={movie}
                moviesTitle={moviesTitle}
                handleClickLike={handleClickLike}
                isLike={isLike}
                loading={loading}
              /> // 將電影資訊用MAP給每個電影卡填入資訊
            );
          })}

        {movies.length === 0 && !loading && search && (
          <Container component="p" sx={{ padding: 2, fontSize: "1.5rem" }}>
            找不到電影資料
          </Container>
        )}
      </StyledBox>
    </>
  );
}
