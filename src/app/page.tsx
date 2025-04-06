import { LinkShotManager } from "@/components/LinkShotManager";
import Link from "next/link";

export default function Home() {

  return (
    <div className="">
      <div className="py-7 ">
        <p className="font-bold text-4xl text-center">My Link Shot</p>
        <div className="text-center">
        <Link href='/mypage' className="font-bold text-xl text-green-300">저장한 Link Shot 보러가기</Link>
        </div>
        <LinkShotManager />
      </div>
    </div>
  );
}
