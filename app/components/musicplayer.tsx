import Image from "next/image";

type MusicPlayerProps = {
  albumArt: string;
  song: string;
  artist: string;
  albumName: string;
};

export default function MusicPlayer(props: MusicPlayerProps) {
  console.log(props);
  return (
    <>
      <div className="bg-background rounded p-4 sm:hidden block">
        <div className="flex justify-center mb-2">
          <div className="flex gap-4 w-full justify-center">
            <Image
              src={props.albumArt as string}
              alt={`${props.song} by ${props.artist}`}
              title={`${props.song} by ${props.artist}`}
              width={50}
              height={50}
              className="rounded  w-1/5"
              loading="lazy"
            />
            <div className="self-center">
              <h1 className="text-xl font-semibold  w-full">{props.song}</h1>
              <p>{props.artist}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-background rounded p-4 sm:block hidden">
        <div className="flex justify-center mb-2">
          <Image
            src={props.albumArt as string}
            alt={`${props.song} by ${props.artist}`}
            title={`${props.song} by ${props.artist}`}
            width={300}
            height={300}
            className="rounded hover:scale-95 duration-300"
            loading="lazy"
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
    </>
  );
}
