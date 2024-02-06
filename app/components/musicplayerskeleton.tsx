export default function MusicPlayerSkeleton() {
  return (
    <div className="bg-background rounded p-4">
      <div className="flex justify-center mb-2">
        <div className="rounded hover:scale-105 duration-300 w-[300px] h-[300px] animate-pulse bg-gray-900" />
      </div>
      <div className="text-center">
        <h1 className="text-3xl font-semibold"></h1>
        <h2 className="text-2xl font-light"></h2>
        <h3>
          hh <b>h</b>
        </h3>
      </div>
    </div>
  );
}
