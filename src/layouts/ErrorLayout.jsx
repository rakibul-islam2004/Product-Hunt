import { Link } from "react-router-dom";

const ErrorLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold">Oops! Page Not Found</h1>
      <p className="mt-4 text-xl">We couldn't find the page you're looking for.</p>
      <Link to="/" className="mt-6 text-blue-600">Go back to homepage</Link>
    </div>
  );
};

export default ErrorLayout;
