import { useState } from "react";
import StaffData from "./data/staff.json";
import StaffListSearch from "./parts/StaffListSearch";
import StaffList from "./parts/StaffList";
import S from "./style.module.css";
import type { Staff } from "./type/staff";
import StaffListHeader from "./parts/StaffListHeader";

export default function StaffListRender() {
  const [staffs] = useState<Staff[]>(StaffData);

  return (
    <section className={S.container}>
      <StaffListHeader staffs={staffs} />
      <StaffListSearch />
      <StaffList staffs={staffs} />
    </section>
  );
}
