export default function SiteMenu() {
  return (
    <div className="site-menu" id="siteMenu">
      <div className="site-menu-top">
        <button className="close-btn" id="closeBtn">
          <span className="close-icon">
            <span></span>
            <span></span>
          </span>
          Close
        </button>
        <span className="site-menu-wordmark">
          <svg viewBox="0 0 382.9 116.63" xmlns="http://www.w3.org/2000/svg" aria-label="AVA">
            <path
              fill="currentColor"
              d="M97.94,116.63c-10.03-14.33-31.08-73.08-48.97-116.63C31.08,43.55,10.03,102.29,0,116.63h13.94s-.78-3.62.24-7.24c.85-2.99,34.78-87.18,34.78-87.18,0,0,33.93,84.19,34.78,87.18,1.03,3.62.24,7.24.24,7.24h13.94Z"
            />
            <path
              fill="currentColor"
              d="M382.9,116.63c-10.03-14.33-31.08-73.08-48.97-116.63-17.89,43.55-38.94,102.29-48.97,116.63h13.94s-.78-3.62.24-7.24c.85-2.99,34.78-87.18,34.78-87.18,0,0,33.93,84.19,34.78,87.18,1.03,3.62.24,7.24.24,7.24h13.94Z"
            />
            <path
              fill="currentColor"
              d="M240.42,0c-10.03,14.33-31.08,73.08-48.97,116.63C173.56,73.08,152.51,14.33,142.48,0h13.94s-.78,3.62.24,7.24c.85,2.99,34.78,87.18,34.78,87.18,0,0,33.93-84.19,34.78-87.18,1.03-3.62.24-7.24.24-7.24h13.94Z"
            />
          </svg>
        </span>
        <a href="#contact" className="inquire-btn" data-menu-link>
          Inquire <span aria-hidden="true">&#8594;</span>
        </a>
      </div>

      <div className="site-menu-body">
        <div className="site-menu-image">
          <div className="site-menu-image-photo" id="siteMenuImage"></div>
          <div className="site-menu-image-cover"></div>
        </div>
        <nav className="site-menu-links">
          <a href="#story" data-menu-link>
            The residences
          </a>
          <a href="#location" data-menu-link>
            Location
          </a>
          <a href="#slider" data-menu-link>
            Gallery
          </a>
          <a href="#contact" data-menu-link>
            Contact
          </a>
        </nav>
      </div>

      <div className="site-menu-foot">
        <div className="foot-left">
          <a href="#privacy">Legal</a>
          <a href="#team">Team</a>
        </div>
        <a href="tel:+34951870700">+34 (951) 870-700</a>
      </div>
    </div>
  );
}
