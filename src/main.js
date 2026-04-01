const convertButton = document.getElementById("convert-btn");
const preview = document.getElementById("preview-image");
const dragDrop = document.getElementById("dnd-input");
const fileInput = document.getElementById("upload");
const droparea = document.querySelector('.drop-area');

const uploadedFiles = [];

fileInput.addEventListener("change", () => {
  uploadedFiles.length = 0; 
  if (fileInput.files.length > 0) {
    uploadedFiles.push(fileInput.files[0]);
  }
});

console.log(uploadedFiles);

const initApp = () => {
    

    const active = () => droparea.classList.add("green-border");

    const inactive = () => droparea.classList.remove("green-border");

    const prevents = (e) => e.preventDefault();

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evtName => {
        droparea.addEventListener(evtName, prevents);
    });

    ['dragenter', 'dragover'].forEach(evtName => {
        droparea.addEventListener(evtName, active);
    });

    ['dragleave', 'drop'].forEach(evtName => {
        droparea.addEventListener(evtName, inactive);
    });

    droparea.addEventListener("drop", handleDrop);

}

document.addEventListener("DOMContentLoaded", initApp);

const handleDrop = (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;

    if (files.length > 0) {
      uploadedFiles.push(files[0]);
    }

    convertImage(uploadedFiles);
};

function convertImage() {
  
  const format = document.getElementById("format").value;

  if (!uploadedFiles.length) {
    alert("Please select an image");
    return;
  }

  const file = uploadedFiles[0];

  if (!file) {
    alert("Please select a file");
    return;
  }

  if (!file.type.startsWith("image/")) {
    alert("Please upload a valid image file.");
    return;
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

      droparea.style.display = "none";

    };

    img.src = event.target.result;
  };

  reader.readAsDataURL(file);

}

convertButton.addEventListener("click", convertImage);