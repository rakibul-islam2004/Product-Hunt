const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white p-4 mt-8">
      <div className="container mx-auto text-center">
        <p>&copy; 2025 Product Hunt. All rights reserved.</p>
        <div className="space-x-4 mt-2">
          <a href="https://facebook.com" target="_blank" className="hover:text-gray-400">Facebook</a>
          <a href="https://twitter.com" target="_blank" className="hover:text-gray-400">Twitter</a>
          <a href="https://instagram.com" target="_blank" className="hover:text-gray-400">Instagram</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
