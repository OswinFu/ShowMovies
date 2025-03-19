import axios from "axios";

const apiKey = process.env.API_KEY;
const api = "https://api.themoviedb.org/3/discover/movie?";

export default async function handler(req, res) {
  const { tagsId, tagsName } = req.body;

  // 以逗號分開
  const tagIdsString = tagsId.join(",");

  try {
    //   // 使用該ID進行API請求
    const apiURL = `${api}include_adult=false&with_genres=${tagIdsString}&api_key=${apiKey}`;
    const response = await axios.get(apiURL);
    const data = response.data;
    const result = { data, tagsName };

    // 檢查是否有返回數據
    if (result) {
      res.status(200).json(result); // 確保發送回應
    } else {
      res.status(404).json({ error: "找不到資料" }); // 如果沒資料，返回錯誤
    }
  } catch (err) {
    console.error("API 請求錯誤", err);
    res.status(500).json({ error: "API 請求失敗" }); // 錯誤處理，返回 500 錯誤
  }
}
