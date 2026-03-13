import { useState } from "react";
import StaffData from "./data/staff.json";
import StaffListSearch from "./parts/StaffListSearch";
import StaffList from "./parts/StaffList";
import S from "./style.module.css";
import type { Staff } from "./type/staff";

export default function StaffListRender() {
  const [staffs] = useState<Staff[]>(StaffData);

  return (
    <section className={S.container}>
      <header className={S.header}>
        <h2>알바생 관리 명부</h2>
        <span className={S.count}>
          검색된 인원: {staffs.length} / 총원: {staffs.length}명
        </span>
      </header>

      <StaffListSearch />
    <StaffList staffs={staffs}/>
    </section>
  );
}
