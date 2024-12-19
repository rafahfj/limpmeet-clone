import { useMediaQuery } from "react-responsive";

export default function ShowProfile({ username, bio, photo, onClose }) {
  const handleClose = () => {
    onClose(null);
  };

  return (
    <div className="top-0 right-0 bottom-0 left-0 z-10 fixed bg-slate-500/20 backdrop-blur-sm">
      <div className="top-1/2 left-1/2 fixed bg-primary shadow-standard p-6 rounded-lg w-[80vw] max-w-[720px] md:h-[50vh] -translate-x-1/2 -translate-y-1/2 m">
        <div className="relative flex flex-row-reverse h-0">
          <button
            onClick={handleClose}
            className="relative -top-5 px-2 text-2xl"
          >
            x
          </button>
        </div>
        <div className="flex items-center gap-5 mb-5">
          <div className="shadow-standardw-[35vw] rounded-full max-w-[180px] md:max-w-[280px] overflow-hidden">
            <img src={photo} alt="" className="w-full" />
          </div>
          <div className="flex flex-col gap-5">
            <p className="font-bold text-2xl">{username}</p>
            {useMediaQuery({ minWidth: 770 }) && <p>{bio}</p>}
          </div>
        </div>
        <div>{useMediaQuery({ maxWidth: 770 }) && <p>{bio}</p>}</div>
      </div>
    </div>
  );
}
