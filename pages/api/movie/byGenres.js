import axios from "axios";
import TAGS from "../../../utils/tag-util";
import { setLazyProp } from "next/dist/server/api-utils";

const apiKey = process.env.API_KEY;
const api = "https://api.themoviedb.org/3/discover/movie?";

export default async function handler(req, res) {
  const { tagsId, tagsName } = req.body;

  console.log("tagsId:", tagsId);
  // // 確保 `with_genres` 是逗號分隔的字串
  const tagIdsString = tagsId.join(",");
  // console.log("API 傳遞的 with_genres:", tagIdsString); // Debugging
  console.log("🎯 tagIdsString:", tagIdsString);

  // console.log("tags型別:", typeof tags);

  try {
    //   // 使用該ID進行API請求
    //   const tagIdsString = tagIds.join(","); // 轉換為 "28,12"
    const apiURL = `${api}include_adult=false&with_genres=${tagIdsString}&api_key=${apiKey}`;
    console.log(apiURL);
    const response = await axios.get(apiURL);
    const data = response.data;
    // console.log("返回的data", data);
    const result = { data, tagsName };
    // console.log("合併後的資料", result);
    // console.log("response:", data);
    // console.log(
    //   "genre_ids:",
    //   JSON.stringify(response.data.results[0]?.genre_ids)
    // );

    // 檢查是否有返回數據
    if (result) {
      // console.log("response:", data);
      res.status(200).json(result); // 確保發送回應
    } else {
      res.status(404).json({ error: "No data found" }); // 如果沒資料，返回錯誤
    }
  } catch (err) {
    console.error("API 請求錯誤", err);
    res.status(500).json({ error: "API 請求失敗" }); // 錯誤處理，返回 500 錯誤
  }
}
