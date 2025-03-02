import { Box, Chip } from "@mui/material";
import { TagTransfer } from "../utils/tag-util";
import React, { useEffect } from "react";

// 標籤子組件
// 資料傳遞透過參數進行
// selectedTags 是從父組件傳過來的資料
const ChipSelect = ({ handleClick, selectedTagsId, selectedTagsName }) => {
  // 執行點擊事件的流程

  const handleChipClick = ({ tag }) => {
    // 處理更新的標籤ID
    const updateSelectedTagsId = selectedTagsId.includes(tag.id)
      ? selectedTagsId
      : [...selectedTagsId, tag.id];

    // 處理更新的標籤Name
    const updateSelectedTagsName = selectedTagsName.includes(tag.name)
      ? selectedTagsName
      : [...selectedTagsName, tag.name];

    // 呼叫父組件的函式，將更新資料傳回去
    handleClick({ updateSelectedTagsId, updateSelectedTagsName });
  };

  useEffect(() => {
    console.log("MyComponent rendered!");
  }, [selectedTagsId]); // 標籤更新會調用

  return (
    <Box
      className="chip-box"
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: 5,
        position: "relative",
        flexWrap: "wrap",
      }}
    >
      {TagTransfer.map((tag) => (
        <Chip
          className="chip"
          key={tag.id}
          label={tag.name}
          onClick={() => handleChipClick({ tag })} // 點擊時傳遞 tag
          clickable
          sx={{
            // 現在點選的tag有沒有選取，有給顏色，沒有給透明
            backgroundColor: selectedTagsId.includes(tag.id)
              ? "#67d735"
              : "transparent",

            ":hover": {
              backgroundColor: "#67d735",
            },
            marginY: 2,
            marginX: 0.5,
            color: "#fffffd",
            fontSize: "1.5rem",
          }}
        />
      ))}
    </Box>
  );
};

export { ChipSelect };
