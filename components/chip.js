import { Box, Chip } from "@mui/material";
import { TagTransfer } from "../utils/tag-util";
import React, { useEffect } from "react";

// 標籤子組件
// 資料傳遞透過參數進行
// selectedTags 是從父組件傳過來的資料
const ChipSelect = ({ handleClick, selectedTagsId, selectedTagsName }) => {
  // 執行點擊事件的流程
  console.log("selectedTagsId:", selectedTagsId);
  // console.log("selectedTagsName:", selectedTagsName);

  // const handleDelete = async ({tag}) =>{

  // }

  const handleChipClick = ({ tag }) => {
    // console.log("選中tag", tag);
    console.log("點擊tag.id", tag.id);
    // console.log("tag.name", tag.name);

    // 處理點擊資料
    const updateSelectedTagsId = selectedTagsId.includes(tag.id)
      ? selectedTagsId
      : [...selectedTagsId, tag.id];

    // console.log("子組件selectedTagsId", selectedTagsId);
    // console.log("子組件updateSelectedTagsId:", updateSelectedTagsId);
    // console.log("子組件tag.id", tag.id);
    console.log("更新tag.id", selectedTagsId);

    const updateSelectedTagsName = selectedTagsName.includes(tag.name)
      ? selectedTagsName
      : [...selectedTagsName, tag.name];

    // console.log("子組件selectedTagsName", selectedTagsName);
    // console.log("子組件updateSelectedTagsName:", updateSelectedTagsName);
    // console.log("子組件tag.name", tag.name);

    // selectTagNames(tag.name);

    // 呼叫父組件的函式，將更新資料傳回去
    handleClick({ updateSelectedTagsId, updateSelectedTagsName });
  };

  useEffect(() => {
    console.log("MyComponent rendered!");
  }, [selectedTagsId]); // 每次 state 发生变化时，都会调用此 useEffect

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
