export default function Footer() {
  return (
    <footer className=" bottom-0 left-0 xl:px-[25vw] lg:px-[15vw] md:px-[5vw] px-[2vw] p-4 bg-secondary w-full">
      <div className="flex">
        <div className="w-full font-semibold">
          <p>FMLyrics</p>
        </div>
        <div className="">
          <a href="/credits" className="text-accent font-semibold">
            Credits
          </a>
        </div>
      </div>
    </footer>
  );
}
