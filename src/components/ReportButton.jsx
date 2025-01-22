const ReportButton = ({ onReport }) => {
    return (
      <button
        onClick={onReport}
        className="bg-red-600 text-white py-2 px-4 rounded-md ml-4"
      >
        Report
      </button>
    );
  };
  
  export default ReportButton;
  