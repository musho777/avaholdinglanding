export default function Header() {
  return (
    <div className="header-shell" id="headerShell">
      <nav className="header-nav">
        <div className="nav-left">
          <button className="menu-btn" id="menuBtn" aria-label="Open menu">
            <span className="menu-icon">
              <span></span>
              <span></span>
            </span>
            <span id="menuBtnLabel">Menu</span>
          </button>
        </div>
        <div className="nav-right">
          <a href="tel:+34951870700">+34 (951) 870-700</a>
          <a href="#book" className="book-btn">
            Book a call
          </a>
        </div>
      </nav>
    </div>
  );
}
