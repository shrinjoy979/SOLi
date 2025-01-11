const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <footer style={{ background: '#333', color: '#fff', padding: '1rem', textAlign: 'center' }}>
      <p>&copy; {year} SOLi. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
