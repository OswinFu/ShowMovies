import React, { useState } from "react";
import { ChipSelect } from "../components/chip"; // 引入 ChipSelect
import { MovieCard } from "../components/card";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import axios from "axios";

export default function Home() {
  const [selectedTagsId, setSelectedTagsId] = useState([]); // 存儲選中的標籤狀態
  const [selectedTagsName, setSelectedTagsName] = useState([]); //存取標籤名稱
  const [movies, setMovies] = useState([]); // 存儲從 API 獲取的電影資料
  const [loading, setLoading] = useState(false); // 加載狀態
  const [error, setError] = useState(null); // 錯誤訊息
  const [moviesTitle, setMoviesTitle] = useState([]);

  // 處理標籤點擊
  const handleClick = ({ updateSelectedTagsId, updateSelectedTagsName }) => {
    setSelectedTagsId(updateSelectedTagsId); // 設置更新的標籤ID
    setSelectedTagsName(updateSelectedTagsName); // 設置更新的標籤Name
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
      setError("資料加載失敗！"); // 抓到錯誤，給錯誤訊息
    } finally {
      setLoading(false); // 完成加載
    }
  };

  return (
    <>
      <AppBar
        className="appBar"
        sx={{
          backgroundColor: "black",
          width: "100%",
          p: 2,
          position: "fixed",
        }}
      >
        <h1>種類秀電影</h1>

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
            onClick={async () =>
              selectedTagsId
                ? await fetchMovies()
                : setError("請選擇一個標籤！")
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

          gridTemplateColumns: {
            xs: "repeat(1,1fr)",
            sm: "repeat(2,1fr)",
            lg: "repeat(3, 1fr)",
          },
          width: "90%",
          gap: { xs: 1, sm: 3, lg: 3 },
          alignItems: "center",
          justifyItems: "center",
          margin: "0 auto",
          marginTop: { xs: 20, sm: 22, lg: 26 },
          padding: 5,
        }}
      >
        {movies.length > 0
          ? movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                moviesTitle={moviesTitle}
                className="card"
              /> // 將電影資訊用MAP給美的電影卡填入資訊
            ))
          : !loading}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {/* 錯誤顯示 */}
      </Box>
    </>
  );
}
