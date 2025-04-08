interface LinkPreviewImageProps {
  image: string;
}

export const LinkPreviewImage = ({ image }: LinkPreviewImageProps) => {
  return image ? (
    <img
      src={image}
      alt="미리보기 이미지"
      className="w-full max-w-[400px] h-auto rounded-md object-cover"
    />
  ) : (
    <div className="w-full max-w-[400px] h-40 bg-gray-200 flex items-center justify-center rounded-md">
      이미지 없음
    </div>
  );
};
