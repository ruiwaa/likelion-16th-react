import type { Staff } from "../type/staff";
import S from "./StaffListHeader.module.css";

interface Props {
  staffs: Staff[]
  searchedStaffs: Staff[]
}

export default function StaffListHeader({ staffs, searchedStaffs }: Props) {
  return (
    <header className={S.header}>
      <h2>알바생 관리 명부</h2>
      <span className={S.count}>
        검색된 인원: {searchedStaffs.length} / 총원: {staffs.length}명
      </span>
    </header>
  );
}
