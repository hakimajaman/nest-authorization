import Navbar from "@/components/modules/Navbar";
import Statistic from "@/components/modules/Statistic";
import Table from "@/components/modules/Table";
import { BgColors } from "@/utils/types";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="w-full grid grid-rows-3 gap-y-8">
        <Navbar />
        <div className="grid grid-cols-3 gap-x-3">
          <Statistic name="User" total={50} bgColor={BgColors.Red}/>
          <Statistic name="Online Users" total={48} bgColor={BgColors.Amber} />
          <Statistic name="Active user last 7 days" total={30} bgColor={BgColors.Lime} />
        </div>
        <Table
        />
      </div>
    </main>
  );
}
