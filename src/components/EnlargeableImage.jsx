import { useState } from "react";

function EnlargeableImage({ src, alt }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <img
        src={src}
        alt={alt}
        className="thumbnail"
        onClick={() => setIsOpen(true)}
      />
      {isOpen && (
        <div className="modal" onClick={() => setIsOpen(false)}>
          <img src={src} alt={alt} className="modal-image" />
        </div>
      )}
    </>
  );
}

export default EnlargeableImage;
