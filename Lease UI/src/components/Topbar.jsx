import Icon from './Icon';

export default function Topbar({ menuOpen, setMenuOpen }) {
  return (
    <header className="topbar">
      <button className="menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} onClick={() => setMenuOpen(!menuOpen)}>
        <Icon name={menuOpen ? 'close' : 'menu'} />
      </button>

      <div className="search-wrap search-placeholder" title="Global search is not part of Rose Mulewa's scope">
        <Icon name="search" />
        <input
          disabled
          readOnly
          value=""
          placeholder="Global search — Rose Mulewa (UI Integration, Communication & Search Lead)"
          aria-label="Global search placeholder"
        />
      </div>

      <div className="top-actions">
        <button
          className="notification nav-placeholder"
          type="button"
          disabled
          title="Notifications — assigned to another team member"
          aria-label="Notifications placeholder"
        >
          <Icon name="bell" />
        </button>
        <button
          className="profile-button nav-placeholder"
          type="button"
          disabled
          title="Tenant profile — assigned to another team member"
        >
          <span className="avatar">RM</span>
          <span className="profile-name">Rose Mulewa<small>Tenant account</small></span>
        </button>
      </div>
    </header>
  );
}

