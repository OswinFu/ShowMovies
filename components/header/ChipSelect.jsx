import { TagTransfer } from "../../utils/tag-util";
import StyledBox from "../UI/Box";
import StyledChip from "../UI/Chip";

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

  return (
    <StyledBox
      sx={{
        gap: "1px",
        paddingX: { sm: "2rem" },
        "@media (min-width:375px) and (max-width:430px)": {
          paddingX: "0.45rem",
        },
        "@media (min-width:768px) and (max-width:900px)": {
          paddingX: "2.5rem",
        },
      }}
    >
      {TagTransfer.map((tag) => (
        <StyledChip
          key={tag.id}
          label={tag.name}
          onClick={() => handleChipClick({ tag })} // 點擊時傳遞 tag
          clickable
          selected={selectedTagsId.includes(tag.id)}
          sx={{ fontSize: { xs: "0.95rem", sm: "1rem" } }}
        />
      ))}
    </StyledBox>
  );
};

export default ChipSelect;
