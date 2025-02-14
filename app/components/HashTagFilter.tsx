import { IoClose } from "react-icons/io5";

const Hashtag = ({
  hashtag,
  onRemove,
  onClick,
}: {
  hashtag: string;
  onRemove: (hashtag: string) => void;
  onClick: () => void;
}) => (
  <div className="border rounded-full flex gap-2 items-center py-1 px-2 hover:bg-white hover:text-black transition-all duration-150 group">
    <button
      onClick={() => onRemove(hashtag)}
      className="bg-white rounded-full text-black group-hover:bg-black group-hover:text-white transition-all duration-150"
      aria-label={`Remove hashtag ${hashtag}`}
    >
      <IoClose />
    </button>
    <button
      key={hashtag}
      onClick={onClick}
      aria-label={`Search for ${hashtag}`}
    >
      #{hashtag}
    </button>
  </div>
);

export default Hashtag;
