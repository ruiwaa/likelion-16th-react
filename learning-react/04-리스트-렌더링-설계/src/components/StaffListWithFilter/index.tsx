import { useState } from "react";
import StaffData from "./data/staff.json";
import StaffListSearch from "./parts/StaffListSearch";
import StaffList from "./parts/StaffList";
import S from "./style.module.css";
import type { Staff } from "./type/staff";
import StaffListHeader from "./parts/StaffListHeader";

export default function StaffListRender() {
  const [staffs] = useState<Staff[]>(StaffData);
  const [search, setSearch] = useState("");

  //파생된 상태(데이터)
  //검색어에 의해 걸러진 스태프 목록
  const searchedStaffs = staffs.filter((staff) => {
    const hasName = staff.name.toLowerCase().includes(search.toLocaleLowerCase().trim());
    const hasRole = staff.role.toLowerCase().includes(search.toLocaleLowerCase().trim());
    const hasPhone = staff.phone.toLowerCase().includes(search.toLocaleLowerCase().trim());
    return hasPhone || hasName || hasRole
  });

  return (
    <section className={S.container}>
      <StaffListHeader staffs={staffs}  searchedStaffs ={searchedStaffs}/>
      <StaffListSearch search={search} setSearch={setSearch} />
      <StaffList staffs={searchedStaffs} />
    </section>
  );
}
