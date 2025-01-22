const showToast = (message, type) => {
  // Use any toast notification package here, for instance, react-toastify
  if (type === "success") {
    toast.success(message);
  } else if (type === "error") {
    toast.error(message);
  } else {
    toast.info(message);
  }
};

export default showToast;
