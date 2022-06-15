import { Chip, Avatar } from "@mui/material";
import { NextPage } from "next";
import { useRecoilState } from "recoil";
import CheckIcon from "@mui/icons-material/Check";
import { filterListState } from "../store/common";

const ChipFilter: NextPage<{ label: string; count: number }> = ({
  label,
  count,
}) => {
  const [filterSelected, setFilterSelected] = useRecoilState(filterListState);

  return (
    <Chip
      id={"filter_chip_" + label}
      avatar={<Avatar>{count}</Avatar>}
      label={label}
      onClick={() => {
        const newFilter = filterSelected.includes(label) ? [] : [label];
        console.log(newFilter);
        setFilterSelected(newFilter);
      }}
      onDelete={() => {}}
      deleteIcon={filterSelected.includes(label) ? <CheckIcon /> : <></>}
    />
  );
};

export default ChipFilter;
