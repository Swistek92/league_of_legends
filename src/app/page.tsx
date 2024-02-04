import { ChempionsList } from "../../components";
import { ChampionManager } from "../../helpers";
import { UserDocument } from "../../types";
import { options } from "./api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import { ToastContainer, toast } from "react-toastify";
export default async function Home() {
  /////////// CHEMPIONS
  const allChempions: string = "All";
  const res = await fetch(
    "https://ddragon.leagueoflegends.com/cdn/13.19.1/data/en_US/champion.json"
  );
  const { data } = await res.json();
  const championManager = new ChampionManager(data);
  championManager.addTag(allChempions);
  const tags = championManager.getAllUniqueTags();
  const chempions = championManager.getChempionsInArray();

  return (
    <main className='w-full overflow-hidden bg-red-100   '>
      <div>
        <ChempionsList tags={tags} champions={chempions} />
        <ToastContainer />
      </div>
    </main>
  );
}
