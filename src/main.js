const convertButton = document.getElementById("convert-btn");
const preview = document.getElementById("preview-image");
const dragDrop = document.getElementById("dnd-input");

function convertImage() {
  const fileInput = document.getElementById("upload");
  const format = document.getElementById("format").value;

  if (!fileInput.files.length) {
    alert("Please select an image");
    return;
  }

  const file = fileInput.files[0];

  if (!file) {
    alert("Please select a file");
  }

  if (!file.type.startsWith("image/")) {
    alert("Please upload a valid image file.");
  }

  const reader = new FileReader();

  reader.onload = function(event) {
    const img = new Image();

    img.onload = function() {

      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) {
        console.error("Canvas context failed");
        return;
      }

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      ctx.drawImage(img, 0, 0);

      const converted = canvas.toDataURL(format);

      const link = document.getElementById("download");

      link.href = converted;
      link.download = "converted-image";
      link.style.display = "inline";
      link.innerText = "Download Converted Image";

      preview.src = link.href;
      preview.height = canvas.height * .5;
      preview.width = canvas.width * .5;
      preview.style.display = "block";

      dragDrop.style.display = "none";

    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);

}

convertButton.addEventListener("click", convertImage)