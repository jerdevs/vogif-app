import GifCard, { GifCardProps } from "../GifCard/GifCard";

const GifGrid: React.FC = (): React.ReactElement => {
  const topGiphys: GifCardProps[] = [
    {
      imgUrl: "https://media.giphy.com/media/Qvns6NmhC1MBLKGbL1/giphy.gif",
      alt: "Top_2",
      votes: 1028,
    },
    {
      imgUrl: "https://media.giphy.com/media/10Jpr9KSaXLchW/giphy.gif",
      alt: "Top_1",
      votes: 1536,
    },
    {
      imgUrl: "https://media.giphy.com/media/yoJC2GnSClbPOkV0eA/giphy.gif",
      alt: "Top_3",
      votes: 594,
    },
    {
      imgUrl: "https://media.giphy.com/media/xT77XWum9yH7zNkFW0/giphy.gif",
      alt: "Top_2",
      votes: 1028,
    },
    {
      imgUrl: "https://media.giphy.com/media/TiOtVRx07iGqLmWk6m/giphy.gif",
      alt: "Top_1",
      votes: 1536,
    },
    {
      imgUrl: "https://media.giphy.com/media/l4HnY84pKDQCwm7II/giphy.gif",
      alt: "Top_3",
      votes: 594,
    },
    {
      imgUrl: "https://media.giphy.com/media/3ndAvMC5LFPNMCzq7m/giphy.gif",
      alt: "Top_1",
      votes: 1536,
    },
    {
      imgUrl: "https://media.giphy.com/media/tsX3YMWYzDPjAARfeg/giphy.gif",
      alt: "Top_3",
      votes: 594,
    },
    {
      imgUrl: "https://media.giphy.com/media/38U60fvIfokjC/giphy.gif",
      alt: "Top_2",
      votes: 1028,
    },
    {
      imgUrl: "https://media.giphy.com/media/xUA7aQOfOFZyC4qvZe/giphy.gif",
      alt: "Top_1",
      votes: 1536,
    },
    {
      imgUrl: "https://media.giphy.com/media/VIPdgcooFJHtC/giphy.gif",
      alt: "Top_1",
      votes: 288,
    },
    {
      imgUrl: "https://media.giphy.com/media/M47r0qW5U3gtL8VOj0/giphy.gif",
      alt: "Top_1",
      votes: 124,
    },
  ];

  return (
    <div className="bg-slate-800 p-12 lg:px-28">
      <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols gap-x-8 gap-y-4 lg:gap-y-0">
        {topGiphys.map(
          (gif: GifCardProps, index: number): React.ReactElement => {
            return (
              <GifCard
                key={index}
                imgUrl={gif.imgUrl}
                alt={gif.alt}
                votes={gif.votes}
              />
            );
          }
        )}
      </div>
    </div>
  );
};

export default GifGrid;
