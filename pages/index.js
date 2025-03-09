import { useState, useEffect } from "react";
import { ChipSelect } from "../components/ChipSelect";
import { MovieCard } from "../components/MovieCard";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CloseIcon from "@mui/icons-material/Close";
import { ItemsList } from "../components/ItemsList";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";

export default function Home() {
  const [selectedTagsId, setSelectedTagsId] = useState([]); // 存儲選中的標籤狀態
  const [selectedTagsName, setSelectedTagsName] = useState([]); //存取標籤名稱
  const [movies, setMovies] = useState([]); // 存儲從 API 獲取的電影資料
  const [moviesTitle, setMoviesTitle] = useState([]); // 存儲從 API 獲取的電影標題
  const [clickLikes, setClickLikes] = useState([]); //儲存喜歡的電影列表
  const [loading, setLoading] = useState(null); // 加載狀態
  const [error, setError] = useState(null); // 錯誤訊息
  const [showList, setShowList] = useState(false);

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
      setError(alert("請選擇一個標籤！"));
      return; // 如果沒有選擇標籤，則不發送請求
    }

    setLoading(true); // 開始加載

    try {
      // 後端API 路徑，將選擇標籤的ID與Name透過屬性傳給後端API
      const response = await axios.post("/api/movie/byGenres", {
        tagsId: selectedTagsId,
        tagsName: selectedTagsName,
        error: error,
      });

      setMovies(response.data.data.results); // 設置電影資料
      setMoviesTitle(response.data.tagsName); // 設置電影標題
    } catch (err) {
      setError(alert("資料加載失敗！"), err); // 抓到錯誤，給錯誤訊息
    } finally {
      setLoading(false); // 完成加載
    }
  };

  useEffect(() => {
    if (error) {
      alert("出現錯誤", error);
      setError(null);
    }
  }, [error]);

  return (
    <>
      <AppBar
        className="appBar"
        sx={{
          backgroundColor: "black",
          width: "100%",
          p: 2,
          position: "fixed",
          zIndex: 1,
        }}
      >
        <AppBar>
          <Toolbar
            sx={{
              width: "100%",
              backgroundColor: "red",
              margin: 0,
              position: "fixed",
              top: "auto",
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <IconButton>
              <FavoriteIcon sx={{ scale: 1.5 }} />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Box
          sx={{
            zIndex: 2,
            position: "absolute",
            top: "4.5rem",
            right: 6,
            display: { xs: "none", sm: "block" },
          }}
        >
          <ItemsList
            showList={showList}
            clickLikes={clickLikes}
            handleClickLike={handleClickLike}
          />
        </Box>
        <Box className="h1Box">
          <h1>種類秀電影</h1>
          <Box
            className="favIcon"
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            {/* 控制icon，未開啟愛心，已開啟X*/}
            <IconButton
              aria-label="show like movies list"
              type="button"
              onClick={() => setShowList(!showList)}
            >
              {showList ? (
                <CloseIcon sx={{ color: "#67d735" }} />
              ) : (
                <FavoriteIcon sx={{ color: "#67d735", scale: 1.25 }} />
              )}
            </IconButton>
          </Box>
        </Box>

        <ChipSelect
          handleClick={handleClick}
          selectedTagsId={selectedTagsId}
          selectedTagsName={selectedTagsName}
        />

        <div className="btn">
          <Button
            className="button"
            type="submit"
            variant="contained"
            onClick={() =>
              selectedTagsId ? fetchMovies() : setError("請選擇一個標籤！")
            }
            disableRipple
          >
            查詢電影
          </Button>

          <Button
            className="button"
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
          </Button>
        </div>
      </AppBar>

      <Box
        className="card-box"
        sx={{
          display: "grid",

          gridTemplateColumns:
            movies.length === 0
              ? "repeat(1)"
              : {
                  xs: "repeat(2,1fr)",
                  md: "repeat(3,1fr)",
                  lg: "repeat(3,1fr)",
                },
          width: movies.length === 0 ? "100%" : "90%",
          gap: { xs: 1, sm: 3, lg: 3 },
          alignItems: "center",
          justifyItems: "center",
          margin: "0 auto",
          marginTop: { xs: 29, sm: 27, md: 32, lg: 26 },
          padding: { lg: 5, xs: 0, sm: 2 },
        }}
      >
        {loading === false && movies.length === 0 ? (
          <Container sx={{ padding: 2 }}>找不到電影資料</Container>
        ) : (
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
              /> // 將電影資訊用MAP給每個電影卡填入資訊
            );
          })
        )}
      </Box>
    </>
  );
}
