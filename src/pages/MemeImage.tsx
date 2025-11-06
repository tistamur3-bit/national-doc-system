import memeImage from "@/assets/meme-image.jpeg";

const MemeImage = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-900 p-4">
      <img 
        src={memeImage} 
        alt="Meme" 
        className="max-w-full max-h-screen object-contain rounded-lg shadow-2xl"
      />
    </div>
  );
};

export default MemeImage;
