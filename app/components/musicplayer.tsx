import Image from "next/image";
export default function MusicPlayer(props: string) {
  console.log(props);
  return (
    <div className="bg-background rounded p-4">
      <div className="flex justify-center mb-2">
        <Image
          src={props.albumArt}
          alt="DOA"
          width={300}
          height={300}
          className="rounded hover:scale-105 duration-300"
        />
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-semibold">{props.song}</h1>
        <h2 className="text-2xl font-light">{props.artist}</h2>
        <h3>
          on <b>{props.albumName}</b>
        </h3>
      </div>
    </div>
  );
}
