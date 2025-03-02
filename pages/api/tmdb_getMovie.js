import axios from "axios";
const apiKey = process.env.API_KEY;

export default async function handler(req, res) {
  try {
    const apiURL = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

    const response = await axios.get(apiURL);

    // 檢查是否有返回數據
    if (response.data) {
      // 回應資料
      res.status(200).json(response.data);
    } else {
      // 這裡處理資料無回應的情況
      res.status(404).json({ error: "No data found" });
    }
  } catch (err) {
    console.error("API 請求錯誤", err);
    res.status(500).json({ error: "API 請求失敗" });
  }
}
