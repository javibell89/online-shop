// Get the file input element from the DOM
const imagePickerElement = document.querySelector(
  '#image-upload-control input',
);

// Get the image element where the preview will be displayed
const imagePreviewElement = document.querySelector('#image-upload-control img');

// Function to update the image preview
function updateImagePreview() {
  // Get the list of files selected in the file input
  const { files } = imagePickerElement;

  // If no files were selected, hide the preview image and exit the function
  if (!files || files.length === 0) {
    imagePreviewElement.style.display = 'none';
    return;
  }

  // Get the first file from the list
  const pickedFile = files[0];

  // Create a URL representing the selected file
  // and set it as the source of the preview image
  imagePreviewElement.src = URL.createObjectURL(pickedFile);

  // Make the preview image visible
  imagePreviewElement.style.display = 'block';
}

// Add an event listener to the file input
// The updateImagePreview function will be called
// every time the user selects a new file
imagePickerElement.addEventListener('change', updateImagePreview);
